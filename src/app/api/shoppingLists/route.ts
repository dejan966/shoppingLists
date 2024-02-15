import { shoppingLists } from './data'

export async function POST(request: Request) {
  const newItem = await request.json()
  shoppingLists[0].item.push(newItem)
  return new Response(JSON.stringify(newItem))
}

export async function GET() {
  return Response.json(shoppingLists)
}

export async function DELETE(request: Request) {
  const itemToDelete = request.body?.toString()

  const index = shoppingLists[0].item.findIndex((item) => item === itemToDelete)
  const deletedItem = shoppingLists[0].item[index]
  shoppingLists[0].item.splice(index, 1)

  return Response.json(deletedItem)
}
