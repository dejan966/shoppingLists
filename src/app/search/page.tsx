'use client'
import { ShoppingListType } from '@/models/shoppingList'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ListBlock from '@/components/shoppingLists/ListBlock'
import { IChecked } from '@/models/itemsChecked'

export default function Search() {
  const searchParams = useSearchParams()
  const [shoppingLists, setShoppingLists] = useState<ShoppingListType[]>([])
  const [itemsChecked, setItemsChecked] = useState<IChecked[]>([])

  const search = searchParams.get('q')

  const searchItems = async () => {
    const res = await axios.get(`api/shoppingLists/search?q=${search}`)
    setShoppingLists(res.data)
    for (let i = 0; i < res.data.length; i++) {
      for (let j = 0; j < res.data[i].item.length; j++) {
        itemsChecked.push({
          id: res.data[i].id,
          checked: res.data[i].item[j].checked,
        })
      }
    }
  }

  useEffect(() => {
    searchItems()
  }, [])

  const addItemRef = useRef<HTMLInputElement>(null)

  const edit = async (event: any, id: number, i: number) => {
    const timer = setTimeout(async () => {
      editItem(event.target.value, id, i)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }

  const addItem = async () => {
    const res = await axios.post('api/items', {
      newItem: addItemRef.current!.value,
    })
    setShoppingLists(res.data)
    const i = Object.values(itemsChecked) as IChecked[]
    i.push({ id: res.data[0].id, checked: false })
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

  const onCheck = async (id: number, itemIndex: number, itemCheck: boolean) => {
    const res = await axios.post(`api/shoppingLists/check/${id}`, {
      check: itemCheck,
      itemIndex: itemIndex,
    })
    const itemsCheckedCopy = { ...itemsChecked }
    itemsCheckedCopy[itemIndex].checked = !itemCheck
    setItemsChecked(itemsCheckedCopy)
  }

  return (
    <ListBlock
      shoppingLists={shoppingLists}
      edit={edit}
      deleteItem={deleteItem}
      addItem={addItem}
      onCheck={onCheck}
      itemsChecked={itemsChecked}
    />
  )
}
