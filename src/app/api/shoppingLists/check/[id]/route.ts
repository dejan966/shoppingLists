import { shoppingLists } from '../../../data'

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json()
  const { itemIndex, check } = body
  const index = shoppingLists.findIndex(
    (shoppingList) => shoppingList.id === parseInt(params.id),
  )

  shoppingLists[index].item[itemIndex].checked = !check
  return new Response(JSON.stringify(shoppingLists[index]))
}
