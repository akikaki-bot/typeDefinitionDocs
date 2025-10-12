import { isPrimitive } from "@/util/isPrimitive";
import Link from "next/link";
import { Fragment } from "react";


export function TypeParam({ Ttype, dir, subDir } : { Ttype : string , dir: string, subDir: string }) {
    
    const splitTypes = Ttype.split("|").map(type => type.trim());
    if( splitTypes[0].length === 0 ) splitTypes.shift();
    const isGeneric = Ttype.includes("<") && Ttype.includes(">");

    if (splitTypes.length > 1) {
        return (
            <>
                {splitTypes.map((type, index) => (
                    <span key={`${type}-${index}`}>
                        <TypeParam Ttype={type} dir={dir} subDir={subDir} />
                        {index !== splitTypes.length - 1 && <span className="mx-2">|</span>}
                    </span>
                ))}
            </>
        );
    }
    
    if (isGeneric) {
        const genericStart = Ttype.indexOf("<");
        const genericEnd = Ttype.lastIndexOf(">");
        const mainType = Ttype.substring(0, genericStart).trim();
        const genericContent = Ttype.substring(genericStart + 1, genericEnd).trim();
        const genericTypes = genericContent.split(",").map(type => type.trim());
        return (
        <>
            <TypeParam Ttype={mainType} dir={dir} subDir={subDir} />{"<"}{genericTypes.map((genType, index) => (
                <Fragment key={`${genType}-${index}`}>
                    <TypeParam Ttype={genType} dir={dir} subDir={subDir} />
                    {index !== genericTypes.length - 1 && <span className="mx-2">,</span>}
                </Fragment>
            ))}{">"}
        </>
        );
    }
    const isArrowFunction = Ttype.includes("=>");
    if (isArrowFunction) {
        const arrowIndex = Ttype.indexOf("=>");
        const beforeArrow = Ttype.substring(0, arrowIndex - 1).trim().split(',');
        const afterArrow = Ttype.substring(arrowIndex + 2).trim();
        return (
            <>
                {
                    beforeArrow.includes("(") ? beforeArrow : <>{beforeArrow.map( ( v, index ) => <Fragment key={index}> <span>{v.split(':')[0]}</span> : <TypeParam key={`${v}-${index}`} Ttype={v.split(':')[1]} dir={dir} subDir={subDir} /> </Fragment>)}</>
                }
                ){" => "} <TypeParam Ttype={afterArrow} dir={dir} subDir={subDir} />
            </>
        )
    }
    const isArray = Ttype.endsWith("[]");
    const Literal = /^(['"`]).*\1$/.test(Ttype);

    return (
        <>
            {
                isPrimitive(Ttype) || Literal ? 
                <span className="text-green-600">{Ttype.replaceAll("[]", "")}</span> : 
                <Link 
                    href={`/docs/${dir}/${subDir}/${Ttype.replaceAll("[]", "")}`} 
                    className="text-blue-500"
                >
                    {Ttype.replaceAll("[]", "")}
                </Link>
            }
            { isArray && <span>[]</span> }
        </> 
    )
}