import React from 'preact'

function Image({ src, alt, first }) {
  return (
    <div className={!first ? `border-t` : ``}>
      <img className='mx-auto' src={src} alt={alt} />
    </div>
  )
}

function Reader({ images, maxImageWidth }) {
  let width = !maxImageWidth ? `100%` : `${maxImageWidth}px`
  document.documentElement.style.setProperty('--max-image-width', width)

  return (
    <div>
      <div className={`max-image-width pt-12`}>
        {images.map((image, index) => {
          return <Image src={image} key={index} alt={image} first={index === 0 ? true : false} />
        })}
      </div>
    </div>
  )
}

export default Reader
