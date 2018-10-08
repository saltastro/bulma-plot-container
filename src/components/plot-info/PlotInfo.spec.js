import testHtml from '../../../util/test-html'

const body = `<plot-info>
<div class="child-content">some content</div>
</plot-info>`

/**
 * Get a Puppeteer element handle to the root div in the plot info's shadow DOM.
 *
 * @param page Puppeteer page
 * @returns a promise resolving to the element handle
 */
async function findInfoRoot(page) {
  const plotInfo = await page.$('plot-info')
  return page.evaluateHandle((e, selector) => e.shadowRoot.querySelector(selector), plotInfo, 'div')
}


describe('PlotInfo', () => {
  beforeEach(async () => {
    await page.goto(`data:text/html,${testHtml(body)}`)
  })

  describe('connectedCallback', () => {
    it('should render an info element', async () => {
      const root = await findInfoRoot(page)
      await expect(await root.$('div.info')).toBeTruthy()
    })
  })

  describe('visible', async () => {
    it('should remove the is-invisible class if visible is set to true', async () => {
      // ensure the plot info initially is invisible
      const root = await findInfoRoot(page)
      await expect(await root.$eval('.info', e => e.classList.contains('is-invisible'))).toBe(true)

      // show the plot info
      await page.$eval('plot-info', e => { e.visible = true })
      await expect(await root.$eval('.info', e => e.classList.contains('is-invisible'))).toBe(false)

      // setting the visibility again makes no difference
      await page.$eval('plot-info', e => { e.visible = true })
      await expect(await root.$eval('.info', e => e.classList.contains('is-invisible'))).toBe(false)
    })

    it('should add the is-invisible class if visible is set to false', async () => {
      // ensure the plot info initially is visible
      const root = await findInfoRoot(page)
      await page.$eval('plot-info', e => { e.visible = true })
      await expect(await root.$eval('.info', e => e.classList.contains('is-invisible'))).toBe(false)

      // hide the plot info
      await page.$eval('plot-info', e => { e.visible = false })
      await expect(await root.$eval('.info', e => e.classList.contains('is-invisible'))).toBe(true)

      // setting the visibility again makes no difference
      await page.$eval('plot-info', e => { e.visible = false })
      await expect(await root.$eval('.info', e => e.classList.contains('is-invisible'))).toBe(true)
    })

    it('should be true if the info is visible', async () => {
      // ensure the plot info is visible
      await page.$eval('plot-info', e => { e.visible = true })

      await expect(await page.$eval('plot-info', e => e.visible)).toBe(true)
    })

    it('should be false if the info is not visible', async () => {
      // ensure the plot info is hidden
      await page.$eval('plot-info', e => { e.visible = false })

      await expect(await page.$eval('plot-info', e => e.visible)).toBe(false)
    })
  })

  describe('position', () => {
    it('should set the position', async () => {
      // set to (200, 500)
      const root = await findInfoRoot(page)
      await page.$eval('plot-info', e => { e.position = [200, 500] })
      let x = await root.$eval('.info', e => e.style.left)
      let y = await root.$eval('.info', e => e.style.top)
      await expect(x).toBe('200px')
      await expect(y).toBe('500px')

      // set to (-80, -1024)
      await page.$eval('plot-info', e => { e.position = [-80, -1024] })
      x = await root.$eval('.info', e => e.style.left)
      y = await root.$eval('.info', e => e.style.top)
      await expect(x).toBe('-80px')
      await expect(y).toBe('-1024px')
    })

    it('should return the correct initial position', async () => {
      await expect(await page.$eval('plot-info', e => e.position)).toEqual([0, 0])
    })
  })
})
