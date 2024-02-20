import { shoppingLists } from '../data'

export async function POST(request: Request) {
  const body = await request.json()
  const { newItem, shoppingListIndex } = body
  shoppingLists[shoppingListIndex].item.push({
    name: newItem,
    checked: false,
  })
  return Response.json(shoppingLists)
}
