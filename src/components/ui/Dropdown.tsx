import { Menu } from '@headlessui/react'
import { HiOutlineDotsVertical } from 'react-icons/hi'

export default function Dropdown() {
  const exportJSON = () => {}
  return (
    <Menu>
      <Menu.Button className="text-3xl">
        <HiOutlineDotsVertical />
      </Menu.Button>
      <Menu.Items>
        <Menu.Item>
          {({ active }) => (
            <p
              className={`${active && 'text-white bg-blue-500'}`}
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
