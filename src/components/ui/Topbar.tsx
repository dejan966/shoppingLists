'use client'
import { TiTickOutline } from 'react-icons/ti'
import { CiSearch } from 'react-icons/ci'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function Topbar() {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')

  const searching = () => {
    if (searchValue !== '') {
      router.push(`/search?q=${searchValue}`)
      setSearchValue('')
    }
  }
  const handleFileChange = async ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const myFile = target.files[0]
      const formData = new FormData()
      formData.append('list', myFile)
      const res = await axios.post('api/upload', formData)
      const listRes = await axios.patch('api/shoppingLists', {
        sL: res.data.data,
      })
    }
  }

  const uploadFile = () => {
    document.getElementById('listUpload')?.click()
  }

  return (
    <header className="px-4 pt-8 pb-4 flex border items-center justify-between border-solid">
      <div className="flex space-x-6">
        <button
          className="bg-blue-800 text-white rounded-lg text-xl w-20 h-8"
          type="button"
        >
          <TiTickOutline />
        </button>
        <div>
          <button
            className="bg-blue-800 hover:bg-blue-500 text-white rounded-lg text-xl w-20 h-8"
            type="button"
            onClick={uploadFile}
          >
            Import
          </button>
          <input
            type="file"
            id="listUpload"
            name="list"
            onChange={handleFileChange}
            accept="application/JSON"
            className="hidden"
          />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <input
          type="text"
          name="searchValue"
          id="searchValue"
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value)
          }}
          placeholder="Search"
          className="rounded-xl bg-[#D6DBDC] border-[#D6DBDC] hover:bg-white focus:bg-white"
        />
        <button className="text-4xl" onClick={searching}>
          <CiSearch />
        </button>
      </div>
    </header>
  )
}
