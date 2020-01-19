import React, { render } from 'preact'
import * as Prepare from './utils/prepare'
import Offmar from './components/Offmar.jsx'
import './css/tailwind.src.css'

const listItems = Prepare.getListItems()

Prepare.cleanup()
Prepare.insertRootContainer()

render(<Offmar listItems={listItems} />, document.getElementById('root'))
