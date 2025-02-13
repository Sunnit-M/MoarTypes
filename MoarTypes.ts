interface Vector2{
    X : number;
    Y : number;
}

interface Dictionary{
    keys : string[];
    values : any[];
}

/**
 * Allows for some more types to be used
 */
//% weight=100 color=#751AE4 icon=""
namespace MoarTypes {
    /**
     * MoarTypes : Makes A New Vector2
     */
    //% block

    export function NewVector2(x: number, y : number): Vector2 {
        let obj = {X: x, Y : y}
        return obj
    }

    /**
     * Gets the X of a Vector
     */
    //% block
    export function XOf(vector : Vector2): number {
        return vector.X
    }

    /**
    * Gets the Y of a Vector
    */
    //% block
    export function YOf(vector: Vector2): number {
        return vector.Y
    }

    /**
     * Creates a Dictionary with a key and a value
     */
    //% block
    export function CreateDictionary(initialKey : string, initialValue : any): Dictionary{
        const _keys : string[] = [initialKey]
        const _values : any[] = [initialValue]

        let obj = {keys: _keys, values: _values}
        return obj
    }

    /**
     * Appends to a Dictionary with a key and a value
     */
    //% block
    export function AppendDictionary(dictionary: Dictionary, key: string, value: any): void{
        dictionary.keys.insertAt(0, key)
        dictionary.values.insertAt(0, value)
    }

    /**
     * Gets the value using the key
     */
    export function GetValue(dictionary : Dictionary, key : string) : any{
        let i = 0
        for (let x of dictionary.keys) {
            if(x == key){
                return dictionary.values[i]
            }
            i++
        }
    }
}
