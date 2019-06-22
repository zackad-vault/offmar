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
      <div className='text-center'>
        {images.map((image, index) => <Image src={image} key={index} alt={image} />)}
      </div>
    </div>
  )
}

export default Reader
