import React, { useState, useEffect } from 'react';
import axiosInstance from "../../axiosInterceptor";
import { useParams } from 'react-router-dom';
import './CommentSection.css'
import { Check, Pencil, X } from 'lucide-react';

const CommentSection = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');

  const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = user._id;
  const userName = user.name;

  useEffect(() => {
    const fetchComments = async () => {
      const response = await axiosInstance.get(`https://project-backend-hosting.vercel.app/Comment/comments/${id}`); // Adjust the endpoint as necessary
      setComments(response.data);
    };
    fetchComments();
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment) return;

    const response = await axiosInstance.post(`https://project-backend-hosting.vercel.app/Comment/comments`, { text: newComment, movieId: id, userId: userId, userName: userName }); // Adjust the endpoint as necessary
    setComments([...comments, response.data]);
    setNewComment('');
  };

  const updateComment = async (commentId, updatedContent) => {
    try {
      const response = await axiosInstance.put(`https://project-backend-hosting.vercel.app/Comment/comments/${commentId}`, {
        text: updatedContent
      });

      if (response.status === 200) {
        setComments(prevComments =>
          prevComments.map(comment =>
            comment._id === commentId ? { ...comment, text: updatedContent } : comment
          )
        );
        setEditingCommentId(null); // Reset editing state
        setEditingCommentText('');
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await axiosInstance.delete(`https://project-backend-hosting.vercel.app/Comment/comments/${commentId}`);
      if (response.status === 200) {
        setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className='bg-transparent d-flex flex-col'>
      <h3 className='text-white fs-3'>Comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          className='comment rounded-3'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit" className='text-white bg-primary rounded-1 d-flex mx-auto fs-5 px-4 mt-2'>Post</button>
      </form>
      <ul className='bg-white rounded-4 mt-4'>
        {comments.map((comment) => (
          <li key={comment._id} className='ms-4 mb-3 '>
            {editingCommentId === comment._id ? (
              <div>
                <input
                  type="text"
                  value={editingCommentText}
                  onChange={(e) => setEditingCommentText(e.target.value)}
                />
                <button onClick={() => updateComment(comment._id, editingCommentText)}><Check/></button>
              </div>
            ) : (
              <div>
                <div><u>{comment.userName}</u></div>
                <div className='fs-4 text-black'>{comment.text}</div>
                {comment.userId === userId && ( // Show buttons only for the current user's comments
                  <>
                    <button onClick={() => {
                      setEditingCommentId(comment._id);
                      setEditingCommentText(comment.text);
                    }}>
                      <Pencil size={15} className='text-primary'/>
                    </button>
                    <button onClick={() => deleteComment(comment._id)}><X size={20} className='text-danger ms-2'/></button>
                  </>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentSection;
