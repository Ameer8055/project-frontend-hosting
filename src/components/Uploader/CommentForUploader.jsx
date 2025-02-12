import React, { useState, useEffect } from 'react';
import axiosInstance from "../../axiosInterceptor";
import { useParams } from 'react-router-dom';
import { X } from 'lucide-react';

const CommentForUploader = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = user._id;

  useEffect(() => {
    const fetchComments = async () => {
      const response = await axiosInstance.get(`https://project-backend-hosting.vercel.app/Comment/comments/${id}`); // Adjust the endpoint as necessary
      setComments(response.data);
    };
    fetchComments();
  }, []);

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
      <ul className='bg-white rounded-4 mt-4'>
        {comments.map((comment) => (
          <li key={comment._id} className='ms-4 mb-3 '>
            <div>
              <div><u>{comment.userName}</u></div>
                <div className='fs-4 text-black d-inline'>{comment.text}</div>
                <button onClick={() => deleteComment(comment._id)} className='d-inline'><X size={20} className='text-danger ms-2'/></button>

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentForUploader;
