import { TypeParam } from "@/components/typeParam";
import { TypeT } from "@/types/base";



export function TypeDefinition({ dir, subDir, className, getDefinition }: { dir: string, subDir: string, className: string, getDefinition: TypeT }) {
    return (
        <div className="flex flex-col w-full p-12">
            <h1 
                className="text-3xl font-bold"
                style={{ fontFamily: "var(--font-geist-sans)"}}
            > <span className="text-yellow-600">typealias</span> {className} </h1>
            {
                getDefinition.genericTypes && getDefinition.genericTypes.length > 0 && (
                    <div className="flex flex-col mt-4">
                        <h2 className="text-2xl font-semibold"> Generics </h2>
                        <div className="flex flex-col gap-2 font-mono mt-4">
                            {
                                getDefinition.genericTypes.map(
                                    (generic, index) => <p key={`gene-${index}`}><span className="bg-gray-200 px-4 py-1 rounded-xl">{generic}</span></p>
                                )
                            }
                        </div>
                    </div>
                )
            }
            <div className="flex flex-col mt-4 gap-2">
                <h2 className="text-2xl font-semibold"> Type Definition </h2>
                {
                    getDefinition?.declaredType && (
                        <div className="font-mono text-base bg-gray-200 px-2 py-[0.5px] rounded-xl">
                            <TypeParam Ttype={getDefinition.declaredType} dir={dir} subDir={subDir} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

