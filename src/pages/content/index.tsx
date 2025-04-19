import React from 'react'
import ReactDOM from 'react-dom/client'
import { Content } from './content'
import styles from './content.css?inline' // Import the content-specific CSS

// Create a root div and render the App component into it
const mountPoint = document.createElement('div')
mountPoint.id = 'hb-sailing-companion'
mountPoint.attachShadow({ mode: 'open' })

const target: ShadowRoot | null = mountPoint.shadowRoot
if (!target) {
	throw Error('No target element found, cannot attach shadow root')
}

const rootDiv = ReactDOM.createRoot(target)

const anchor = document.getElementsByClassName('rbm_All')[0]
if (!anchor) {
	throw new Error('No anchor element found')
}
anchor.insertAdjacentElement('beforebegin', mountPoint)
rootDiv.render(
	<React.StrictMode>
		<>
			<style>{styles.toString()}</style>
			<Content />
		</>
	</React.StrictMode>,
)
