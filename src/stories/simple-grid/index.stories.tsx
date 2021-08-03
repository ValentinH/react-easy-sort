import React from 'react'
import arrayMove from 'array-move'

import { withKnobs, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import SortableList, { SortableItem } from '../../index'
import { generateItems } from '../helpers'
import { makeStyles } from '@material-ui/core'

export default {
  title: 'react-easy-sort/Simple grid',
  component: SortableList,
  decorators: [withKnobs],
}

const useStyles = makeStyles({
  list: {
    fontFamily: 'Helvetica, Arial, sans-serif',
    userSelect: 'none',
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    gridGap: 16,
    '@media (min-width: 600px)': {
      gridGap: 24,
    },
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(84, 84, 241)',
    color: 'white',
    height: 150,
    cursor: 'grab',
    fontSize: 20,
    userSelect: 'none',
  },
  dragged: {
    backgroundColor: 'rgb(37, 37, 197)',
  },
})

export const Demo = () => {
  const classes = useStyles()
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
    <SortableList
      as="div"
      onSortEnd={onSortEnd}
      className={classes.list}
      draggedItemClassName={classes.dragged}
    >
      {items.map((item) => (
        <SortableItem key={item}>
          <div className={classes.item}>{item}</div>
        </SortableItem>
      ))}
    </SortableList>
  )
}
