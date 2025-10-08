import React from 'react'
import { arrayMove } from '../../src/helpers'

import { action } from 'storybook/actions'
import { StoryFn } from '@storybook/nextjs-vite'

import SortableList, { SortableItem } from '../../src/index'
import { generateItems } from '../helpers'

export default {
  title: 'react-easy-sort/Simple grid',
  parameters: {
    componentSubtitle: 'SortableList',
  },
  argTypes: {
    count: {
      name: 'Number of elements',
      control: {
        type: 'range',
        min: 3,
        max: 120,
        step: 1,
      },
    },
    autoScroll: {
      name: 'Auto scroll',
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    count: 12,
    autoScroll: false,
  },
}

type StoryProps = {
  count: number
  autoScroll: boolean
}

export const Demo: StoryFn<StoryProps> = ({ count, autoScroll }: StoryProps) => {
  const [items, setItems] = React.useState<string[]>([])
  React.useEffect(() => {
    setItems(generateItems(count))
  }, [count])

  console.log(items, count)

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    action('onSortEnd')(`oldIndex=${oldIndex}, newIndex=${newIndex}`)
    setItems((array) => arrayMove(array, oldIndex, newIndex))
  }

  return (
    <SortableList
      onSortEnd={onSortEnd}
      className="font-sans select-none grid grid-cols-3 gap-4 sm:gap-6"
      draggedItemClassName="bg-blue-800"
      autoScroll={autoScroll}
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
