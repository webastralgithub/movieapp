// AddMovieForm.js
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddMovieForm() {
    const fileRef = useRef(null);
  const [title, setTitle] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
const navigate=useNavigate()
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Create a preview URL for the selected image
    const previewURL = URL.createObjectURL(file);
    setPreviewURL(previewURL);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('publishYear', publishYear);
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/api/movies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Movie added:', response.data.movie);
      setTitle('');
      setPublishYear('');
      setSelectedFile(null);
      setPreviewURL('');
      navigate("/movies")
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  
  return (
    <>
    <div className='movies-header'>
    <h3>Create a new movie </h3>
    </div>
    <div className="form-container add-edit-form-container">
     
      <form onSubmit={handleSubmit}>

      <div className="file-upload">

<div className="upload-container">
<input
  type="file"
  accept="image/*"
  className="file-input"
  ref={fileRef}
style={{display:"none"}}
  onChange={handleFileChange}
/>

{!previewURL&&<div className="upload-text" onClick={() => fileRef.current.click()}>
<img src="/upload.svg" alt="Preview" />
</div>}
</div>
 {previewURL && <div className="file-uploadd">
  <img src={previewURL} alt="Preview" className="preview-image" />
  
</div>}
 
</div>


       <div className='add-mov-right-form'>
        <div className='add-mov-top'>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="number" placeholder="Publishing year" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} />
        </div>

        
        <div className='add-mov-footer'>
        <button onClick={(e)=>{
         e.stopPropagation()
navigate("/movies")
        }}>Cancel</button>
        <button type="submit">Submit</button>
        </div>
       </div>
      </form>
    </div>
    </>
  );
}

export default AddMovieForm;
