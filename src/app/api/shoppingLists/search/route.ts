import { NextRequest } from 'next/server'
import { shoppingLists } from '../data'
import { ShoppingListType } from '@/models/shoppingList'

export async function GET(nextRequest: NextRequest) {
  const searchParams = nextRequest.nextUrl.searchParams
  const query = searchParams.get('q')
  const filteredLists: ShoppingListType[] = []
  if (query !== '') {
    shoppingLists.filter((shoppingList, i) => {
      shoppingList.item.filter(
        (item) =>
          item.name.includes(query as string) &&
          filteredLists.push(shoppingLists[i]),
      )
    })
  }
  return Response.json(filteredLists)
}
