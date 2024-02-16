import { shoppingLists } from '../data'

export async function PATCH(
  request: Request,
  { params }: { params: { id: number } },
) {
  const body = await request.json()
  const { newItem, itemIndex } = body

  shoppingLists[0].item[itemIndex] = newItem
  return Response.json(shoppingLists[0])
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } },
) {
  const body = await request.json()
  const { itemIndex } = body

  const deletedItem = shoppingLists[0].item[itemIndex]
  shoppingLists[0].item.splice(itemIndex, 1)

  return Response.json(deletedItem)
}
