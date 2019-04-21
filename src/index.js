import React from 'react'
import ReactDOM from 'react-dom'
import * as Prepare from './utils/prepare'
import Offmar from './Offmar.jsx'
import './css/tailwind.css'

const listItems = Prepare.getListItems()

Prepare.cleanup()
Prepare.insertRootContainer()

ReactDOM.render(
  <Offmar listItems={listItems} />,
  document.getElementById('root')
)
