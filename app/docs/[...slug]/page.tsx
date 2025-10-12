import { searchClassData, searchDocData, searchInAllDocData } from "@/core/readDocdata"
import { Class, Interface, Method, TypeT } from "@/types/base"
import Link from "next/link"
import { ClassDefinition } from "./(components)/classDefinition"
import { InterfaceDefinition } from "./(components)/interfaceDefinition"
import { TypeDefinition } from "./(components)/typeDefininition"



export default async function DocPage({ params }: { params: { slug: string[] } }) {
    const [dir, subDir, ...classNames] = (await params).slug

    if (classNames.length === 0) {
        const getDefinition = (await searchDocData({ dir, subDir }))?.sort((a, b) => {
            if (a.type === b.type) {
                return a.name.localeCompare(b.name)
            }
            return a.type.localeCompare(b.type)
        }) as (Class | Interface | TypeT)[] | null
        return (
            <div className="flex flex-col w-full p-12">
                <h1 className="text-3xl font-bold mb-8"> Directory <span className="font-mono">{dir}/{subDir}</span> </h1>
                <div className="text-xl font-semibold mb-4"> Classes & Interfaces </div>
                {
                    !getDefinition?.length && <p> No classes or interfaces found in this directory. </p>
                }
                <div className="flex flex-col gap-2">
                    {
                        getDefinition?.map(
                            (item, index) => (
                                <div className="flex flex-row w-full items-center" key={`${item.name}-${index}`}>
                                    <p 
                                        className="font-mono px-2 py-[0.5px] rounded-xl"
                                        style={{
                                            backgroundColor: item.type === "class" ? "#10b981" : item.type === "interface" ? "#3b82f6" : "#eab308",
                                        }}
                                    > {item.type} </p>
                                    <Link className="text-xl px-2 py-1 " href={`/docs/${dir}/${subDir}/${item.name}`}>{item.name}</Link>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        )
    }

    const className = classNames.join("/")
    const getDefinition = await searchClassData({ dir, subDir, searchName: className }) as (Class | Method | Interface | TypeT)[]

    const helper = (getDefinition: Class | Method | Interface | TypeT) => {
        if (getDefinition.type === "class") {
            return <ClassDefinition
                dir={dir}
                subDir={subDir}
                className={className}
                getDefinition={getDefinition}
            />
        }

        if (getDefinition.type === "interface") {
            return <InterfaceDefinition
                dir={dir}
                subDir={subDir}
                className={className}
                getDefinition={getDefinition}
            />
        }

        if (getDefinition.type === "typeAliasLike") {
            return <TypeDefinition
                dir={dir}
                subDir={subDir}
                className={className}
                getDefinition={getDefinition}
            />
        }
    }

    if (getDefinition && getDefinition.length > 0) {
        return getDefinition.map((item, index) => (
            <div key={`${item.name}-${index}`}>
                {helper(item)}
            </div>
        ))
    }

    return (
        <div className="flex flex-col w-full p-12">
            <h1 className="text-3xl font-bold mb-8"> No definition found for <span className="font-mono">{className}</span> in this doc.</h1>
            <p> Please check the URL or go back to the <Link className="text-blue-500 hover:underline" href="/docs">documentation home page</Link>. </p>
        </div>
    )

}