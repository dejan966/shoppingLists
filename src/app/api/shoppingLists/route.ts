import { shoppingLists } from './data'

export async function POST(request: Request) {
  const newItem = await request.json()
  shoppingLists[0].item.push(newItem)
  return new Response(JSON.stringify(newItem))
}

export async function GET() {
  return Response.json(shoppingLists)
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: number } },
) {
  const body = await request.json()
  const { item } = body

  shoppingLists[0].item[params.id] = item
  return Response.json(shoppingLists[0])
}

export async function DELETE(request: Request) {
  const itemToDelete = request.body?.toString()

  const index = shoppingLists[0].item.findIndex((item) => item === itemToDelete)
  const deletedItem = shoppingLists[0].item[index]
  shoppingLists[0].item.splice(index, 1)

  return Response.json(deletedItem)
}
