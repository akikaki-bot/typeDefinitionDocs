import { TypeParam } from "@/components/typeParam";
import { Class, Method, Property } from "@/types/base";
import Link from "next/link";



export function ClassDefinition({ className, getDefinition }: { className: string, getDefinition: Class }) {

    const sortFunc = (a: (Method | Property), b: (Method | Property)): 0 | 1 | -1 => {
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
                style={{ fontFamily: "var(--font-geist-sans)"}}
            > <span className="text-green-600">class</span> {className} </h1>
            <div className="flex flex-row">
                {getDefinition?.extends && (
                    <div className="font-mono text-lg bg-gray-200 dark:bg-zinc-900 px-2 py-[0.5px] rounded-xl mr-2">
                        <span className="italic">extends</span> <Link href={`/docs/${getDefinition.extends}:class`}>{getDefinition.extends}</Link>
                    </div>
                )}
                {getDefinition?.implements && getDefinition.implements.length > 0 && (
                    <div className="font-mono text-lg bg-gray-200 dark:bg-zinc-900 px-2 py-[0.5px] rounded-xl">
                        <span className="italic">implements</span> {getDefinition.implements.join(", ")}
                    </div>
                )}
            </div>
            <div className="flex flex-col mt-4 gap-2">
                <h2 className="text-2xl font-semibold"> Constructor </h2>
                {getDefinition?.constructor ? (
                    <div className="flex flex-row w-full">
                        <div className="flex flex-col gap-2 justify-center dark:border-zinc-700 font-mono text-lg border rounded-lg px-2 py-[0.5px] border-gray-300">
                            <p>{`constructor(`} 
                                {
                                    getDefinition.constructor.args && getDefinition.constructor.args.length > 0 && getDefinition.constructor.args.map((arg, index) => (
                                        <span key={`${arg.name}-${index}`}>{arg.name}: <TypeParam Ttype={arg.type} />{index !== (getDefinition.constructor!.args!.length - 1) ? ", " : ""}</span>
                                    ))
                                }
                            {`)`}</p>
                        </div>
                    </div>
                ) : <p> No constructor defined </p>}
            </div>
            {
                getDefinition.genericTypes && getDefinition.genericTypes.length > 0 && (
                    <div className="flex flex-col mt-4">
                        <h2 className="text-2xl font-semibold"> Generics </h2>
                        <div className="font-mono text-xl bg-gray-200 dark:bg-zinc-900 px-2 py-[0.5px] rounded-xl mt-4">
                            {"<"}
                            {
                                getDefinition.genericTypes.map(
                                    (generic, index) => <span key={`gene-${index}`}>{generic}{index !== (getDefinition.genericTypes?.length || 1) - 1 && <span className="mx-2">,</span>}</span>
                                )
                            }
                            {">"}
                        </div>
                    </div>
                )
            }
            <div className="flex flex-col mt-4">
                <h2 className="text-2xl font-semibold"> Properties </h2>
                {
                    getDefinition?.properties && getDefinition?.properties.sort(sortFunc).filter((item) => !item.isFunction).map((item, index) => item.name && (
                        <div className="flex flex-row w-full" key={`${item.name}-${index}`}>
                            <div
                                className={`flex flex-col items-start gap-[1px] py-4 w-full ${index !== 0 ? "border-t border-gray-300 dark:border-zinc-700" : "border-none"}`}
                            >
                                {item.isPrivate && <div className="font-mono text-sm bg-fuchsia-300 dark:bg-fuchsia-900 dark:border-fuchsia-950 rounded-xl px-2 py-[0.5px]">Private</div>}
                                <div className="font-mono text-lg">{item.name} : <TypeParam key={index} Ttype={item.Ttype} /></div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex flex-col mt-4">
                <h2 className="text-2xl font-semibold"> Methods </h2>
                <div className="flex flex-col">
                    {
                        getDefinition?.properties && getDefinition?.properties.sort(sortFunc).filter((item) => item.isFunction).map((item, index) => item.name && item.isFunction && (
                            <div className="flex flex-row w-full items-center" key={`${item.name}-${index}`}>
                                <div
                                    className={`flex flex-col items-start gap-[1px] py-4 w-full ${index !== 0 ? "border-t border-gray-300 dark:border-zinc-700" : "border-none"}`}
                                >
                                    {item.isPrivate && <div className="font-mono border-[0.5] border-fuchsia-600 dark:bg-fuchsia-900 dark:border-fuchsia-950 text-sm bg-fuchsia-200 rounded-xl px-2 py-[0.5px]">Private</div>}
                                    <div className="font-mono text-lg">
                                        {item.name}({item.args && item.args.map(
                                            (arg, index) => <span key={`${arg.name}-${index}`}>{arg.name}: <TypeParam Ttype={arg.type} /> {index !== (item.args!.length - 1) ? ", " : ""}</span>
                                        )}) : <TypeParam Ttype={item.TType ?? "void"} />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

