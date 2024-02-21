'use client'
import { ShoppingListType } from '@/models/shoppingList'
import axios from 'axios'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { BsHouseDoor } from 'react-icons/bs'
import { CiCircleCheck } from 'react-icons/ci'

export default function Sidebar() {
  const [shoppingLists, setShoppingLists] = useState<ShoppingListType[]>([])

  const getShoppingLists = async () => {
    const response = await axios.get('api/shoppingLists')
    setShoppingLists(response.data)
  }

  useEffect(() => {
    getShoppingLists()
  }, [])

  return (
    <div className="h-full w-80 px-4 pt-8 pb-4 text-center flex-col border border-solid">
      <Link href="/" className="flex justify-center items-center text-4xl">
        <BsHouseDoor />
        Home
      </Link>
      <div className="flex justify-center items-center text-4xl mt-4">
        <CiCircleCheck /> My lists
      </div>
      <ul className="text-xl list-none">
        {shoppingLists.map((shoppingList: ShoppingListType) => {
          return <li key={shoppingList.id}>{shoppingList.name}</li>
        })}
      </ul>
    </div>
  )
}
