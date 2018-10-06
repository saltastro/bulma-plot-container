import PlotContainer from './components/plot-container/PlotContainer'

if (!customElements.get('plot-container')) {
  customElements.define('plot-container', PlotContainer)
}
