import { BULMA_CSS_URL } from '../../bulma-url'

const infoTemplate = document.createElement('template')
infoTemplate.innerHTML = `<link rel="stylesheet" href="${BULMA_CSS_URL}">
<style>
  .info {
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
<div>
  <div class="info is-invisible">
  <slot></slot>
</div>`

class PlotInfo extends HTMLElement {
  constructor() {
    super()

    this._position = [0, 0]
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(infoTemplate.content.cloneNode(true))
  }

  show() {
    this.shadowRoot.querySelector('.info').classList.remove('is-invisible')
  }

  hide() {
    this.shadowRoot.querySelector('.info').classList.add('is-invisible')
  }

  get visible() {
    return !this.shadowRoot.querySelector('.info').classList.contains('is-invisible')
  }

  /**
   * Set the plot info's position.
   *
   * @param p array of left and top position, as integers in pixels
   */
  set position(p) {
    const info = this.shadowRoot.querySelector('.info')
    this._position = p
    info.style.left = `${p[0]}px`
    info.style.top = `${p[1]}px`
  }

  /**
   * Get the plot info's position, as integers in pixels.
   *
   * @returns {any[]} position
   */
  get position() {
    return this._position
  }
}

export default PlotInfo
