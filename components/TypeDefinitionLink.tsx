import { searchInAllDocData } from "@/core/readDocdata";
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
    if (!searchInAll.dir || !searchInAll.subDir) return <span className="text-red-500">{children}</span>
    return <Link
        className="text-blue-500"
        href={`/docs/${searchInAll?.dir}/${searchInAll?.subDir}/${typeName}`}
    >{children}</Link>
}