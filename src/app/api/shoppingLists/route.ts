import { shoppingLists } from './data'

export async function POST(request: Request) {
  const newItem = await request.json()
  shoppingLists[0].item.push({ name: newItem.newItem, checked: false })
  return Response.json(shoppingLists)
}

export async function GET() {
  return Response.json(shoppingLists)
}
