import { NextResponse } from 'next/server'
import fs from 'fs'

export async function POST(req: Request) {
  const body = await req.json()
  const { shoppingList } = body

  const filename = 'shopping_list_' + shoppingList.id
  try {
    fs.writeFileSync(
      'public/assets/' + filename + '.json',
      JSON.stringify(shoppingList),
    )
    return NextResponse.json({ Message: 'Success', status: 201 })
  } catch (error) {
    console.log('Error occured ', error)
    return NextResponse.json({ Message: 'Failed', status: 500 })
  }
}
