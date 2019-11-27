import React, { useState, useEffect } from 'react'
import '../styles/_ImageSlider.scss';

function ImageSlider({ images }) {

  const [currentImg, setCurrentImg] = useState(0);
  useEffect(() => {
    if (currentImg === images.length)
      setCurrentImg(0);
    if (currentImg < 0)
      setCurrentImg(images.length - 1);
  }, [currentImg, images.length])

  return (
    <figure className="ImageSlider">
      <img src={images[currentImg]} useMap="#actions" />
      <div className="next" onClick={() => setCurrentImg(currentImg + 1)}></div>
      <div className="back" onClick={() => setCurrentImg(currentImg - 1)}></div>
      <div className="filter"></div>
      <div className="slideIndicator">
        {images.map((item, i) =>
          <span
            className={currentImg === i ? 'indicator active' : 'indicator'}
            key={i}
          />)
        }
      </div>
      <span className="numImgs">
        <i className="material-icons">collections</i>
        <p>{images.length}</p>
      </span>
    </figure>
  )
}

export default ImageSlider;