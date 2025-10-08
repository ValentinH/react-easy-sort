import React from 'react'
import { arrayMove } from '../../src/helpers'

import { action } from 'storybook/actions'
import { StoryFn } from '@storybook/nextjs-vite'

import SortableList, { SortableItem, SortableKnob } from '../../src/index'
import { generateItems } from '../helpers'

export default {
  title: 'react-easy-sort/With knobs',
  parameters: {
    componentSubtitle: 'SortableList',
  },
  argTypes: {
    count: {
      name: 'Number of elements',
      control: {
        type: 'range',
        min: 3,
        max: 12,
        step: 1,
      },
    },
  },
  args: {
    count: 3,
  },
}

type StoryProps = {
  count: number
}

export const Demo: StoryFn<StoryProps> = ({ count }) => {
  const [items, setItems] = React.useState<string[]>([])
  React.useEffect(() => {
    setItems(generateItems(count))
  }, [count])
  const onSortEnd = (oldIndex: number, newIndex: number) => {
    action('onSortEnd')(`oldIndex=${oldIndex}, newIndex=${newIndex}`)
    setItems((array) => arrayMove(array, oldIndex, newIndex))
  }
  return (
    <SortableList
      onSortEnd={onSortEnd}
      className="font-sans select-none"
      draggedItemClassName="bg-blue-800"
    >
      {items.map((item) => (
        <SortableItem key={item}>
          <div className="shrink-0 flex justify-between items-center bg-blue-600 text-white m-2 w-[150px] h-[34px] px-2">
            <SortableKnob>
              <div className="py-[0.15rem] px-2 text-blue-600 text-[0.8em] bg-white mr-2 rounded cursor-grab">
                DRAG
              </div>
            </SortableKnob>
            {item}
          </div>
        </SortableItem>
      ))}
    </SortableList>
  )
}
