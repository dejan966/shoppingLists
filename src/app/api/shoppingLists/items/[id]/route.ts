import { shoppingLists } from '../../data'
import { POST } from '../route'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json()
  const { name, shoppingListId } = body

  const index = shoppingLists.findIndex(
    (shoppingList) => shoppingList.id === shoppingListId,
  )

  const iIndex = shoppingLists[0].item.findIndex(
    (item) => item.id === parseInt(params.id),
  )

  if (iIndex === -1) {
    const r = JSON.stringify({ name: name, shoppingListIndex: index })
    const itemPost = await POST(
      new Request('http://localhost:3000', {
        method: 'POST',
        body: r,
      }),
    )
  }

  return Response.json(shoppingLists[index])
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json()
  const { name, index } = body
  const iIndex = shoppingLists[0].item.findIndex(
    (item) => item.id === parseInt(params.id),
  )

  if (iIndex === -1) {
    const r = JSON.stringify({ name: name, shoppingListIndex: index })
    const itemPost = await POST(
      new Request('http://localhost:3000', {
        method: 'POST',
        body: r,
      }),
    )
  }

  shoppingLists[0].item.splice(iIndex, 1)

  return Response.json(shoppingLists)
}
