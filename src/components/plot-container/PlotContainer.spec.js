const content = `<!DOCTYPE html>
<html>
<head>
<script src="http://localhost:8000/web-components.js"></script>
</head>
<body>
<hello-world></hello-world>
</body>
</html>`

describe('PlotContainer', () => {
  beforeAll(async () => {
    await page.goto(`data:text/html,${content}`)
  })

  it('should work', async () => {
    await expect(page).toMatch('Hello World')
  })
})
