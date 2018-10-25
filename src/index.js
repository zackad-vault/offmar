import React from 'react'
import ReactDOM from 'react-dom'
import * as Prepare from './utils/prepare'
import Offmar from './Offmar.jsx'

Prepare.cleanup()
Prepare.insertRootContainer()

ReactDOM.render(<Offmar />, document.getElementById('root'))
