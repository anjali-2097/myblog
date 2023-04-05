import React from 'react'

function CommentsList({comments}) {
  
  return (
    <>
     <h3>Commets</h3>
     {comments && comments.map(comment => (
        <div className='comment' key={comment.postedBy}>
            <h4>{comment.postedBy}</h4>
            <p>{comment.comment}</p>
        </div>
     ))}
    </>
   

  )
}

export default CommentsList