import React from 'react'
import arrayMove from 'array-move'

import { action } from '@storybook/addon-actions'
import { Story } from '@storybook/react'

import SortableList, { SortableItem, SortableKnob } from '../../index'
import { generateItems } from '../helpers'
import { makeStyles } from '@material-ui/core'

export default {
  component: SortableList,
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
      defaultValue: 3,
    },
  },
}

const useStyles = makeStyles({
  list: {
    fontFamily: 'Helvetica, Arial, sans-serif',
    userSelect: 'none',
  },
  item: {
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgb(84, 84, 241)',
    color: 'white',
    margin: 8,
    width: 150,
    height: 34,
    padding: '0 8px',
  },
  dragged: {
    backgroundColor: 'rgb(37, 37, 197)',
  },
  knob: {
    padding: '0.15rem 0.5rem',
    color: 'rgb(84, 84, 241)',
    fontSize: '0.8em',
    backgroundColor: 'white',
    marginRight: '0.5rem',
    borderRadius: '2px',
    cursor: 'grab',
  },
})

type StoryProps = {
  count: number
}

export const Demo: Story<StoryProps> = ({ count }) => {
  const classes = useStyles()

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
      className={classes.list}
      draggedItemClassName={classes.dragged}
    >
      {items.map((item) => (
        <SortableItem key={item}>
          <div className={classes.item}>
            <SortableKnob>
              <div className={classes.knob}>DRAG</div>
            </SortableKnob>
            {item}
          </div>
        </SortableItem>
      ))}
    </SortableList>
  )
}
