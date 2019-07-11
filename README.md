# EdgeScroll

`npm install edgescroll --save`

This component is built to solve problems related with autoscroll when the item is dragged. When you have an element that has a fixed position (i.e fixed top header) and it doesn't allow autoscroll to happen just put the `<EdgeScroll>` into the component that blocks autoscroll and the problem will be gone.

## Usage

```jsx
import EdgeScroll from 'edgescroll'

<div class="top-header-that-blocks-autoscroll">
  <ul>
    <li>My first nav link>
    <li>My second nav link>
    <li>My third nav link>
  </ul>
  <EdgeScroll
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "50px"
    }}
  />
</div>
```

### isChild: bool

Default is true, if set false you have to supply all the stylings of the component

### style: object

Default `{ height: "auto"}`. Standard style object used in inline css stylings. Styles are used when the item is dragged, otherwise height is 0.

### direction: string

Default "upwards", can be "downwards". The desired direction of the scroll when the user drags the item onto `<EdgeScroll />` .

## Examples how to use

Usage 1
explanation 1
animated gif screenshare 1
