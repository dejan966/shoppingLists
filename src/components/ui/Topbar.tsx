import { TiTickOutline } from 'react-icons/ti'
import { CiSearch } from 'react-icons/ci'

export default function Topbar() {
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
          className="rounded-xl bg-[#D6DBDC] border-[#D6DBDC] hover:bg-white focus:bg-white"
        />
        <button className="text-4xl">
          <CiSearch />
        </button>
      </div>
    </header>
  )
}
