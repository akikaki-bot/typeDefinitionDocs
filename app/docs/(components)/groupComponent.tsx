"use client"

import { useState } from "react"


export function GroupComponent({
    CategoryName,
    children 
}: {
    CategoryName : string
    children : React.ReactNode 
}) {
    const [ isOpen, setIsOpen ] = useState(true)
    return (
        <div className="flex flex-col w-full">
            <button 
                onClick={ () => setIsOpen( prev => !prev ) }
                className="hover:bg-white hover:dark:bg-zinc-800 transition-all w-full flex flex-row justify-between px-6 py-1"
            >
                <h1 className="text-xl font-bold">{CategoryName}</h1>
                <h1 className="text-xl font-bold">{isOpen ? "▼" : "▲"}</h1>
            </button>
            <div 
                className="flex-col px-3"
                style={{ display: isOpen ? "flex" : "none" }}
            >
                {children}
            </div>
        </div>
    )
}