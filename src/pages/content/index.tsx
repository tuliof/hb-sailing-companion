import React from 'react'
import '@assets/tailwind.css'
import ReactDOM from 'react-dom/client'
import { Content } from './content'

// Create a root div and render the App component into it
const root = document.createElement('div')
root.className = 'container'
root.id = 'hb-sailing-extension'
const anchor = document.getElementsByClassName('rbm_All')[0]
if (!anchor) {
	throw new Error('No anchor element found')
}
anchor.appendChild(root)
const rootDiv = ReactDOM.createRoot(root)
rootDiv.render(
	<React.StrictMode>
		<Content />
	</React.StrictMode>,
)
