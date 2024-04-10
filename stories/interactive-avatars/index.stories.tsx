import React from 'react'
import arrayMove from 'array-move'

import { Story } from '@storybook/react'

import SortableList, { SortableItem } from '../../src/index'
import { Avatar, Fab, makeStyles } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'

export default {
  component: SortableList,
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

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    userSelect: 'none',
    width: 996,
    margin: '30px auto',
  },
  item: {
    position: 'relative',
    flexShrink: 0,
    display: 'flex',
    margin: 8,
    cursor: 'grab',
    userSelect: 'none',
    boxShadow: '0px 6px 6px -3px rgba(0, 0, 0, 0.2)',
    borderRadius: '100%',
  },
  image: {
    width: 150,
    height: 150,
    pointerEvents: 'none',
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  dragged: {
    boxShadow:
      '0px 6px 6px -3px rgba(0, 0, 0, 0.2), 0px 10px 14px 1px rgba(0, 0, 0, 0.14), 0px 4px 18px 3px rgba(0, 0, 0, 0.12)',
    '& button': {
      opacity: 0,
    },
    cursor: 'move',
    zIndex: 100,
  },
  forbidden: {
    cursor: 'not-allowed',
  },
})

type StoryProps = {
  count: number
}

export const Demo: Story<StoryProps> = ({ count }: StoryProps) => {
  const classes = useStyles()
  const [items, setItems] = React.useState([
    {
      name: 'Alpha',
      image: 'https://i.pinimg.com/736x/ae/c4/53/aec453161b2f33ffc6219d8a758307a9.jpg',
    },
    {
      name: 'Bravo',
      image: 'https://assets.slice.ca/wp-content/uploads/2020/01/cutest-dog-names-2020.jpg',
    },
    {
      name: 'Charlie',
      image:
        'https://topdogtips.com/wp-content/uploads/2014/12/Top-10-Cute-Dog-Breeds-Who-Wins-1.jpg',
    },
    {
      name: 'Delta',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQFNTv7ogK6omzBeZSWZOVJ7ZDqYi51MdJq6g&usqp=CAU',
    },
    {
      name: 'Echo',
      image:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=640:*',
    },
    {
      name: 'Foxtrot',
      image:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/beau-enjoying-his-freedom-in-ohio-us-on-july-28-2015-a-cute-news-photo-484455470-1551896268.jpg?crop=0.419xw:1.00xh;0.236xw,0&resize=480:*',
    },
    {
      name: 'Golf',
      image:
        'data:image/jpeg;base64,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',
    },
    {
      name: 'Hotel',
      image:
        'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=282_200',
    },
    {
      name: 'India',
      image:
        'https://www.petmoo.com/wp-content/uploads/2018/08/Happy-Puppies-Questions-990x556.jpg',
    },
    {
      name: 'Kilo',
      image:
        'https://s36700.pcdn.co/wp-content/uploads/2017/08/A-happy-puppy-lying-in-the-grass-outside-600x400.jpg.optimal.jpg',
    },
    {
      name: 'Lima',
      image: 'https://static.parade.com/wp-content/uploads/2021/03/Top-10-Puppy-Names-of-2021.jpg',
    },
  ])

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setItems((array) => arrayMove(array, oldIndex, newIndex))
  }

  return (
    <SortableList
      onSortEnd={onSortEnd}
      className={classes.root}
      draggedItemClassName={classes.dragged}
      draggedForbiddenClassName={classes.forbidden}
      forbiddenPointType='point'
    >
      {items.slice(0, count).map(({ name, image }) => (
        <SortableItem key={name}>
          <div className={classes.item}>
            <Avatar
              className={classes.image}
              alt={name}
              src={image}
              imgProps={{ draggable: false }}
            />
            <Fab
              color="primary"
              size="small"
              className={classes.button}
              aria-label="like"
              onClick={() => alert('Woof!')}
            >
              <FavoriteIcon />
            </Fab>
          </div>
        </SortableItem>
      ))}
    </SortableList>
  )
}
