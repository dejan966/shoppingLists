import { NextRequest } from 'next/server'
import { shoppingLists } from '../data'

export async function GET(nextRequest: NextRequest) {
  const searchParams = nextRequest.nextUrl.searchParams
  const query = searchParams.get('q')
  const filteredLists = query
    ? shoppingLists.filter((shoppingList) => {
        return shoppingList.item.toString().indexOf(query) >= 0
      })
    : null
  return Response.json(filteredLists)
}
