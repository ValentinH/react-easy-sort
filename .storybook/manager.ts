import { addons } from '@storybook/addons'
import { create } from '@storybook/theming'

const theme = create({
  base: 'light',
  brandTitle: 'react-easy-sort',
})

addons.setConfig({
  theme,
})
