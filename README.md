# react-easy-sort

A React component to sort items in lists or grids

![react-easy-sort-demo](https://user-images.githubusercontent.com/2678610/107010948-4a58fa80-6797-11eb-95f8-bc7d3abbdc96.gif)

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

## Development

```shell
yarn
yarn start
```

Now, open `http://localhost:3001/index.html` and start hacking!

## License

[MIT](https://github.com/ricardo-ch/react-easy-sort/blob/master/LICENSE)
