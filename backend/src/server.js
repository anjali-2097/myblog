import fs from 'fs'
import admin from 'firebase-admin'
import express from 'express'
import { db, connectToDB } from './db.js';
import path from 'path';
import 'dotenv/config';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);
admin.initializeApp({
    credential: admin.credential.cert(credentials),
})

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname,'../build')));

app.get(/^(?!api).+/,(req,res)=>{
    res.send(path.join(__dirname,'../build/index.html'))
})

app.use( async (req, res, next) => {
    const { authtoken } = req.headers;
    if(authtoken){
        try{
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch(error){
            return res.sendStatus(400);
        }
    
    }
    req.user = req.user || {};
    next();
})

app.put('/api/articles/:name', async (req,res)=>{
    try{
        const {name} = req.params;
        const { uid } = req.user;
        
        const article = await db.collection('articles').findOne({name})
        if(article){
            const upvoteids = article.upvoteids || [];
            article.canUpvote = uid && !upvoteids.includes(uid);
            res.json(article)
         } else {
            return res.sendStatus(404);
        }
    }catch(e){
        res.status(500).json(e)
    }
    
    
})

app.use ((req,res,next)=>{
    if(req.user){
        next();
    }else{
        res.sendStatus(401);
    }
});

app.put('/api/articles/:name/upvote',async(req,res)=>{
    const {name} = req.params;
    const { uid } = req.user;
    
    const article = await db.collection('articles').findOne({name})
    const ar = await db.collection('articles');
    
    if(article){
        const upvoteids = article.upvoteids || [];
        const canUpvote = uid && !upvoteids.includes(uid);

        if(canUpvote){
            await db.collection('articles').updateOne({name},{
                $inc:{ upvotes:1 },
                $push: {upvoteids:uid}
            })
        }
        const updatedArticle = await db.collection('articles').findOne({name})
        res.json(updatedArticle)
    }
    else{
        res.send("Article doesnt exists")
    }
})

app.post('/api/articles/:name/comments',async(req,res)=>{
    const {name} = req.params;
    const {comment} = req.body;
    const {email} = req.user;
    
    
    await db.collection('articles').updateOne({name},{
        $push:{ comments: { postedBy: email, comment } }
    })
    const article = await db.collection('articles').findOne({name})
    if(article){
        
        res.send(article)
    }else{
        res.send("Article doesnt exists")
    }
})
const PORT = process.env.PORT || 8000
connectToDB (()=>{
    console.log("Successfully connected to database!")
    app.listen(PORT,()=>{
        console.log('Server is listening on port '+ PORT)
    })
})
