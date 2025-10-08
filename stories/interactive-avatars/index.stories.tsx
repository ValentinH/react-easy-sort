import React from 'react'
import { arrayMove } from '../../src/helpers'

import { StoryFn } from '@storybook/nextjs-vite'

import SortableList, { SortableItem } from '../../src/index'

export default {
  title: 'react-easy-sort/Interactive avatars',
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
      defaultValue: 8,
    },
  },
}

type StoryProps = {
  count: number
}

export const Demo: StoryFn<StoryProps> = ({ count }: StoryProps) => {
  const [items, setItems] = React.useState([
    {
      name: 'Alpha',
      image: 'https://placedog.net/300?id=1',
    },
    {
      name: 'Bravo',
      image: 'https://placedog.net/300?id=2',
    },
    {
      name: 'Charlie',
      image: 'https://placedog.net/300?id=3',
    },
    {
      name: 'Delta',
      image: 'https://placedog.net/300?id=4',
    },
    {
      name: 'Echo',
      image: 'https://placedog.net/300?id=5',
    },
    {
      name: 'Foxtrot',
      image: 'https://placedog.net/300?id=6',
    },
    {
      name: 'Golf',
      image: 'https://placedog.net/300?id=7',
    },
    {
      name: 'Hotel',
      image: 'https://placedog.net/300?id=8',
    },
    {
      name: 'India',
      image: 'https://placedog.net/300?id=9',
    },
    {
      name: 'Kilo',
      image: 'https://placedog.net/300?id=10',
    },
    {
      name: 'Lima',
      image: 'https://placedog.net/300?id=11',
    },
  ])

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setItems((array) => arrayMove(array, oldIndex, newIndex))
  }

  return (
    <SortableList
      onSortEnd={onSortEnd}
      className="flex flex-wrap select-none"
      draggedItemClassName="shadow-2xl [&_button]:opacity-0"
    >
      {items.slice(0, count).map(({ name, image }) => (
        <SortableItem key={name}>
          <div className="relative shrink-0 flex m-2 cursor-grab select-none rounded-full">
            <img
              className="w-[150px] h-[150px] pointer-events-none rounded-full object-cover"
              alt={name}
              src={image}
              draggable={false}
            />
            <button
              className="cursor-pointer absolute bottom-0 right-0 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700"
              aria-label="like"
              onClick={() => alert('Woof!')}
            >
              ❤️
            </button>
          </div>
        </SortableItem>
      ))}
    </SortableList>
  )
}
