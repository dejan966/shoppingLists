import { shoppingLists } from '../data'

export async function POST(request: Request) {
  const body = await request.json()
  const { name, shoppingListIndex } = body
  const newI = {
    id: shoppingLists[shoppingListIndex].item.length + 1,
    name: name,
    checked: false,
  }

  shoppingLists[shoppingListIndex].item.push(newI)
  return new Response(JSON.stringify(shoppingLists))
}
