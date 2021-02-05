import React from 'react'
import ReactDOM from 'react-dom'
import SortableList, { SortableItem } from '../../src/index'
import arrayMove from 'array-move'
import './styles.css'

export const App = () => {
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

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
