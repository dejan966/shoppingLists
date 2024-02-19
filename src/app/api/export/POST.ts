import { ShoppingListType } from '@/models/shoppingList'
import { NextResponse } from 'next/server'

export async function POST(array: ShoppingListType) {
  try {
    fs.writeFileSync('./test.txt', JSON.stringify(array))
    return NextResponse.json({ Message: 'Success', status: 201 })
  } catch (error) {
    console.log('Error occured ', error)
    return NextResponse.json({ Message: 'Failed', status: 500 })
  }
}
