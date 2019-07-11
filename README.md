# EdgeScroll

`npm install edgescroll --save`

This component is built to solve problems related with autoscroll when the item is dragged. When you have an element that has a fixed position (i.e fixed top header) and it doesn't allow autoscroll to happen just put the `<EdgeScroll>` into the component that blocks autoscroll and the problem will be gone.

## Usage

### Example: How to use

```jsx
import EdgeScroll, { DOWNWARDS, UPWARDS } from  './lib';

<div class="top-header-that-blocks-autoscroll-and-is-fixed">
    <EdgeScroll
      inactiveStyle={{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: 0,
        position: "absolute"
      }}
      activeStyle={{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: "absolute"
      }}
      direction={UPWARDS}
    />
</div>

<div class="bottom-footer-that-blocks-autoscroll-and-is-fixed">
    <EdgeScroll
      inactiveStyle={{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: "absolute"
      }}
      activeStyle={{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: "absolute",
      }}
      direction={DOWNWARDS}
    />
</div>
```

### activeStyle (required): object

This style is used when the item is dragged. As it is required, you need to provide a styling
```jsx
activeStyle={{
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  position: "absolute",
}}
```

### inactiveStyle (required): object

This style is used when the item is in a passive/inactive state. As it is required, you need to provide a styling
```jsx
inactiveStyle={{
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  position: "absolute"
}}
```

### direction (optional): string

The desired direction of the scroll when the user drags the item onto `<EdgeScroll />`. <br />
Direction can be `"downwards"` or `"upwards"`. <br />
Default direction is `"upwards"`

### scrollDelay (optional): number

scrollDelay is used when you are holding a dragged item over a header or footer to make a delay between scrolls. <br />
Default is `1500ms`.

### delayBeforeActive (optional): number

delayBeforeActive is used for component to wait given time before becoming active. <br />
Default is `600ms`.

### scrollContainer (optional): element

scrollContainer is a reference to a container you want to scroll, as default scrollContainer is at `window`.





