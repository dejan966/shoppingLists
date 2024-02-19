import { ShoppingListType } from '@/models/shoppingList'
import { Menu } from '@headlessui/react'
import axios from 'axios'
import { HiOutlineDotsVertical } from 'react-icons/hi'

interface Props {
  shoppingList: ShoppingListType
}

export default function Dropdown({ shoppingList }: Props) {
  const exportJSON = async () => {
    const res = await axios.post('api/export', { shoppingList: shoppingList })
    console.log(res.data)
  }
  return (
    <Menu>
      <Menu.Button className="text-3xl">
        <HiOutlineDotsVertical />
      </Menu.Button>
      <Menu.Items>
        <Menu.Item>
          {({ active }) => (
            <p
              className={`${active && 'text-white bg-blue-500 rounded-lg'}`}
              onClick={exportJSON}
            >
              Export
            </p>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}
