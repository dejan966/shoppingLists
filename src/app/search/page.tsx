'use client'
import { ShoppingListType } from '@/models/shoppingList'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ListBlock from '@/components/shoppingLists/ListBlock'

export default function Search() {
  const searchParams = useSearchParams()
  const [shoppingLists, setShoppingLists] = useState<ShoppingListType[]>([])

  const search = searchParams.get('q')

  const searchItems = async () => {
    const res = await axios.get(`api/shoppingLists/search?q=${search}`)
    setShoppingLists(res.data)
  }

  useEffect(() => {
    searchItems()
  }, [])

  const addItemRef = useRef<HTMLInputElement>(null)
  const [checked, setChecked] = useState(true)

  const edit = async (event: any, id: number, i: number) => {
    const timer = setTimeout(async () => {
      editItem(event.target.value, id, i)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }

  const addItem = async () => {
    const res = await axios.post('api/shoppingLists', {
      newItem: addItemRef.current!.value,
    })
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
  }

  return (
    <ListBlock
      shoppingLists={shoppingLists}
      edit={edit}
      deleteItem={deleteItem}
      addItem={addItem}
      checked={checked}
      setChecked={setChecked}
    />
  )
}
