import { TypeParam } from "@/components/typeParam";
import { Interface, Property } from "@/types/base";
import Link from "next/link";



export function InterfaceDefinition({ className, getDefinition }: { className: string, getDefinition: Interface }) {

    const sortFunc = (a: (Property), b: (Property)): 0 | 1 | -1 => {
        if (a.isFunction !== b.isFunction) {
            return a.isFunction ? -1 : 1;
        }
        if (!!a.isPrivate !== !!b.isPrivate) {
            return a.isPrivate ? 1 : -1;
        }
        return 0
    }

    return (
        <div className="flex flex-col w-full p-12">
            <h1
                className="text-3xl font-bold"
                style={{ fontFamily: "var(--font-geist-sans)" }}
            > <span className="text-blue-600">interface</span> {className} </h1>
            <div className="flex flex-row">
                {getDefinition?.extends && (
                    <div className="font-mono text-lg bg-gray-200 dark:bg-zinc-900 px-2 py-[0.5px] rounded-xl mr-2">
                        <span className="italic">extends</span> <Link className="text-blue-500" href={`/docs/${getDefinition.extends}:interface`}>{getDefinition.extends}</Link>
                    </div>
                )}
            </div>
            {
                getDefinition.genericTypes && getDefinition.genericTypes.length > 0 && (
                    <div className="flex flex-col mt-4">
                        <h2 className="text-2xl font-semibold"> Generics </h2>
                        <div className="flex flex-col gap-2 font-mono mt-4 text-lg">
                            {
                                getDefinition.genericTypes.map(
                                    (generic, index) => <p key={`gene-${index}`}><span className="bg-gray-200 dark:bg-zinc-800 px-4 py-1 rounded-xl">{generic}</span></p>
                                )
                            }
                        </div>
                    </div>
                )
            }
            {
                getDefinition?.properties.some((item) => item.name == "<callSignature>") && (
                    <div className="flex flex-col mt-4">
                        <h2 className="text-2xl font-semibold"> CallSignature </h2>
                        <div className="flex flex-col gap-2 font-mono mt-4 text-lg">
                            {
                                getDefinition?.properties && getDefinition?.properties.filter((item) => item.name == "<callSignature>" && item.type == "method").map((item, index) => item.name && item.isFunction && (
                                    <div className="flex flex-row w-full" key={`${item.name}-${index}`}>
                                        <div
                                            className={`flex flex-col items-start gap-[1px] py-4 w-full ${index !== 0 ? "border-t border-gray-300 dark:border-zinc-700" : "border-none"}`}
                                        >
                                                <p>{`(`} 
                                                    {
                                                        item.args && item.args.length > 0 && item.args.map((arg, index) => (
                                                            <span key={`${arg.name}-${index}`}>{arg.name}: <TypeParam Ttype={arg.type} />{index !== (item.args!.length - 1) ? ", " : ""}</span>
                                                        ))
                                                    }
                                                {`)`}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
            <div className="flex flex-col mt-4">
                <h2 className="text-2xl font-semibold"> Properties </h2>
                {
                    getDefinition?.properties && getDefinition?.properties.filter( item => item.type == "property").sort(sortFunc).filter((item) => !item.isFunction).map((item, index) => item.name && (
                        <div className="flex flex-row w-full" key={`${item.name}-${index}`}>
                            <div
                                className={`flex flex-col items-start gap-[1px] py-4 w-full ${index !== 0 ? "border-t border-gray-300 dark:border-zinc-700" : "border-none"}`}
                            >
                                {item.isPrivate && <div className="font-mono border-fuchsia-600 dark:border-fuchsia-950 text-sm bg-fuchsia-200 dark:bg-fuchsia-900 rounded-xl px-2 py-[0.5px]">Private</div>}
                                <div className="font-mono text-lg"> <span className="font-semibold">{item.name}</span> : <TypeParam Ttype={item.Ttype} /></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

