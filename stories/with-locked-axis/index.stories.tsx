import React from 'react'
import { arrayMove } from '../../src/helpers'

import { action } from 'storybook/actions'
import { StoryFn } from '@storybook/nextjs-vite'

import SortableList, { SortableItem } from '../../src/index'
import { generateItems } from '../helpers'

export default {
  title: 'react-easy-sort/Axis lock',
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
    lockAxis: {
      options: ['x', 'y'],
      control: { type: 'inline-radio' },
    },
  },
  args: {
    count: 6,
    lockAxis: 'x',
  },
}

type StoryProps = {
  count: number
  lockAxis: 'x' | 'y'
}

export const Demo: StoryFn<StoryProps> = ({ count, lockAxis }: StoryProps) => {
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
      className="font-sans select-none grid grid-cols-3 gap-4 sm:gap-6"
      draggedItemClassName="bg-blue-800"
      lockAxis={lockAxis}
    >
      {items.map((item) => (
        <SortableItem key={item}>
          <div className="flex justify-center items-center bg-blue-600 text-white h-[150px] cursor-grab text-xl select-none">
            {item}
          </div>
        </SortableItem>
      ))}
    </SortableList>
  )
}
