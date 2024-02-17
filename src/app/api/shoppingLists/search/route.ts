import { shoppingLists } from '../data'

export async function POST(request: Request) {
  const body = await request.json()
  const { search } = body

  const filteredLists = search
    ? shoppingLists.filter((shoppingList) =>
        shoppingList.item.filter((s) => s.includes(search)),
      )
    : null
  return Response.json(filteredLists)
}
