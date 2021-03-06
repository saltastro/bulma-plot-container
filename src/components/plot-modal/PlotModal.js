import { BULMA_CSS_URL } from '../../bulma-url'

const modalTemplate = document.createElement('template')
modalTemplate.innerHTML = `<link rel="stylesheet" href="${BULMA_CSS_URL}">
<div>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <slot></slot>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>
</div>`

class PlotModal extends HTMLElement {
  constructor() {
    super()

    this.onClick = this.onClick.bind(this)
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(modalTemplate.content.cloneNode(true))

    shadowRoot.querySelector('button').addEventListener('click', this.onClick)
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('button').removeEventListener('click', this.onClick)
  }

  set visible(v) {
    if (v) {
      this.shadowRoot.querySelector('div.modal').classList.add('is-active')
    } else {
      this.shadowRoot.querySelector('div.modal').classList.remove('is-active')
    }
  }

  get visible() {
    return this.shadowRoot.querySelector('div.modal').classList.contains('is-active')
  }

  onClick(e) {
    e.stopPropagation()

    this.visible = false
  }
}

export default PlotModal
