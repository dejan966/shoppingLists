import { shoppingLists } from './data'

export async function POST(request: Request) {
  const newItem = await request.json()
  shoppingLists[0].item.push(newItem)
  return new Response(JSON.stringify(newItem))
}

export async function GET() {
  return Response.json(shoppingLists)
}
