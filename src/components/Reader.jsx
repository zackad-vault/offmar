import React from 'preact'
import Breadcrumbs from './Breadcrumbs.jsx'

function Image ({ src, alt }) {
  return (
    <div>
      <img className='mx-auto' src={src} alt={alt} />
    </div>
  )
}

function Reader ({ images }) {
  return (
    <div>
      <Breadcrumbs />
      <div className='container mx-auto text-center'>
        {images.map((image, index) => <Image src={image} key={index} alt={image} />)}
      </div>
    </div>
  )
}

export default Reader
