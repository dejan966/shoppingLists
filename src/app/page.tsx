'use client'
import { ShoppingListType } from '@/models/shoppingList'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
  const [checked, setChecked] = useState(true)
  const [shoppingLists, setShoppingLists] = useState<ShoppingListType[]>([])

  const getShoppingLists = async () => {
    const response = await axios.get('api/shoppingLists')
    setShoppingLists(response.data)
  }

  useEffect(() => {
    getShoppingLists()
  }, [])

  return (
    <div className="text-center w-full min-h-screen bg-white p-24">
      <h1 className="text-4xl">Shopping lists</h1>
      <br />
      <div className="flex justify-center items-center">
        {shoppingLists.map((shoppingList: ShoppingListType) => {
          return (
            <div
              className="text-start border rounded-xl p-4 w-10/11"
              key={shoppingList.id}
            >
              <h1 className="text-3xl font-bold">{shoppingList.name}</h1>
              {shoppingList.item.map((item: any, i: number) => (
                <div
                  className="text-xl grid grid-flow-col items-center gap-6 space-y-2"
                  key={i}
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-xl text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
                  />
                  <input
                    type="text"
                    name="item"
                    defaultValue={item}
                    className="border-t-0 border-l-0 border-r-0"
                  />
                  {checked && (
                    <button
                      type="button"
                      className="w-20 h-12 text-sm text-white bg-blue-800 hover:bg-blue-500 rounded-lg"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
              <div className="grid grid-flow-col gap-6 mt-2">
                <input
                  type="text"
                  name="newItem"
                  id="newItem"
                  placeholder="Add item"
                  className="w-[17.5rem] border-t-0 border-l-0 border-r-0 hover:border-y-black col-span-2"
                />
                <button
                  type="button"
                  className="w-20 h-12 text-sm text-white bg-blue-800 hover:bg-blue-500 rounded-lg"
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
