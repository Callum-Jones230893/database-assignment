"use client"

import { useState } from "react"

const SideBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  return (
    <div 
      onClick={() => setIsOpen(!isOpen)} 
      className="cursor-pointer select-none bg-background invisible sm:visible"
    >
      <div className={`flex flex-col h-screen overflow-hidden border-accent-two transition-all duration-600 ease-in-out ${isOpen ? "sm:w-50 md:w-100 border-l mr-0 h-screen" : "w-4 border-l h-screen"}`}
      >
        <div className="min-w-max pb-4 px-4">
          <h2 className="subtitle">Tournaments</h2>
        </div>
      </div>
    </div>
  )
}

export default SideBar