import { getProjectName, searchDocData } from "@/core/newReadDocData"
import { Children, Class, Interface, Method, TypeT } from "@/types/base"
import Link from "next/link"
import { ClassDefinition } from "./(components)/classDefinition"
import { InterfaceDefinition } from "./(components)/interfaceDefinition"
import { TypeDefinition } from "./(components)/typeDefininition"
import { Metadata } from "next"


export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
    const [ propertyName ] = (await params).slug
    const projectName = await getProjectName()

    const [ className, type] = decodeURIComponent(propertyName).split(":")
    const getDefinition = await searchDocData({ name: className, type }) || null
    if( !getDefinition ) {
        return {
            title: `Definition Not Found - ${projectName}`,
            description: `No documentation found for ${className} in ${projectName}.`,
        }
    }

    const definition = getDefinition

    const convertType = ( def : string ) => {
        switch( def ) {
            case "class":
                return "Class"
            case "interface":
                return "Interface"
            case "method":
                return "Method"
            case "typeAliasLike":
                return "Type Alias"
            default:
                return ""
        }
    }

    return {
        title: `${convertType(definition?.type)} | ${definition?.name || "Definition"} - ${projectName}`,
        description: `Documentation for ${definition?.name || "definition"} in ${projectName} module.`,
    }
}

export default async function DocPage({ params }: { params: { slug: string[] } }) {
    const [ propertyName ] = (await params).slug

    const [ className, type] = decodeURIComponent(propertyName).split(":")
    const getDefinition = await searchDocData({ name: className, type }) || null

    const helper = (getDefinition: Children) => {
        if (getDefinition.type === "class") {
            return <ClassDefinition
                className={className}
                getDefinition={getDefinition}
            />
        }

        if (getDefinition.type === "interface") {
            return <InterfaceDefinition
                className={className}
                getDefinition={getDefinition}
            />
        }

        if (getDefinition.type === "typeAliasLike") {
            return <TypeDefinition
                className={className}
                getDefinition={getDefinition}
            />
        }
    }

    if (getDefinition) {
        return helper(getDefinition)
    }

    return (
        <div className="flex flex-col w-full p-12">
            <h1 className="text-3xl font-bold mb-8"> No definition found for <span className="font-mono">{className}</span> in this doc.</h1>
            <p> Please check the URL or go back to the <Link className="text-blue-500 hover:underline" href="/docs">documentation home page</Link>. </p>
        </div>
    )

}