import PlotContainer from './components/plot-container/PlotContainer'
import PlotInfo from './components/plot-info/PlotInfo'
import PlotModal from './components/plot-modal/PlotModal'

if (!customElements.get('plot-container')) {
  customElements.define('plot-container', PlotContainer)
}

if (!customElements.get('plot-info')) {
  customElements.define('plot-info', PlotInfo)
}

if (!customElements.get('plot-modal')) {
  customElements.define('plot-modal', PlotModal)
}
