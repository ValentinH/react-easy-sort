export const generateItems = (count: number) => {
  const items = []
  for (let i = 0; i < count; i++) {
    items.push(`Item ${i}`)
  }
  return items
}
