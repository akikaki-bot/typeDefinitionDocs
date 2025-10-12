import { Interface, TypeT } from "@/types/base";
import Link from "next/link";



export function TypeDefinition({ dir, subDir, className,  getDefinition } : { dir: string, subDir: string, className: string, getDefinition : TypeT }) {
    return (
                <div className="flex flex-col w-full p-12">
                    <h1 className="text-5xl font-bold"> <span className="text-yellow-600">type</span> {className} </h1>
                    <div className="flex flex-col mt-4 gap-2">
                        <h2 className="text-2xl"> Type Definition </h2>
                        {
                            getDefinition?.declaredType && (
                                <div className="font-mono text-base bg-gray-200 px-2 py-[0.5px] rounded-xl">
                                    {getDefinition.declaredType}
                                </div>
                            )
                        }
                    </div>
                </div>
            )
}

