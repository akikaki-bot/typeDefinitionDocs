

/**
 * Union type representing all possible child entities.
 */
export type Children = 
| Method 
| Property 
| Class
| Interface 
| Enum 
| Function 
| TypeAlias  
| Namespace;

type Primitive = string | number | boolean | null | undefined;

type ArrayTOrT<T> = T | T[]

export type Type = "string" | "number" | "boolean" | "null" | "undefined" | "array" | "object" | "function" | "unknown" | "any" | "void" | "never"

/**
 * Represents a base structure for various TypeScript entities.
 */
interface Base {
    name : string,
    type : string,
    TType ?: Type
    jsdoc?: string
    children : Children[] | null
}

/**
 * Represents a method entity.
 * Inherits from Base and can have its own children.
 */
export interface Method extends Base {
    type : "method"
    returnType? : string
    args? : Array<{ name : string, type : string }>
    isFunction : true
    isPrivate? : boolean
    isStatic? : boolean
}

export interface Property extends Base {
    type : "property"
    Ttype: Type
    isPrivate : boolean
    isReadonly : boolean
    isStatic : boolean
    initValue? : ArrayTOrT<Primitive | object>
    isFunction : false
}

export interface Class extends Base {
    type : "class"
    extends? : string
    implements? : string[]
    constructor? : Method
    genericTypes? : string[]
    properties : Array<Property | Method>
    isAbstract : boolean
}

export interface Interface extends Base {
    type : "interface"
    extends? : string[]
    genericTypes? : string[]
    properties : (Property | Method)[]
    isAbstract : boolean
}

export interface Enum extends Base {
    type : "enum"
    properties : ArrayTOrT<{ name : string, value : string | number }>
}

export interface TypeAlias extends Base {
    type : "typeAliasLike"
    isObjectLike : boolean
    properties ?: ArrayTOrT<Primitive | object>
    genericTypes? : string[]
}

export interface TypeT extends TypeAlias {
    isObjectLike : false
    declaredType : string
    properties : undefined
}

export interface TypeObject extends TypeAlias {
    isObjectLike : true
    properties : ArrayTOrT<Primitive | object>
}

export interface Namespace extends Base {
    type : "namespace"
    children : Children[]
}
