const containerTemplate = document.createElement('template')
containerTemplate.innerHTML = `<div>
<style>
.container {
    padding: 50px;
    border: 1px solid lightgray;
}
</style>
  <div class="container">
    <slot></slot>
</div>
</div>`

class PlotContainer extends HTMLElement {
  constructor() {
    super()

    this.onClick = this.onClick.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(containerTemplate.content.cloneNode(true))

    let container = shadowRoot.querySelector('.container')
    container.addEventListener('click', this.onClick)
    container.addEventListener('mousemove', this.onMouseMove)
    container.addEventListener('mouseleave', this.onMouseLeave)
  }

  disconnectedCallback() {
    const container = this.shadowRoot.querySelector('.container')
    container.removeEventListener('click', this.onClick)
    container.removeEventListener('mousemove', this.onMouseMove)
    container.removeEventListener('mouseleave', this.onMouseLeave)
  }

  onClick(e) {
    e.stopPropagation()

    // get plot info and modal
    const plotInfo = this.querySelector('plot-info')
    const plotModal = this.querySelector('plot-modal')

    // hide the plot info if need be
    if (plotInfo && plotModal) {
      plotInfo.visible = false
    }

    // show the modal (if there is one)
    if (plotModal) {
      plotModal.visible = true
    }
  }

  onMouseMove(e) {
    e.stopPropagation()

    // get plot info and modal
    const plotInfo = this.querySelector('plot-info')
    const plotModal = this.querySelector('plot-modal')

    if (plotInfo) {
      // move the info to the correct position
      const xOffset = 10
      const yOffset = 10
      plotInfo.position = [e.clientX + xOffset, e.clientY + yOffset]

      // render the info visible if no modal is visible
      if (!plotModal || !plotModal.visible) {
        plotInfo.visible = true
      }
    }
  }

  onMouseLeave(e) {
    e.stopPropagation()

    // get plot info
    const plotInfo = this.querySelector('plot-info')

    plotInfo.visible = false
  }
}

export default PlotContainer
