import testHtml from '../../../util/test-html'

async function pageInit(includeModal, includeInfo) {
  let body = `<plot-container>
<div>Hello World</div>`
  if (includeModal) {
    body += `<plot-modal>
  <div>Large Hello World</div>
</plot-modal>`
  }
  if (includeInfo) {
    body += `<plot-info>
  <div>
    <p>Hello</p>
    <p>World</p>
    <p>Info</p>
  </div>
</plot-info>`
  }
  body += `</plot-container>`

  await page.goto(`data:text/html, ${testHtml(body)}`)
}

/**
 * Get a Puppeteer element handle to the root div in the plot info's shadow DOM.
 *
 * @param page Puppeteer page
 * @returns a promise resolving to the element handle
 */
async function findContainerRoot(page) {
  const plotContainer = await page.$('plot-container')
  return page.evaluateHandle((e, selector) => e.shadowRoot.querySelector(selector), plotContainer, 'div')
}

describe('PlotContainer', () => {
  beforeEach(async () => {
  })

  // describe('connectedCallback', () => {
  //   it('should render a container element', async () => {
  //     await pageInit(true, true)
  //
  //     const root = await findContainerRoot(page)
  //     await expect(await root.$('.container')).toBeTruthy()
  //   })
  // })

  describe('clicking', () => {
    it('should show the modal', async () => {
      await pageInit(true, true)

      // make sure the plot modal is hidden
      await page.$eval('plot-modal', e => { e.visible = false })
      await expect(await page.$eval('plot-modal', e => e.visible)).toBe(false)

      // click on the plot
      const root = await findContainerRoot(page)
      let container = await root.$('.container')
      await container.click()

      // the plot info should be invisible now
      await expect(await page.$eval('plot-modal', e => e.visible)).toBe(true)
    })

    it('should hide the plot info if there is a modal', async () => {
      await pageInit(true, true)

      // make sure the plot info is visible
      await page.$eval('plot-container plot-info', e => { e.visible = true })
      await expect(await page.$eval('plot-info', e => e.visible)).toBe(true)

      // click on the plot
      const root = await findContainerRoot(page)
      let container = await root.$('.container')
      await container.click()

      // the plot info should be invisible now
      await expect(await page.$eval('plot-info', e => e.visible)).toBe(false)
    })

    it('should not hide the plot info if there is no modal', async () => {
      await pageInit(false, true)

      // make sure the plot info is visible
      await page.$eval('plot-container plot-info', e => { e.visible = true })
      await expect(await page.$eval('plot-info', e => e.visible)).toBe(true)

      // click on the plot
      const root = await findContainerRoot(page)
      let container = await root.$('.container')
      await container.click()

      // the plot info should be still be visible
      await expect(await page.$eval('plot-info', e => e.visible)).toBe(true)
    })

    it('should not fail if there are is no modal and info', async () => {
      await pageInit(false, false)

      // click on the plot
      const root = await findContainerRoot(page)
      let container = await root.$('.container')
      await container.click()
    })
  })

  describe('mouse motion over the plot', () => {
    it('should show and move the plot info to the correct position if there is no plot modal visible', async () => {
      await pageInit(true, true)

      // ensure the plot info is not visible
      await expect(await page.$eval('plot-info', e => e.visible)).toBe(false)

      // move the cursor over the plot
      const root = await findContainerRoot(page)
      const container = await root.$('.container')
      const boundingBox = await container.boundingBox()
      const x = Math.round(boundingBox.x + boundingBox.width / 2)
      const y = Math.round(boundingBox.y + boundingBox.height / 2)
      await page.mouse.move(x, y)

      // the plot info should now be visible and should be at the right position
      const xOffset = 10
      const yOffset = 10
      await expect(await page.$eval('plot-info', e => e.visible)).toBe(true)
      await expect(await page.$eval('plot-info', e => e.position)).toEqual([x + xOffset, y + yOffset])
    })

    it('should move, but not show, the plot info if a plot modal is visible', async () => {
      await pageInit(true, true)

      // ensure the plot modal is visible and the plot info is not
      await page.$eval('plot-modal', e => { e.visible = true })
      await page.$eval('plot-info', e => { e.visible = false })

      // move the mouse over the plot
      const root = await findContainerRoot(page)
      const container = await root.$('.container')
      const boundingBox = await container.boundingBox()
      const x = Math.round(boundingBox.x + boundingBox.width / 2)
      const y = Math.round(boundingBox.y + boundingBox.height / 2)
      await page.mouse.move(x, y)

      // the plot info should still not be visible, but it should be at the right position
      const xOffset = 10
      const yOffset = 10
      await expect(await page.$eval('plot-info', e => e.visible)).toBe(false)
      await expect(await page.$eval('plot-info', e => e.position)).toEqual([x + xOffset, y + yOffset])
    })
  })
})
