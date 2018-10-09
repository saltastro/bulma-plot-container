# An example

The following html displays a grid of six "plots" consisting of a circle. Clicking on each plot opens a modal with a larger version of the circle. Hovering with the mouse over a plot displays a tooltip with information about the circle's colour.

You should replace the link to the package file with the one for the current version.

```html
<!DOCTYPE html>
<html>
<head>
    <script src="dist/bulma-plot-container.js"></script>
    <style>
        svg.plot.small {
            width: 300px;
            height: 300px;
        }

        svg.plot.large {
            width: 600px;
            height: 600px;
            background-color: white;
            border: 1px solid lightgray;
        }

        .plots {
            display: grid;
            grid-template-columns: 310px 310px 310px;
            grid-gap: 20px;
            border: 1px solid lightgray;
            margin: 20px;
            padding: 20px;
        }

        plot-container {
            border: 1px solid lightgray;
        }

        .info {
            border: 1px solid lightgray;
            border-radius: 10px;
            padding: 5px;
            background-color: white;
        }
    </style>
</head>
<body>
<script>
    const colors = [
      'lightgray',
      'orange',
      'green',
      'pink',
      'blue',
      'yellow'
    ]
    const plots = colors.map(c => `<plot-container>
    <svg class="plot small">
        <circle cx="150" cy="150" r="125" style="fill: ${c}"/>
    </svg>
    <plot-info>
        <div class="info">This is a(n) ${c} circle.</div>
    </plot-info>
    <plot-modal>
        <svg class="plot large">
            <circle cx="300" cy="300" r="250" fill="${c}"></circle>
        </svg>
    </plot-modal>
</plot-container>`)
    document.body.innerHTML = `<div class="plots">${plots.join('')}</div>`
</script>
</body>
</html>
``` 
