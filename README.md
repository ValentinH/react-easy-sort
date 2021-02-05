# react-easy-sort

A React component to sort items in lists or grids

## Features

- Supports horizontal and vertical lists
- Supports grid layouts
- Mobile-friendly
- IE11 support 🙈

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
