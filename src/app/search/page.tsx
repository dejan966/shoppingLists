'use client'
import { ShoppingListType } from '@/models/shoppingList'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ListBlock from '@/components/shoppingLists/ListBlock'

export default function Search() {
  const searchParams = useSearchParams()
  const [shoppingLists, setShoppingLists] = useState<ShoppingListType[]>([])

  const search = searchParams.get('q')

  const searchItems = async () => {
    const res = await axios.get(`api/shoppingLists/search?q=${search}`)
    if (res.data.length == 0) {
      setShoppingLists([])
      return
    }
    setShoppingLists(res.data)
  }

  useEffect(() => {
    searchItems()
  }, [search])

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
    searchItems()
  }

  const editItem = async (item: string, id: number, index: number) => {
    const res = await axios.patch(`api/items/${id}`, {
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
  }

  const onCheck = async (
    id: number,
    shoppingListIndex: number,
    itemIndex: number,
    itemCheck: boolean,
    itemID: number,
    itemName: string,
  ) => {
    const res = await axios.patch(`api/items/check/${id}`, {
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
