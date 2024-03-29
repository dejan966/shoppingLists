import { ItemType } from '@/models/item'
import { ShoppingListType } from '@/models/shoppingList'
import { useState } from 'react'
import Dropdown from '../ui/Dropdown'

interface Props {
  shoppingLists: ShoppingListType[]
  edit: (event: any, itemId: number, shoppingListId: number) => void
  deleteItem: (i: number, itemId: number, name: string) => void
  addItem: (item: string, index: number) => void
  onCheck: (
    id: number,
    shoppingListIndex: number,
    itemIndex: number,
    itemCheck: boolean,
    itemID: number,
    itemName: string,
  ) => void
}

export default function ListBlock({
  shoppingLists,
  edit,
  deleteItem,
  addItem,
  onCheck,
}: Props) {
  const [itemValue, setItemValue] = useState('')
  return (
    <div className="text-center w-full h-full bg-white p-24">
      <h1 className="text-4xl">Shopping lists</h1>
      <br />
      <div className="flex justify-center items-center">
        {Object.values(shoppingLists)?.map(
          (shoppingList: ShoppingListType, index: number) => {
            return (
              <div
                className="text-start border rounded-xl p-4 w-10/11"
                key={shoppingList.id}
              >
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold">{shoppingList.name}</h1>
                  <Dropdown shoppingList={shoppingList} />
                </div>
                {shoppingList.item.map((item: ItemType, i: number) => (
                  <div
                    className="text-xl grid grid-flow-col items-center gap-6 space-y-2"
                    key={i}
                  >
                    <input
                      type="checkbox"
                      defaultChecked={item.checked}
                      onChange={() =>
                        onCheck(
                          shoppingList.id,
                          index,
                          i,
                          item.checked,
                          item.id,
                          item.name,
                        )
                      }
                      className="w-4 h-4 text-xl text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                    {item.checked ? (
                      <input
                        type="text"
                        name="item"
                        onChange={(event) => {
                          edit(event, item.id, shoppingList.id)
                        }}
                        defaultValue={item.name}
                        className="border-t-0 border-l-0 border-r-0 focus:outline-none focus:ring-0 focus:border-2 focus:border-white focus:border-b-blue-500"
                      />
                    ) : (
                      <input
                        type="text"
                        name="item"
                        defaultValue={item.name}
                        className="border-t-0 border-l-0 border-r-0 focus:outline-none focus:ring-0 focus:border-2 focus:border-white focus:border-b-blue-500"
                        readOnly
                      />
                    )}
                    {item.checked && (
                      <button
                        type="button"
                        className="w-20 h-12 text-sm text-white bg-blue-800 hover:bg-blue-500 rounded-lg"
                        onClick={() => {
                          deleteItem(index, item.id, item.name)
                        }}
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
                    value={itemValue}
                    onChange={(event) => {
                      setItemValue(event.target.value)
                    }}
                    placeholder="Add item"
                    className="w-[17.5rem] border-t-0 border-l-0 border-r-0 hover:border-y-black col-span-2 focus:outline-none focus:ring-0 focus:border-2 focus:border-white focus:border-b-blue-500"
                  />
                  <button
                    type="button"
                    className="w-20 h-12 text-sm text-white bg-blue-800 hover:bg-blue-500 rounded-lg"
                    onClick={() => {
                      addItem(itemValue, index)
                      setItemValue('')
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            )
          },
        )}
      </div>
    </div>
  )
}
