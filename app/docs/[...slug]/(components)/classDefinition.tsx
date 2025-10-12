import { Class } from "@/types/base";
import Link from "next/link";



export function ClassDefinition({ dir, subDir, className,  getDefinition } : { dir: string, subDir: string, className: string, getDefinition : Class }) {
    return (
                <div className="flex flex-col w-full p-12">
                    <h1 className="text-5xl font-bold"> <span className="text-green-600">class</span> {className} </h1>
                    <div className="flex flex-row">
                        { getDefinition?.extends && (
                            <div className="font-mono text-lg bg-gray-200 px-2 py-[0.5px] rounded-xl mr-2">
                                <span className="italic">extends</span> <Link href={`/docs/${dir}/${subDir}/${getDefinition.extends}`}>{getDefinition.extends}</Link>
                            </div>
                        )}
                        { getDefinition?.implements && getDefinition.implements.length > 0 && (
                            <div className="font-mono text-lg bg-gray-200 px-2 py-[0.5px] rounded-xl">
                                <span className="italic">implements</span> {getDefinition.implements.join(", ")}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col mt-4">
                        <h2 className="text-2xl"> Constructor </h2>
                        { getDefinition?.constructor ? (
                            <div className="flex flex-row w-full">
                                <div className="flex flex-col gap-2 justify-center pl-4">
                                    {
                                        getDefinition.constructor.args?.map((arg, index) => (
                                            <div className="flex flex-row gap-2 items-center" key={`${arg.name}-${index}`}>
                                                <div className="font-mono text-base">{arg.name}</div>
                                                <div className="font-mono text-sm bg-gray-200 px-2 py-[0.5px] rounded-xl">{arg.type}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ) : <p> No constructor defined </p> }
                    </div>
                    <div className="flex flex-col mt-4 gap-2">
                        <h2 className="text-2xl"> Properties & Methods </h2>
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
                                        <div className="font-mono text-sm bg-gray-200 px-2 py-[0.5px] rounded-xl">{item.isFunction ? item.returnType : item.Ttype}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )
}

