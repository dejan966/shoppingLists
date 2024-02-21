import { ShoppingListType } from '@/models/shoppingList'
import { shoppingLists } from './data'

export async function GET() {
  return Response.json(shoppingLists)
}

export async function PATCH(request: Request) {
  const body = await request.json()
  const { sL } = body
  sL.map((s: ShoppingListType) => {
    const index = shoppingLists.findIndex(
      (shoppingList) => shoppingList.name === s.name,
    )
    if (index === -1) {
      addNewList(s)
    } else if (index !== -1) {
      shoppingLists.splice(index, 1, s)
    }
  })
  return Response.json(shoppingLists)
}

function addNewList(newShoppingList: ShoppingListType) {
  shoppingLists.push(newShoppingList)
}
