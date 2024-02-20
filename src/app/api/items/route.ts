import { shoppingLists } from '../data'

export async function POST(request: Request) {
  const body = await request.json()
  const { newItem, shoppingListIndex } = body
  const newI = {
    id: shoppingLists[shoppingListIndex].item.length + 1,
    name: newItem,
    checked: false,
  }

  shoppingLists[shoppingListIndex].item.push(newI)
  return new Response(JSON.stringify(shoppingLists))
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json()
  const { newItem, itemIndex } = body

  const index = shoppingLists.findIndex(
    (shoppingList) => shoppingList.id === parseInt(params.id),
  )

  shoppingLists[index].item[itemIndex].name = newItem
  return Response.json(shoppingLists[index])
}
