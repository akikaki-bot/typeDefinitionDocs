import { Interface } from "@/types/base";
import Link from "next/link";



export function InterfaceDefinition({ dir, subDir, className,  getDefinition } : { dir: string, subDir: string, className: string, getDefinition : Interface }) {
    return (
                <div className="flex flex-col w-full p-12">
                    <h1 className="text-5xl font-bold"> <span className="text-blue-600">interface</span> {className} </h1>
                    <div className="flex flex-row">
                        { getDefinition?.extends && (
                            <div className="font-mono text-lg bg-gray-200 px-2 py-[0.5px] rounded-xl mr-2">
                                <span className="italic">extends</span> <Link href={`/docs/${dir}/${subDir}/${getDefinition.extends}`}>{getDefinition.extends}</Link>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col mt-4 gap-2">
                        <h2 className="text-2xl"> Properties </h2>
                        {
                            getDefinition?.properties && getDefinition?.properties.map((item, index) => item.name && (
                                <div className="flex flex-row w-full" key={`${item.name}-${index}`}>
                                    <div className="flex flex-row gap-4 items-center justify-center">
                                        <div 
                                            className="font-mono text-lg px-2 py-[0.5px] rounded-xl"
                                            style={{
                                                backgroundColor: item.isFunction ? "#34d399" : "#60a5fa",
                                            }}
                                        >{item.isFunction ? "Method" : "Property"}</div>
                                        { item.isPrivate && <div className="font-mono text-lg bg-fuchsia-500 rounded-xl px-2 py-[0.5px]">Private</div> }
                                        <div className="font-mono text-base">{item.name}</div>
                                        <div className="font-mono text-sm bg-gray-200 px-2 py-[0.5px] rounded-xl">{item.Ttype}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )
}

