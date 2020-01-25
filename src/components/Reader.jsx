import { h } from 'preact'
import { Image } from './Image.jsx'

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
