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
    this.style.position = 'fixed'
    this.style.top = '0'
    this.style.left = '0'
  }
}

export default PlotInfo
