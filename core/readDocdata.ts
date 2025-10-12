import docdata from "@/docData/output.json"
import { Children } from "@/types/base"

type ArgChildren = {
    dir: string
    subDir: string
    searchName?: string
}

type DocDataItem = typeof docdata[0]

export async function readDocData() {
    return docdata as DocDataItem[]
}

export async function searchDocData(children: ArgChildren) {
    const found = docdata.find((item) => {
        return item.directory === children.dir && item.subDirectory === children.subDir
    })

    if( !children.searchName ) return found?.result.flat() || null

    if (!found) return null
    if (found.result) {
        return found.result.find((item) => item.find((child) => child.name === children.searchName))?.flat()
    }

    return null
}

export async function searchClassData(children: ArgChildren) {
    const found = docdata.find((item) => {
        return item.directory === children.dir && item.subDirectory === children.subDir
    })

    if (!found) return null
    if (found.result) {
        const result = found.result.map((item) => 
            item.find((child) => child.name === children.searchName)
        ).filter((item) => item !== undefined) as Children[]

        console.log( result );
        return result.flat()
    }
    return null
}