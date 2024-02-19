import { NextResponse } from 'next/server'
import path from 'path'
import { writeFile } from 'fs/promises'
import { promises as fs, readFile } from 'fs'

export async function POST(req: any, res: any) {
  const formData = await req.formData()

  const file = formData.get('list')
  if (!file) {
    return NextResponse.json({ error: 'No files received.' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = file.name.replaceAll(' ', '_')

  try {
    await writeFile(
      path.join(process.cwd(), 'public/assets/' + filename),
      buffer,
    )
    const r = await fs.readFile(
      path.join(process.cwd() + '/public/assets/' + filename),
      'utf8',
    )
    const data = JSON.parse(r)
    return NextResponse.json({ message: 'Success', data: data, status: 201 })
  } catch (error) {
    console.log('Error occured in importing', error)
    return NextResponse.json({ message: 'Failed', status: 500 })
  }
}
