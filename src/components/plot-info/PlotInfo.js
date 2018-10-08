const infoTemplate = document.createElement('template')
infoTemplate.innerHTML = `<style>
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

    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.move = this.move.bind(this)
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

  move(x, y) {
    const info = this.shadowRoot.querySelector('.info')
    info.style.left = `${x}px`
    info.style.top = `${y}px`
  }
}

export default PlotInfo
