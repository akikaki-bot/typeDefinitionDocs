import { getAllDefinitions, getProjectName } from "@/core/newReadDocData"
import Link from "next/link"
import { GroupComponent } from "./groupComponent"
import { SidebarMovementBehavior } from "./sidebarMovementBehavior"


export async function Sidebar() {
    const projectName = await getProjectName()
    const allDefinitions = await getAllDefinitions()

    const classDef = allDefinitions.filter( item => item.type === "class" )
    const interfaceDef = allDefinitions.filter( item => item.type === "interface" )
    const typeDef = allDefinitions.filter( item => item.type === "typeAliasLike" )

    return (
        <SidebarMovementBehavior>
                <div className="flex flex-col items-center justify-center w-full h-20 p-6 border-b-[1px] dark:border-zinc-700">
                    <h1 className="text-2xl font-mono">{projectName}</h1>
                </div>
                <div className="flex flex-col items-center p-4 gap-4 overflow-y-auto h-full">
                    <GroupComponent CategoryName="Classes">
                        {
                            classDef.map( ( item, i ) => (
                                <Link
                                    key={`${item.name}-class${i}`}
                                    href={`/docs/${item.name}:class`}
                                    className="w-full hover:bg-white hover:dark:bg-zinc-800 px-4 py-2 rounded-lg transition-all items-center gap-2 flex"
                                    style={{
                                        fontFamily: "var(--font-geist-sans)",
                                    }}
                                >
                                    <div className="w-4 h-4 bg-green-500 rounded-full inline-block" />
                                    <div className="overflow-ellipsis whitespace-nowrap overflow-hidden max-w-[150px]">{item.name}</div>
                                </Link>
                            ))
                        }
                    </GroupComponent>
                    <GroupComponent CategoryName="Interfaces">
                        {
                            interfaceDef.map( ( item , i) => (
                                <Link
                                    key={`${item.name}-interface${i}`}
                                    href={`/docs/${item.name}:interface`}
                                    className="w-full hover:bg-white hover:dark:bg-zinc-800 px-4 py-2 rounded-lg transition-all items-center gap-2 flex"
                                    style={{
                                        fontFamily: "var(--font-geist-sans)",
                                    }}
                                >
                                    <div className="w-4 h-4 bg-blue-500 rounded-full inline-block" />
                                    <div className="overflow-ellipsis whitespace-nowrap overflow-hidden max-w-[150px]">{item.name}</div>
                                </Link>
                            ))
                        }
                    </GroupComponent>
                    <GroupComponent CategoryName="Type Aliases">
                        {
                            typeDef.map( ( def , i ) => (
                                    <Link
                                        key={`${def.name}-typeAliasLike${i}`}
                                        href={`/docs/${def.name}:typeAliasLike`}
                                        className="w-full hover:bg-white hover:dark:bg-zinc-800 px-4 py-2 rounded-lg transition-all items-center gap-2 flex"
                                        style={{
                                            fontFamily: "var(--font-geist-sans)",
                                        }}
                                    >
                                        <div className="w-4 h-4 bg-yellow-500 rounded-full inline-block" />
                                        <div className="overflow-ellipsis whitespace-nowrap overflow-hidden max-w-[150px]">{def.name}</div>
                                    </Link>
                            ))
                        }
                    </GroupComponent>
                </div>
        </SidebarMovementBehavior>
    )
}