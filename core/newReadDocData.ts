
import json from "@/docData/output.json"
import { Children } from "@/types/base"

export async function newReadDocData() {
    return json.typeDocs as Children[]
}

export async function getProjectName() {
    return json.readFile as string
}

export async function searchDocData({
    name,
    type
}: {
    name: string,
    type?: string
}) {
    const data = await newReadDocData()
    return data.filter(item => item.name === name && (!type || item.type === type))[0] || null
}

export async function searchInAllDocData( className: string ) {
    const data = await newReadDocData()
    return data.filter(item => item.name === className)[0] || null
}

export async function getAllDefinitions() {
    return await newReadDocData()
}