# react-easy-sort

A React component to sort items in lists or grids

![react-easy-sort-demo](https://user-images.githubusercontent.com/2678610/107036435-f27fbb00-67b9-11eb-8e3f-72a000586d35.gif)

The goal of this component is to allow sorting elements with drag and drop.

It is mobile friendly by default. It doesn't block scrolling the page when swiping inside it:
the user needs to press an item during at least 200ms to start the drag gesture.

On non-touch device, the drag gesture only starts after moving an element by at least one pixel.
This is done to avoid blocking clicks on clickable elements inside an item.

## Features

- Supports horizontal and vertical lists
- Supports grid layouts
- Mobile-friendly
- IE11 support 🙈

## Demo

Check out the examples:

- [Example with grid layout](https://codesandbox.io/s/react-easy-sort-grid-demo-87ev9)
- [Example with vertical list layout](https://codesandbox.io/s/react-easy-sort-vertical-list-demo-njg4i)
- [Example with horizontal list layout](https://codesandbox.io/s/react-easy-sort-horizontal-list-demo-69b3k)
- [Interactive avatars demo](https://codesandbox.io/s/react-easy-sort-images-demo-486qk)

## Installation

```shell
yarn add react-easy-sort
```

or

```shell
npm install react-easy-sort --save
```

## Basic usage

```js
import SortableList, { SortableItem } from 'react-easy-sort'
import arrayMove from 'array-move'

const App = () => {
  const [items, setItems] = React.useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'])

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setItems((array) => arrayMove(array, oldIndex, newIndex))
  }

  return (
    <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
      {items.map((item) => (
        <SortableItem key={item}>
          <div className="item">{item}</div>
        </SortableItem>
      ))}
    </SortableList>
  )
}
```

## Props

### SortableList

| Name                     |                   Description                    |                      Type                      | Default |
| ------------------------ | :----------------------------------------------: | :--------------------------------------------: | ------: |
| **onSortEnd\***          | Called when the user finishes a sorting gesture. | `(oldIndex: number, newIndex: number) => void` |       - |
| **draggedItemClassName** |     Class applied to the item being dragged      |                    `string`                    |       - |

### SortableItem

This component doesn't take any other props than its child. This child should be a single React element that can receives a ref. If you pass a component as a child, it needs to be wrapped with `React.forwardRef()`.

## Development

```shell
yarn
yarn start
```

Now, open `http://localhost:3001/index.html` and start hacking!

## License

[MIT](https://github.com/ricardo-ch/react-easy-sort/blob/master/LICENSE)
