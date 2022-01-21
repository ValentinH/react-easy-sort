import React from 'react'
import arrayMove from 'array-move'

import { action } from '@storybook/addon-actions'
import { Story } from '@storybook/react'

import SortableList, { SortableItem } from '../../src/index'
import { generateItems } from '../helpers'
import { makeStyles } from '@material-ui/core'

export default {
  component: SortableList,
  title: 'react-easy-sort/Variable-height vertical list',
  parameters: {
    componentSubtitle: 'SortableList',
  },
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    fontFamily: 'Helvetica, Arial, sans-serif',
    userSelect: 'none',
  },
  listClassic: {
    backgroundColor: 'rgb(170, 170, 240)',
  },
  listFlex: {
    backgroundColor: 'rgb(200, 200, 244)',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 8,
  },
  item: {
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(84, 84, 241)',
    color: 'white',
    width: 150,
    cursor: 'grab',
  },
  dragged: {
    backgroundColor: 'rgb(37, 37, 197)',
  },
})

const heights = {
  A: 120,
  B: 30,
  C: 60,
  D: 90,
}

export const Demo: Story = () => {
  const classes = useStyles()

  const [items, setItems] = React.useState<string[]>(() => generateItems(4))

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    action('onSortEnd')(`oldIndex=${oldIndex}, newIndex=${newIndex}`)
    setItems((array) => arrayMove(array, oldIndex, newIndex))
  }

  return (
    <div className={classes.container}>
      <SortableList
        onSortEnd={onSortEnd}
        className={classes.listClassic}
        draggedItemClassName={classes.dragged}
      >
        {items.map((item) => (
          <SortableItem key={item}>
            <div className={classes.item} style={{ height: heights[item], margin: '0.5rem' }}>
              {item}
            </div>
          </SortableItem>
        ))}
      </SortableList>
      <SortableList
        onSortEnd={onSortEnd}
        className={classes.listFlex}
        draggedItemClassName={classes.dragged}
      >
        {items.map((item) => (
          <SortableItem key={item}>
            <div className={classes.item} style={{ height: heights[item] }}>
              {item}
            </div>
          </SortableItem>
        ))}
      </SortableList>
    </div>
  )
}
