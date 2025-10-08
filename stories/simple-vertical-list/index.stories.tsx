import React from 'react'
import { arrayMove } from '../../src/helpers'

import { action } from 'storybook/actions'
import { StoryFn } from '@storybook/nextjs-vite'

import SortableList, { SortableItem } from '../../src/index'
import { generateItems } from '../helpers'

export default {
  title: 'react-easy-sort/Simple vertical list',
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
    count: 30,
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

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    action('onSortEnd')(`oldIndex=${oldIndex}, newIndex=${newIndex}`)
    setItems((array) => arrayMove(array, oldIndex, newIndex))
  }

  return (
    <SortableList
      onSortEnd={onSortEnd}
      className="font-sans select-none"
      draggedItemClassName="bg-blue-800"
      autoScroll={autoScroll}
    >
      {items.map((item) => (
        <SortableItem key={item}>
          <div className="shrink-0 flex justify-center items-center bg-blue-600 text-white m-2 w-[150px] h-[34px] cursor-grab">
            {item}
          </div>
        </SortableItem>
      ))}
    </SortableList>
  )
}
