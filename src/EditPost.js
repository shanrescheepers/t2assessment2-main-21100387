import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';

const EditPost = (props) => {

  const [updatedPost, setUpdatedPost] = useState({
    newMessage: props.original,
    id: props.id
  })

  const closeModal = () => {
    props.rerender();
  }

  useEffect(() => {
    document.getElementById('updatePostText').innerHTML = props.original;
    console.log(props.original)
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;
    setUpdatedPost({ ...updatedPost, newMessage: value });
  }

  const updatePost = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8888/postApi/updatePost.php', updatedPost)
      .then((res) => {
        let data = res.data;
        props.upRender(true);
        props.rerender();
      });
  }

  return (
    <div className='modal'>
      <form>
        <h1>Made a Mistake? Edit with ease!</h1>
        <p onClick={closeModal} className='close-modal'>Close Modal</p>
        <textarea id='updatePostText' placeholder='Edit Post Message' onChange={handleChange} />
        <button type='submit' onClick={updatePost} className='edit-post'>Edit this post</button>
      </form>
    </div>
  )
}

export default EditPost;
