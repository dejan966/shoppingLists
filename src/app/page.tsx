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

  const edit = async (event: any, id: number, i: number) => {
    const timer = setTimeout(async () => {
      editItem(event.target.value, id, i)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }

  const addItem = async (item: string, index: number) => {
    const res = await axios.post('api/items', {
      newItem: item,
      shoppingListIndex: index,
    })
    getShoppingLists()
  }

  const editItem = async (item: string, id: number, index: number) => {
    const res = await axios.patch(`api/shoppingLists/${id}`, {
      newItem: item,
      itemIndex: index,
    })
  }

  const deleteItem = async (id: number, index: number) => {
    const res = await axios.delete(`api/shoppingLists/${id}`, {
      data: {
        itemIndex: index,
      },
    })
    getShoppingLists()
  }

  const onCheck = async (
    id: number,
    shoppingListIndex: number,
    itemIndex: number,
    itemCheck: boolean,
  ) => {
    const res = await axios.post(`api/shoppingLists/check/${id}`, {
      check: itemCheck,
      itemIndex: itemIndex,
    })

    const shoppingListCopy = { ...shoppingLists }
    shoppingListCopy[shoppingListIndex].item[itemIndex].checked = !itemCheck
    console.log(shoppingListCopy)
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
