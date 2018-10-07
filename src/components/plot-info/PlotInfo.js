class PlotInfo extends HTMLElement {
  constructor() {
    super()

    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.move = this.move.bind(this)
  }

  show() {
    this.classList.remove('is-invisible')
  }

  hide() {
    this.classList.add('is-invisible')
  }

  move(x, y) {
    this.style.left = `${x}px`
    this.style.top = `${y}px`
  }

  connectedCallback() {
    this.classList.add('is-invisible')
  }
}

export default PlotInfo
