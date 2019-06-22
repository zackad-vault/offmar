import React from 'preact'
import Breadcrumbs from './Breadcrumbs.jsx'

function Image ({ src, alt }) {
  return (
    <img src={src} alt={alt}
      className='block'
    />
  )
}

function Reader ({ images }) {
  return (
    <div>
      <Breadcrumbs />
      {images.map((image, index) => <Image src={image} key={index} alt={image} />)}
    </div>
  )
}

export default Reader
