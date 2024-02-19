'use client'
import ListBlock from '@/components/shoppingLists/ListBlock'
import { IChecked } from '@/models/itemsChecked'
import { ShoppingListType } from '@/models/shoppingList'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
  const [shoppingLists, setShoppingLists] = useState<ShoppingListType[]>([])
  let [itemsChecked, setItemsChecked] = useState<IChecked[]>([])

  const getShoppingLists = async () => {
    const response = await axios.get('api/shoppingLists')
    setShoppingLists(response.data)
    for (let i = 0; i < response.data.length; i++) {
      for (let j = 0; j < response.data[i].item.length; j++) {
        itemsChecked.push({
          id: response.data[i].id,
          checked: response.data[i].item[j].checked,
        })
      }
    }
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

  const addItem = async (item: string) => {
    const res = await axios.post('api/shoppingLists', {
      newItem: item,
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
    setItemsChecked([])
    getShoppingLists()
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
