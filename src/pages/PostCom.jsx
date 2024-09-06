import React, { useEffect, useState } from 'react';

const PostCom = ({ post, closeModal }) => {
  const [comments, setComments] = useState([]);
  const [total,setTotal]=useState(0)
  async function getComments() {
    const fetchUrl = `https://dummyjson.com/posts/${post.id}/comments`;
    const data = await fetch(fetchUrl).then(res => res.json());
    setComments(data.comments);
    setTotal(data.total)
  }

  useEffect(() => {
    getComments();
  }, []);
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          X
        </button>
        <div className="post-container">
          <h1 className="post-title">{post.title}</h1>
          <p className="post-body">{post.body}</p>
          <div className="post-details">
            <div className="post-tags">
              {post.tags.map((tag, i) => (
                <div className="tag" key={i}>#{tag}</div>
              ))}
            </div>
            <div className="post-reactions">
            </div>
            <div className="post-views">
            </div>
            <div className="comments-section">
              <div className="comments-title">
              Reviews
              ({total})
              </div>
              {comments.map((com, i) => (
                <div className="comment" key={i}>
                  
                  <h2 className="comment-body">{com.body}</h2>
                  <div className="comment-likes">Likes: {com.likes}</div>
                  <div className="comment-body">{com.user.fullName}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCom;
