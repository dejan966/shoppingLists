import { shoppingLists } from '../../data'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json()
  const { newName } = body

  const index = shoppingLists.findIndex(
    (shoppingList) => shoppingList.id === parseInt(params.id),
  )

  shoppingLists[index].name = newName
  return Response.json(shoppingLists[index])
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json()
  const { itemIndex } = body

  const index = shoppingLists.findIndex(
    (shoppingList) => shoppingList.id === parseInt(params.id),
  )

  shoppingLists[index].item.splice(itemIndex, 1)

  return Response.json(shoppingLists)
}
