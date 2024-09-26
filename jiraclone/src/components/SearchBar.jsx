'use client'

import { useProjectData } from '@/context/Context'
import { useState } from 'react'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const {tasks,displayTasks ,setdisplayTasks} = useProjectData()

  const handleSubmit = (e) => {
    e.preventDefault()
    query && 
    setdisplayTasks([...displayTasks].filter((task)=>{
      return task.title.toLowerCase().includes(query.toLowerCase())  || 
      task.description.toLowerCase().includes(query.toLowerCase())
    }))
  }

  if (query === ''){
    setdisplayTasks(tasks)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex justify-between w-full ">
        <div className='flex justify-center w-full'>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full  px-4 py-2 ml-4 text-gray-700  bg-white border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />

        <button
          type="submit"
          className="relative right-10"
        >
          <svg
            className="w-6 h-6 text-blue-500 hover:text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        </div>
        </div>
    </form>
  )
}