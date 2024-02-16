'use client'

import { ShoppingListType } from '@/models/shoppingList'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
  const [shoppingLists, setShoppingLists] = useState<ShoppingListType[]>([])
  useEffect(() => {
    axios.get('api/shoppingLists').then((response: any) => {
      setShoppingLists(response.data)
    })
  }, [])
  return (
    <div className="text-center w-full min-h-screen bg-white p-24">
      <h1 className=" text-4xl">Shopping lists</h1>
      <br />
      <div className="flex justify-center items-center">
        {shoppingLists.map((shoppingList: ShoppingListType) => {
          return (
            <div
              className="text-start border rounded-xl p-4"
              key={shoppingList.id}
            >
              <h1 className="text-3xl font-bold">{shoppingList.name}</h1>
              {shoppingList.item.map((item: any, i: number) => (
                <div className="text-xl" key={i}>
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-xl text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
                  />
                  <label className="ms-2 text-xl">{item}</label>
                </div>
              ))}
              <div>
                <input
                  type="text"
                  name="newItem"
                  placeholder="Add item"
                  className="border-t-0 border-l-0 border-r-0 hover:border-y-black"
                />
                <button
                  type="button"
                  className="w-12 h-12 bg-blue-800 hover:bg-blue-500 rounded-lg"
                >
                  Add
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
