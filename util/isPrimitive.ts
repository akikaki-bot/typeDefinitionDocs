

export function isPrimitive( type : string ) : boolean {
    return [ "Promise", "Function", "object", "string", "number", "boolean", "bigint", "symbol", "undefined", "null", "void", "any", "unknown", "never" ].includes( type );
}