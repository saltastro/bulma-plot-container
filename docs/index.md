# Welcome to bulma-plot-container

## Installation

You need to load the project file with a `script` element in your web page's header:

```html
<script src="/path/to/bulma-plot-container.js"></script>
```

## Getting started

Create a file `index.html` with the following content.

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

When you open this file, you'll see your plot, but none of the `plot-info` or `plot-modal` content. Hover over the plot, and the plot information appears, moving along with the cursor. When you click on the plot, a modal with your large plot is opened. You may close it again by clicking on its close button in the top right corner.

Both the `plot-info` and the `plot-modal` elements are optional and nothing evil will happen if you do not include them.

## CSS styling

[Bulma](https://bulma.io) is used for styling the plot components (and the modal in particular). However, how you style their content is completely up to you; the internal styling does not affect the html you put into the elements.

You have to make sure that the plot container is styled as a block element. Otherwise its internal div elements may exceed the plot's width, and the plot info may not be hidden when the cursor leaves a plot.

## An example

See the [example page](example.md) for an example of displaying a grid of plots.

## API

### plot-container

The `plot-container` element exposes no properties.

### plot-info

While the `plot-info` element exposes the following properties, there usually should be no need for you to use them.

* `visible` <[boolean]> Whether the element is visible.

* `position` <[Array]<[number]>> The position of the plot info element relative to the plot container. As you would expect from CSS, the position refers to the top left corner. The position is an array of integers denoting the left and top position in pixels.

### plot-modal

While the `plot-modal` element exposes the following properties, there usually should be no need for you to use them.

* `visible` <[boolean]> Whether the element is visible.

npm start
