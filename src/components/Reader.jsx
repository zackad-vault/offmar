import React from 'preact'
import Breadcrumbs from './Breadcrumbs.jsx'

function Image ({ src, alt }) {
  return (
    <img src={src} alt={alt}
      className='block'
    />
  )
}

function Reader ({ files }) {
  const regexFilter = new RegExp('.jpe?g$|.png$|.gif$', 'i')
  const images = files.filter(image => image.href.match(regexFilter))

  return (
    <div>
      <Breadcrumbs />
      {images.map((image, index) => <Image src={image} key={index} alt={image} />)}
    </div>
  )
}

export default Reader
