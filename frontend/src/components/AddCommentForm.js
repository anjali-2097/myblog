import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import useUser from '../hooks/useUser';

function AddCommentForm({articleName,onArticleUpdated}) {
    const [name,setName] = useState('')
    const [comment,setComment] = useState('')
    const {user,isLoading} = useUser();

    const addComment = async () => {
     const token = user && await user.getIdToken();
      const headers = token ? {authtoken:token}: {};
        const res = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy: name,
            comment: comment,
        },{headers});
        const updatedArticle = res.data;
        onArticleUpdated(updatedArticle);
        setName('');
        setComment('');
    }
  return (
    <>
    <div id='add-comment-form'>
        <h3>Add Comment</h3>
       {user && <p> You are posting as {user.email}</p>}
        <label>
            <textarea rows="4" cols="50" value={comment} onChange={e => setComment(e.target.value)}/>
        </label>
        <button onClick={addComment}>Add Comment</button>
    </div>
    </>
  )
}

export default AddCommentForm