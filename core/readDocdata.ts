import docdata from "@/docData/output.json"
import { Children } from "@/types/base"

type ArgChildren = {
    dir: string
    subDir: string
    searchName?: string
}

type DocDataItem = typeof docdata.typeDocs[0]

export async function getProjectName() {
    return docdata.readFile as string
}

export async function readDocData() {
    return docdata.typeDocs as DocDataItem[]
}

export async function searchDocData(children: ArgChildren) {
    const found = docdata.typeDocs.find((item) => {
        return item.directory === children.dir && item.subDirectory === children.subDir
    })

    if( !children.searchName ) return found?.result.flat() || null

    if (!found) return null
    if (found.result) {
        return found.result.find((item) => item.find((child) => child.name === children.searchName))?.flat()
    }

    return null
}

export async function searchInAllDocData( className: string ) {
    const searchInAll = ( className : string ) => {
        for( const item of docdata.typeDocs ) {
            for( const res of item.result ) {
                for( const child of res ) {
                    if( child.name === className ) {
                        return {
                            dir: item.directory,
                            subDir: item.subDirectory,
                            result: child
                        }
                    }
                }
            }
        }
        return null
    }

    return searchInAll( className )
}

export async function getAllDefinitions() {
    const allDefinitions: { dir: string, subDir: string, definitions: Children[] }[] = []

    for( const item of docdata.typeDocs ) {
        const definitions = item.result.flat()
        allDefinitions.push({
            dir: item.directory,
            subDir: item.subDirectory,
            definitions: definitions.filter((item) => item !== undefined) as Children[]
        })
    }
    return allDefinitions
}

export async function searchClassData(children: ArgChildren) {

    const found = docdata.typeDocs.find((item) => {
        return item.directory === children.dir && item.subDirectory === children.subDir
    })

    if (!found) return null
    if (found.result) {
        const result = found.result.map((item) => 
            item.find((child) => child.name === children.searchName)
        ).filter((item) => item !== undefined) as Children[]

        return result.flat()
    }

    return null
}