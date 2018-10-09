# bulma-plot-container: Plot container for plots with additional information

bulma-plot-container defines web components that let you add plots to your website which display plot information when you hover over them and open a modal with a larger version when you click on them. [Bulma](https://bulma.io) is used for styling.

While the web components are mostly intended for plots, you may use them with any other content, such as images.

This project was motivated by functionality on [ESO's data quality site](http://www.eso.org/observing/dfo/quality/).

## Documentation

You can view the documentation on [Read the Docs](https://bulma-plot-container.readthedocs.io/en/latest/).

## Installation

To use the plot container on a web page, include its JavaScript file in the page header:

```html
<script src="https://unpkg.com/@saltastro/bulma-plot-container"></script>
```

If you prefer serving the JavaScript file yourself, install the package with npm:

```bash
npm install --save @saltastro/bulma-plot-container
```

The file to serve then is `node_modules/@saltastro/bulma-plot-container/dist/index.js`.

## Example

Here is a simple example of using the web components.

```html
<!DOCTYPE html>
<html>
<head>
<script src="https://unpkg.com/@saltastro/bulma-plot-container"></script>
<style>
  .plot {
    width: 300px;
    height: 300px;
    padding: 1em;
    border: solid 1px lightgray;
    color: green;
  }
  
  .large-plot {
    width: 600px;
    height: 600px;
    padding: 1em;
    border: solid 1px lightgray;
    color: blue;
  }
  
  .info {
    padding: 1em;
    border: solid 1px lightgray;
    color: orange;
  }
</style>
</head>
<body>
<plot-container>
  <div class="plot">
    <p>Here would</p>
    <p>be your</p>
    <p>plot</p>
  </div>
  <plot-info>
    <div class="info">
      <p>Here would</p>
      <p>be some info</p>
      <p>about the plot</p>
    </div>
  </plot-info>
  <plot-modal>
    <div class="large-plot">
      <p>Here would</p>
      <p>be a larger version</p>
      <p>of your plot</p>
    </div>
  </plot-modal>
</plot-container>
</body>
</html>
```

Both the `plot-info` and `plot-modal` element are optional.
