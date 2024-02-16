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

export async function DELETE(request: Request) {
  const body = await request.json()
  const { itemToDelete } = body

  const index = shoppingLists[0].item.findIndex((item) => item === itemToDelete)
  const deletedItem = shoppingLists[0].item[index]
  shoppingLists[0].item.splice(index, 1)

  return Response.json(deletedItem)
}
