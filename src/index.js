import React, { render } from 'preact'
import * as Prepare from './utils/prepare'
import Offmar from './components/Offmar.jsx'
import './css/tailwind.css'

const listItems = Prepare.getListItems()

Prepare.cleanup()
Prepare.insertRootContainer()

render(
  <Offmar listItems={listItems} />,
  document.getElementById('root')
)
