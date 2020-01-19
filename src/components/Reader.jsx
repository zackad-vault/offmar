import React from 'preact'

function Image({ src, alt, borderImage }) {
  return (
    <div className={borderImage ? `border-t` : ``}>
      <img className='mx-auto' src={src} alt={alt} />
    </div>
  )
}

function Reader({ images, maxImageWidth, borderImage }) {
  let width = !maxImageWidth ? `100%` : `${maxImageWidth}px`
  document.documentElement.style.setProperty('--max-image-width', width)

  return (
    <div>
      <div className={`max-image-width pt-12`}>
        {images.map((image, index) => {
          return <Image src={image} key={index} alt={image} borderImage={borderImage} />
        })}
      </div>
    </div>
  )
}

export { Reader }
