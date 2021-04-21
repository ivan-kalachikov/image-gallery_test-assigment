import './App.scss';
import React from 'react';
import AddForm from './components/AddForm/AddForm';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageGalleryWrapper from './components/ImageGalleryWrapper/ImageGalleryWrapper';

function App() {
  return (
    <>
      <section className="section">
        <AddForm />
      </section>
      <ImageGalleryWrapper>
        <ImageGallery />
      </ImageGalleryWrapper>
    </>
  );
}

export default App;
