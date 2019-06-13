import React from 'preact'

function Reader ({ files }) {
  return (
    <div>
      {files.map((image, index) => <img src={image} key={index} alt={image} />)}
    </div>
  )
}

export default Reader
