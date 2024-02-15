import { NextRequest } from 'next/server'
import { shoppingLists } from '../data'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  const filteredLists = query
    ? shoppingLists.filter((shoppingList) => shoppingList.item.includes(query))
    : shoppingLists
  return Response.json(filteredLists)
}
