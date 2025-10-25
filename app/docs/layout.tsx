import { Sidebar } from "./(components)/sidebar";



export default async function Layout({ children } : { children : React.ReactNode }) {
    return (
        <div className="flex flex-row w-full min-h-screen h-full">
            <Sidebar />
            <div className="overflow-auto flex flex-col w-full lg:w-[80%] lg:max-w-[80%] lg:overflow-">
                {children}
            </div>
        </div>
    )
}