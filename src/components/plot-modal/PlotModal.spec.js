import testHtml from '../../../util/test-html'

const body = `<plot-modal>
    <div class="child-content">some content</div>
</plot-modal>`

/**
 * Get a Puppeteer element handle to the root div in the plot modal's shadow DOM.
 *
 * @param page Puppeteer page
 * @returns a promise resolving to the element handle
 */
async function findModalRoot(page) {
  const plotModal = await page.$('plot-modal')
  return page.evaluateHandle((e, selector) => e.shadowRoot.querySelector(selector), plotModal, 'div')
}

describe('PlotModal', () => {
  beforeEach(async () => {
    await page.goto(`data:text/html,${testHtml(body)}`)
  })

  describe('connectedCallback', () => {
    it('should render elements with the correct classes', async () => {
      const modal = await findModalRoot(page)
      await expect(await modal.$('div.modal-background')).toBeTruthy()
      await expect(await modal.$('div.modal-content')).toBeTruthy()
      await expect(await modal.$('button.modal-close.is-large[aria-label="close"]')).toBeTruthy()
    })
  })

  describe('visible', () => {
    it('should add the is-active class if set to true', async () => {
      // ensure the plot modal initially is invisible
      const root = await findModalRoot(page)
      await expect(await root.$eval('div.modal', e => e.classList.contains('is-active'))).toBe(false)

      // show the plot modal
      await page.$eval('plot-modal', e => { e.visible = true })
      await expect(await root.$eval('div.modal', e => e.classList.contains('is-active'))).toBe(true)

      // setting the visibility again makes no difference
      await page.$eval('plot-modal', e => { e.visible = true })
      await expect(await root.$eval('div.modal', e => e.classList.contains('is-active'))).toBe(true)
    })

    it('should hide the modal if set to false', async () => {
      // ensure the plot modal initially is visible
      const root = await findModalRoot(page)
      await page.$eval('plot-modal', e => { e.visible = true })
      await expect(await root.$eval('div.modal', e => e.classList.contains('is-active'))).toBe(true)

      // hide the plot modal
      await page.$eval('plot-modal', e => { e.visible = false })
      await expect(await root.$eval('div.modal', e => e.classList.contains('is-active'))).toBe(false)

      // calling the hide method again makes no difference
      await page.$eval('plot-modal', e => { e.visible = false })
      await expect(await root.$eval('div.modal', e => e.classList.contains('is-active'))).toBe(false)
    })

    it('should be true if the modal is visible', async () => {
      // ensure the plot modal is visible
      await page.$eval('plot-modal', e => { e.visible = true })

      await expect(await page.$eval('plot-modal', e => e.visible)).toBe(true)
    })

    it('should return false if the modal is not visible', async () => {
      // ensure the plot modal is hidden
      await page.$eval('plot-modal', e => { e.visible = false })

      await expect(await page.$eval('plot-modal', e => e.visible)).toBe(false)
    })
  })

  describe('interaction', () => {
    it('should close the plot modal when it is visible and its close button is clicked', async () => {
      // show the modal
      await page.$eval('plot-modal', e => { e.visible = true })
      await expect(await page.$eval('plot-modal', e => e.visible)).toBe(true)

      // click on the close button
      const root = await findModalRoot(page)
      const button = await root.$('button')
      await button.click()
      await expect(true).toBe(true)

      // the modal should have been closed
      await expect(await page.$eval('plot-modal', e => e.visible)).toBe(false)
    })
  })
})
