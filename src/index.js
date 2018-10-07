import PlotContainer from './components/plot-container/PlotContainer'
import PlotInfo from './components/plot-info/PlotInfo'

if (!customElements.get('plot-container')) {
  customElements.define('plot-container', PlotContainer)
}

if (!customElements.get('plot-info')) {
  customElements.define('plot-info', PlotInfo)
}
