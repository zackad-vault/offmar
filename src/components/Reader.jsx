import React from 'preact'
import Breadcrumbs from './Breadcrumbs.jsx'

function Image ({ src, alt, first }) {
  return (
    <div className={!first ? `border-t` : ``}>
      <img className='mx-auto' src={src} alt={alt} />
    </div>
  )
}

function Reader ({ images }) {
  return (
    <div>
      <Breadcrumbs />
      <div>
        {images.map((image, index) => {
          return <Image src={image}
            key={index}
            alt={image}
            first={ index === 0 ? true : false } />
        })}
      </div>
    </div>
  )
}

export default Reader
