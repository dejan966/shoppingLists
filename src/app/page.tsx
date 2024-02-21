'use client'
import ListBlock from '@/components/shoppingLists/ListBlock'
import { ShoppingListType } from '@/models/shoppingList'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
  const [shoppingLists, setShoppingLists] = useState<ShoppingListType[]>([])

  const getShoppingLists = async () => {
    const response = await axios.get('api/shoppingLists')
    setShoppingLists(response.data)
  }

  useEffect(() => {
    getShoppingLists()
  }, [])

  const edit = async (event: any, itemId: number, shoppingListId: number) => {
    const timer = setTimeout(async () => {
      editItem(event.target.value, itemId, shoppingListId)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }

  const addItem = async (item: string, index: number) => {
    const res = await axios.post('api/shoppingLists/items', {
      name: item,
      shoppingListIndex: index,
    })
    getShoppingLists()
  }

  const editItem = async (
    item: string,
    itemid: number,
    shoppingListId: number,
  ) => {
    const res = await axios.patch(`api/shoppingLists/items/${itemid}`, {
      name: item,
      shoppingListId: shoppingListId,
    })
  }

  const deleteItem = async (i: number, itemId: number, name: string) => {
    const res = await axios.delete(`api/shoppingLists/items/${itemId}`, {
      data: {
        name: name,
        index: i,
      },
    })
    getShoppingLists()
  }

  const onCheck = async (
    id: number,
    shoppingListIndex: number,
    itemIndex: number,
    itemCheck: boolean,
    itemID: number,
    itemName: string,
  ) => {
    const res = await axios.patch(`api/shoppingLists/items/check/${id}`, {
      check: itemCheck,
      itemIndex: itemIndex,
      itemID: itemID,
      itemName: itemName,
    })

    const shoppingListCopy = { ...shoppingLists }
    shoppingListCopy[shoppingListIndex].item[itemIndex].checked = !itemCheck
    setShoppingLists(shoppingListCopy)
  }

  return (
    <ListBlock
      shoppingLists={shoppingLists}
      edit={edit}
      deleteItem={deleteItem}
      addItem={addItem}
      onCheck={onCheck}
    />
  )
}
