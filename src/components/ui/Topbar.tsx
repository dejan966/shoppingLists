'use client'
import { TiTickOutline } from 'react-icons/ti'
import { CiSearch } from 'react-icons/ci'
import { ChangeEvent, useRef } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function Topbar() {
  const router = useRouter()
  const searchRef = useRef<HTMLInputElement>(null)
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
      console.log(listRes)
    }
  }

  const uploadFile = () => {
    document.getElementById('listUpload')?.click()
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
          ref={searchRef}
          className="rounded-xl bg-[#D6DBDC] border-[#D6DBDC] hover:bg-white focus:bg-white"
        />
        <button
          className="text-4xl"
          onClick={() => router.push(`/search?q=${searchRef.current?.value}`)}
        >
          <CiSearch />
        </button>
      </div>
    </header>
  )
}
