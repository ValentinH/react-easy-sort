import React from 'react'
import arrayMove from 'array-move'

import { action } from '@storybook/addon-actions'
import { Story } from '@storybook/react'

import SortableList, { SortableItem } from '../../src/index'
import { generateItems } from '../helpers'
import { makeStyles } from '@material-ui/core'

export default {
  component: SortableList,
  title: 'react-easy-sort/Variable-width horizontal list',
  parameters: {
    componentSubtitle: 'SortableList',
  },
}

const useStyles = makeStyles({
  container: {
    display: 'inline-block',
    fontFamily: 'Helvetica, Arial, sans-serif',
    userSelect: 'none',
  },
  listClassic: {
    backgroundColor: 'rgb(170, 170, 240)',
    padding: '0.25rem',
  },
  listFlex: {
    backgroundColor: 'rgb(200, 200, 244)',
    display: 'flex',
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
    height: 24,
    cursor: 'grab',
  },
  dragged: {
    backgroundColor: 'rgb(37, 37, 197)',
  },
})

const widths = {
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
            <div
              className={classes.item}
              style={{
                width: widths[item],
                margin: '0.25rem',
                display: 'inline-flex',
              }}
            >
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
            <div className={classes.item} style={{ width: widths[item] }}>
              {item}
            </div>
          </SortableItem>
        ))}
      </SortableList>
    </div>
  )
}
