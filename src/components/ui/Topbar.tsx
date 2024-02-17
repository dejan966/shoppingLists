'use client'
import { TiTickOutline } from 'react-icons/ti'
import { CiSearch } from 'react-icons/ci'
import axios from 'axios'

export default function Topbar() {
  const search = async (event: any) => {
    const timer = setTimeout(async () => {
      searchItems(event.target.value)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }

  const searchItems = async (searchString: string) => {
    const res = await axios.post('api/shoppingLists/search', {
      search: searchString,
    })
    console.log(res.data)
  }

  return (
    <header className="px-4 pt-8 pb-4 flex flex-row border items-center justify-between border-solid">
      <div className="flex space-x-6">
        <button
          className="bg-blue-800 text-white rounded-lg text-xl w-20 h-8"
          type="button"
        >
          <TiTickOutline />
        </button>
        <button
          className="bg-blue-800 hover:bg-blue-500 text-white rounded-lg text-xl w-20 h-8"
          type="button"
        >
          + New
        </button>
      </div>
      <div className="flex justify-center items-center">
        <input
          type="text"
          name="searchValue"
          onChange={(event) => {
            search(event)
          }}
          className="rounded-xl bg-[#D6DBDC] border-[#D6DBDC] hover:bg-white focus:bg-white"
        />
        <button className="text-4xl">
          <CiSearch />
        </button>
      </div>
    </header>
  )
}
