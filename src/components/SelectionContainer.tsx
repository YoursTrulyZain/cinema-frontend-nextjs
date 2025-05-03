import React from 'react'
import { RiMovie2Line } from "react-icons/ri";

function SelectionContainer({title, icon}: {title: string, icon: React.ReactNode}) {
  return (
    <div className='flex items-center justify-between bg-gray-500/50 flex-1 min-w-[200px] rounded-md px-5 py-2 mx-15 border-2 border-transparent hover:border-amber-500 cursor-pointer'>
        <div className=' flex flex-col gap-1'>
          <div className=''>{title}</div>
          <div className='text-2xl'>Sinners</div>
        </div>
        <div className='text-3xl'>
          {icon}
        </div>
    </div>
  )
}

export default SelectionContainer