import { readDocData } from "@/core/readDocdata";
import Link from "next/link";



export default async function Docs() {
    const readDocResult = await readDocData()

    return (
        <div className="flex flex-col w-full min-h-full p-12">
            <h1 className="text-3xl font-bold mb-8"> MisTsKey@1.1.0 </h1>
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold"> SourceDirectories </h2>
                {
                    readDocResult?.map((item) => (
                        <div className="flex flex-row w-full" key={`/${item.directory}/${item.subDirectory}`}>
                            <Link 
                                href={`/docs/${item.directory}/${item.subDirectory}`}
                                className="text-lg hover:underline font-mono"
                            >
                                {item.directory}/{item.subDirectory}
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}