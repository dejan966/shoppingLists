import { shoppingLists } from '../../../data'
import { POST } from '../../route'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json()
  const { itemIndex, check, itemID, itemName } = body

  const index = shoppingLists.findIndex(
    (shoppingList) => shoppingList.id === parseInt(params.id),
  )

  const iIndex = shoppingLists[index].item.findIndex(
    (item) => item.id === itemID,
  )

  if (iIndex === -1) {
    const r = JSON.stringify({ newItem: itemName, shoppingListIndex: index })
    const itemPost = await POST(
      new Request('http://localhost:3000', {
        method: 'POST',
        body: r,
      }),
    )
  }
  shoppingLists[index].item[itemIndex].checked = !check
  return new Response(JSON.stringify(shoppingLists[index]))
}
