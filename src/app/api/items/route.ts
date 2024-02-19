import { shoppingLists } from '../shoppingLists/data'

export async function POST(request: Request) {
  const newItem = await request.json()
  shoppingLists[0].item.push({ name: newItem.newItem, checked: false })
  return Response.json(shoppingLists)
}
