import { shoppingLists } from '../data'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json()
  const name = body.name

  const index = shoppingLists.findIndex(
    (shoppingList) => shoppingList.id === parseInt(params.id),
  )

  shoppingLists[index].name = name
  return Response.json(shoppingLists[index])
}
