import React from 'react';

const Post = ({ post, handleLike, handleComment }) => {
    return (
        <div className="post">
            <h4>{post.user.name}</h4>
            <p>{post.text}</p>
            <button onClick={() => handleLike(post._id)}>Like ({post.likes.length})</button>
            <div className="comments">
                {post.comments.map((comment) => (
                    <p key={comment._id}>{comment.text}</p>
                ))}
            </div>
            <input type="text" placeholder="Comment" onKeyPress={handleComment} />
        </div>
    );
};

export default Post;
