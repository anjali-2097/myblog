import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
//import articles from './article-content'
import ArticlesList from '../components/ArticlesList'

function ArticlesListPage() {
  const [articles,setArticles] = useState([]);
  const AWS_URL = process.env.REACT_APP_AWS_URL;
  useEffect(()=>{
    const fetchBlogs = async() =>{
      const response = await axios.get(`${AWS_URL}`);
      const res = JSON.parse(response.data.body)
      setArticles(res.Items)
      //console.log(res.Items.length)
      //console.log(typeof(response.data.body));
    }
    fetchBlogs();
  },[])
  return (
    <>
    <h1>Articles</h1>
    <ArticlesList articles={articles}/>
    </>
    
  )
}

export default ArticlesListPage