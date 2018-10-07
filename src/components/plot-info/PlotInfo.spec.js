import testHtml from '../../../util/test-html'

describe('PlotInfo', () => {
  const body = `<plot-info>
<div class="child-content">some content</div>
</plot-info>`

  beforeAll(async () => {
    await page.goto(`data:text/html,${testHtml(body)}`)
  })

  describe('connectedCallback', () => {
    it('should render child content', async () => {
      await expect(page).toMatchElement('.child-content')
    })
  })

  describe('show', async () => {
    it('should remove the is-invisible class', async () => {
      // ensure the plot info initially is invisible
      await expect(page).toMatchElement('plot-info.is-invisible')

      // show the plot info
      await page.$eval('plot-info', e => e.show())
      await expect(page).not.toMatchElement('plot-info.is-invisible')

      // calling the show method again makes no difference
      await page.$eval('plot-info', e => e.show())
      await expect(page).not.toMatchElement('plot-info.is-invisible')
    })
  })

  describe('hide', async () => {
    it('should add the is-invisible class', async () => {
      // ensure the plot info initially is visible
      await page.$eval('plot-info', e => e.show())
      await expect(page).not.toMatchElement('plot-info.is-invisible')

      // hide the plot info
      await page.$eval('plot-info', e => e.hide())
      await expect(page).toMatchElement('plot-info.is-invisible')

      // calling the hide method again makes no difference
      await page.$eval('plot-info', e => e.hide())
      await expect(page).toMatchElement('plot-info.is-invisible')
    })
  })

  describe('move', () => {
    it('should move the element', async () => {
      // move to (200, 500)
      await page.$eval('plot-info', e => e.move(200, 500))
      let x = await page.$eval('plot-info', e => e.style.left)
      let y = await page.$eval('plot-info', e => e.style.top)
      await expect(x).toBe('200px')
      await expect(y).toBe('500px')

      // move to (-80, -1024)
      await page.$eval('plot-info', e => e.move(-80, -1024))
      x = await page.$eval('plot-info', e => e.style.left)
      y = await page.$eval('plot-info', e => e.style.top)
      await expect(x).toBe('-80px')
      await expect(y).toBe('-1024px')

    })
  })
})
