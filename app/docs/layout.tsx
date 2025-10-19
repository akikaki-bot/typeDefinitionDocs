import { Sidebar } from "./(components)/sidebar";



export default async function Layout({ children } : { children : React.ReactNode }) {
    return (
        <div className="flex flex-row w-full min-h-screen h-full">
            <Sidebar />
            <div className="overflow-hidden flex flex-col w-full lg:w-[80%]">
                {children}
            </div>
        </div>
    )
}