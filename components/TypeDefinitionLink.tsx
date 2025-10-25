import { searchInAllDocData } from "@/core/newReadDocData";
import Link from "next/link";


export async function TypeDefinitionLink({
    children,
    typeName
} : {
    children: React.ReactNode,
    typeName: string
}) {
    const searchInAll = await searchInAllDocData(typeName)
    if (!searchInAll) return <span className="text-red-500">{children}</span>
    return <Link
        className="text-blue-500"
        href={`/docs/${typeName}:${searchInAll.type}`}
    >{children}</Link>
}