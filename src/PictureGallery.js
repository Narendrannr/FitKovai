import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import './PictureGallery.css';

function PictureGallery() {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState('');

  // function to handle file upload
  function handleUpload(event) {
    event.preventDefault();
    const files = event.target.files;

    // loop through uploaded files and create array of image objects
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        newImages.push({
          original: reader.result,
          thumbnail: reader.result,
        });
        setImages(prevImages => [...prevImages, ...newImages]);
      };

      reader.readAsDataURL(file);
    }
  }

  function handleFilter(event) {
    setFilter(event.target.value);
  }

   // filter images based on filter text
   const filteredImages = images.filter(image =>
    image.original.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Picture Gallery</h1>

      <form>
        <label htmlFor="file-upload">Upload Image:</label>
        <input type="file" id="file-upload" onChange={handleUpload} multiple />
      </form>

      <div>
        <label htmlFor="filter-input">Filter:</label>
        <input type="text" id="filter-input" value={filter} onChange={handleFilter} />
      </div>

      {filteredImages.length > 0 ? (
        <ImageGallery items={filteredImages} />
      ) : (
        <p>No images found.</p>
      )}
    </div>
  );
}

export default PictureGallery;
