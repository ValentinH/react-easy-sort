import React from 'react'
import arrayMove from 'array-move'

import { withKnobs, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import SortableList, { SortableItem } from '../index'
import { generateItems } from './helpers'
import './styles.css'

export default {
  title: 'SortableList',
  component: SortableList,
  decorators: [withKnobs],
}

export const Example = () => {
  const count = number('Items', 9, { min: 3, max: 12, range: true })

  const [items, setItems] = React.useState<string[]>([])
  React.useEffect(() => {
    setItems(generateItems(count))
  }, [count])

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    action('onSortEnd')(`oldIndex=${oldIndex}, newIndex=${newIndex}`)
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
