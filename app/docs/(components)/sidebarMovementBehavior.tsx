"use client"

import { useEffect, useState } from "react"

export function SidebarMovementBehavior({
    children
}: {
    children : React.ReactNode
}) {
    const [ isOpen, setIsOpen ] = useState( false )
    const [ windowWidth, setWindowWidth ] = useState(0)

    useEffect( () => {
        const handleResize = () => {
            setWindowWidth( window.innerWidth )
            if( window.innerWidth >= 1024 ) {
                setIsOpen( true )
            } else {
                setIsOpen( false )
            }
        }
        window.addEventListener( "resize", handleResize )
        handleResize()
        return () => window.removeEventListener( "resize", handleResize )
    }, [] )

    return (
        <>
            <div className="fixed top-0 right-0 w-full z-999">
                <button 
                    onClick={ () => setIsOpen( prev => !prev ) }
                    className="m-4 p-4 w-12 h-12 flex items-center justify-center rounded-full border bg-gray-200 lg:hidden font-bold text-xl"
                >
                    { isOpen ? "＞" : "＜" }
                </button>
            </div>
            <div className="hidden lg:flex flex-col lg:w-[20%] w-0 max-w-[300px]" />
            <div 
                className="fixed lg:translate-x-0 top-0 left-0 lg:flex flex-col bg-gray-50 border-r-[1px] max-w-[300px] z-20 h-full transition-all"
                style={{ 
                    transform: isOpen ? "translateX(0%)" : "translateX(-100%)", 
                    transition: "transform 0.3s ease-in-out",
                    display: windowWidth >= 1024 ? "flex" : isOpen ? "flex" : "none",
                    width: windowWidth >= 1024 ? "20%" : isOpen ? "100%" : "0",
                }}
            >
                {children}
            </div>
        </>
    )
}