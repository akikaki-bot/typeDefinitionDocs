import { getAllDefinitions, getProjectName } from "@/core/readDocdata"
import Link from "next/link"
import { GroupComponent } from "./groupComponent"
import { SidebarMovementBehavior } from "./sidebarMovementBehavior"


export async function Sidebar() {
    const projectName = await getProjectName()
    const allDefinitions = await getAllDefinitions()

    const classDef = allDefinitions.filter( item => item.definitions.some( def => def.type === "class" ))
    const interfaceDef = allDefinitions.filter( item => item.definitions.some( def => def.type === "interface" ))
    const typeDef = allDefinitions.filter( item => item.definitions.some( def => def.type === "typeAliasLike" ))

    return (
        <SidebarMovementBehavior>
                <div className="flex flex-col items-center justify-center w-full h-20 p-6 border-b-[1px]">
                    <h1 className="text-2xl font-mono">{projectName}</h1>
                </div>
                <div className="flex flex-col items-center p-4 gap-4 overflow-y-auto h-full">
                    <GroupComponent CategoryName="Classes">
                        {
                            classDef.map( ( item, index, arr ) => (
                                item.definitions.map( ( def, _index, dArr ) => (
                                    <Link 
                                        key={def.name} 
                                        href={`/docs/${item.dir}/${item.subDir}/${def.name}`} 
                                        className="w-full hover:bg-white px-4 py-2 rounded-lg transition-all items-center gap-2 flex"
                                        style={{
                                            borderBottom: index + _index + 1 < ( arr.length + dArr.length ) - 1 ? "1px solid #eee" : "none",
                                            fontFamily: "var(--font-geist-sans)",
                                        }}
                                    >
                                        <div className="w-4 h-4 bg-green-500 rounded-full inline-block" />
                                        <div className="overflow-ellipsis whitespace-nowrap overflow-hidden max-w-[150px]">{def.name}</div>
                                    </Link>
                                ))
                            ))
                        }
                    </GroupComponent>
                    <GroupComponent CategoryName="Interfaces">
                        {
                            interfaceDef.map( ( item, index, arr ) => (
                                item.definitions.filter( def => def.type === "interface" ).map( ( def, _index, dArr ) => (
                                    <Link 
                                        key={def.name} 
                                        href={`/docs/${item.dir}/${item.subDir}/${def.name}`} 
                                        className="w-full hover:bg-white px-4 py-2 rounded-lg transition-all items-center gap-2 flex"
                                        style={{
                                            borderBottom: index + _index + 1 < ( arr.length + dArr.length ) - 1 ? "1px solid #eee" : "none",
                                            fontFamily: "var(--font-geist-sans)",
                                        }}
                                    >
                                        <div className="w-4 h-4 bg-blue-500 rounded-full inline-block" />
                                        <div className="overflow-ellipsis whitespace-nowrap overflow-hidden max-w-[150px]">{def.name}</div>
                                    </Link>
                                ))
                            ))
                        }
                    </GroupComponent>
                    <GroupComponent CategoryName="Type Aliases">
                        {
                            typeDef.map( ( item, index, arr ) => (
                                item.definitions.filter( def => def.type === "typeAliasLike" ).map( ( def, _index, dArr ) => (
                                    <Link 
                                        key={def.name} 
                                        href={`/docs/${item.dir}/${item.subDir}/${def.name}`} 
                                        className="w-full hover:bg-white px-4 py-2 rounded-lg transition-all items-center gap-2 flex"
                                        style={{
                                            borderBottom: index + _index + 1 < ( arr.length + dArr.length ) - 1 ? "1px solid #eee" : "none",
                                            fontFamily: "var(--font-geist-sans)",
                                        }}
                                    >
                                        <div className="w-4 h-4 bg-yellow-500 rounded-full inline-block" />
                                        <div className="overflow-ellipsis whitespace-nowrap overflow-hidden max-w-[150px]">{def.name}</div>
                                    </Link>
                                ))
                            ))
                        }
                    </GroupComponent>
                </div>
        </SidebarMovementBehavior>
    )
}