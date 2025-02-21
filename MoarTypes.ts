interface Moar_Vector2{
    X : number;
    Y : number;
}

interface Moar_Dictionary{
    keys : string[];
    values : any[];
}
enum TYPES{
    _string,
    _number,
    _Moar_Dictionary,
    _Moar_Vector2,
}

enum Markers{
    Data,
    Json,
    MOAR,
    Unknown,
    User,
    Packet
}

function isDictionary(obj: any): obj is Moar_Dictionary {
    return (obj && typeof obj === 'object' && typeof (obj as Moar_Dictionary).keys == "object");
}

function isVector2(obj: any): obj is Moar_Vector2 {
    return (obj && typeof obj === 'object' && typeof (obj as Moar_Vector2).X === 'number' && typeof (obj as Moar_Vector2).Y === 'number');
}

/**
 * Allows for some more types to be used
 */
//% weight=100 color=#751AE4 icon="" groups='["Dictionary","Vector2","Logic","JSON","Marking","Misc","Images"]'
namespace MoarTypes {
    /**
     * MoarTypes : Makes A New Vector2
     */
    //% block  
    //% group="Vector2"

    export function NewVector2(x: number, y : number): Moar_Vector2 {
        let obj = {X: x, Y : y}
        return obj
    }

    /**
     * Gets the X of a Vector
     */
    //% block
    //% group="Vector2"
    export function XOf(vector : Moar_Vector2): number {
        return vector.X
    }

    /**
    * Gets the Y of a Vector
    */
    //% block
    //% group="Vector2"
    export function YOf(vector: Moar_Vector2): number {
        return vector.Y
    }

    /**
     * Creates a Dictionary with a key and a value
     */
    //% block
    //% group="Dictionary"
    export function CreateDictionary(initialKey : string, initialValue : any): Moar_Dictionary{
        const _keys : string[] = [initialKey]
        const _values : any[] = [initialValue]

        let obj = {keys: _keys, values: _values}
        return obj
    }

    /**
     * Appends to a Dictionary with a key and a value
     */
    //% block
    //% group="Dictionary"
    export function AppendDictionary(dictionary: Moar_Dictionary, key: string, value: any): void{
        dictionary.keys.insertAt(0, key)
        dictionary.values.insertAt(0, value)
    }

    /**
     * Gets the value using the key
     */
    //% block
    //% group="Dictionary"
    export function GetValue(dictionary : Moar_Dictionary, key : string) : any{
        let i = 0
        for (let x of dictionary.keys) {
            if(x == key){
                return dictionary.values[i]
            }
            i++
        }
        return null
    }
    /**
     * Removes an element from a dictionary
     */
    //% block
    //% group="Dictionary"
    export function RemoveElement(dictionary : Moar_Dictionary, key : string) : void{
        let i = 0
        for (let x of dictionary.keys) {
            if (x == key) {
                dictionary.keys.removeAt(i)
                dictionary.values.removeAt(i)
                return
            }
            i++
        }
    }
    /**
     * Converts a dictionary to a dictionary used by most other text based coding launguages and then converts it to json
    */
    //% block
    //% group="Dictionary"
    export function ConvertDictionary(dictionary : Moar_Dictionary) : string{
        if(dictionary.keys[0] == null){
            throw "ERROR Dictionary cannot be null"
        }
        const firstKey : string = dictionary.keys[0]
        const firstValue = dictionary.values[0]
        let foo: any = {key : firstValue}

        for(let i = 0; i >= dictionary.keys.length; i++){
            const xKey : string = dictionary.keys[i]
            const xValue = dictionary.values[i]
            foo[xKey] = xValue
        }

        return JSON.stringify(foo)
    }

    /**
     * Returns true if it is the specified type
     */
    //% block
    //% group="Logic"
    export function IsType(typeEnum : TYPES , value : any) : boolean{
        if(typeEnum == TYPES._string){
            if(typeof value == "string"){
                return true
            }
            else
            {
                return false
            }
        }
        if(typeEnum == TYPES._number){
            if(typeof value === "number"){
                return true
            }
            else
            {
                return false
            }
        }
        if(typeEnum == TYPES._Moar_Vector2){
            if(isVector2(value)){
                return true
            }
            else
            {
                return false
            }
        }
        if(typeEnum == TYPES._Moar_Dictionary){
            if (isDictionary(value)){
                return true
            }
            else
            {
                return false
            }
        }
        return false
    }

    /**
     * Uses json to turn a object into a json string
     */
    //% block
    //% group="JSON"
    export function JsonStringify(value : any) : string{
        return JSON.stringify(value)
    }

    /**
     * Uses json to turn a json string into a object
     */
    //% block
    //% group="JSON"
    export function JsonParse(value : string) : any{
        if (IsMarked(value, Markers.Data)) {
            throw "[MoarTypes] ERROR - DATA IS MARKED"
        }
        else if (IsMarked(value, Markers.Json)) {
            throw "[MoarTypes] ERROR - DATA IS MARKED"
        }
        else if (IsMarked(value, Markers.MOAR)) {
            throw "[MoarTypes] ERROR - DATA IS MARKED"
        }
        else if (IsMarked(value, Markers.Unknown)) {
            throw "[MoarTypes] ERROR - DATA IS MARKED"
        }
        else if (IsMarked(value, Markers.User)) {
            throw "[MoarTypes] ERROR - DATA IS MARKED"
        }
        else if (IsMarked(value, Markers.Packet)) {
            throw "[MoarTypes] ERROR - DATA IS MARKED"
        }
        return JSON.parse(value)
    }

    /**
     * Marks a string so that it can be later identified
     */
    //% block
    //% group="Marking"
    export function Mark(markType : Markers,value : string) : string{
        if(markType == Markers.Data){
            return "-DA+TA-" + value
        }
        else if(markType == Markers.Json){
            return "-JS+ON-" + value
        }
        else if(markType == Markers.MOAR){
            return "-MO+AR-" + value
        }
        else if(markType == Markers.Unknown){
            return "Unknown" + value
        }
        else if(markType == Markers.User){
            return "-US+ER-" + value
        }
        else{
            return "Pac-ket" + value
        }
    }

    /**
     * Checks if a string is marked with the marker
     */
    //% block
    //% group="Marking"
    export function IsMarked(value : string, markType : Markers) : boolean{
        if(value.length > 6){
            const sliced = value.slice(0,7)
            if (markType == Markers.Data) {
                return sliced == "-DA+TA-"
            }
            else if (markType == Markers.Json) {
                return sliced == "-JS+ON-"
            }
            else if (markType == Markers.MOAR) {
                return sliced == "-MO+AR-"
            }
            else if (markType == Markers.Unknown) {
                return sliced == "Unknown"
            }
            else if (markType == Markers.User) {
                return sliced == "-US+ER-"
            }
            else {
                return sliced == "Pac-ket"
            }
        }
        else{
            return false
        }
    }
    /**
     * Removes the mark on a string !MUST BE MARKED!
     */
    //% block
    //% group="Marking"
    export function RemoveMark(value : string) : string{
        if(IsMarked(value, Markers.Data)){
            return value.replace("-DA+TA-", "")
        }
        else if(IsMarked(value, Markers.Json)){
            return value.replace("-JS+ON-", "")
        }
        else if(IsMarked(value, Markers.MOAR)){
            return value.replace("-MO+AR-", "")
        }
        else if(IsMarked(value, Markers.Unknown)){
            return value.replace("Unknown", "")
        }
        else if(IsMarked(value, Markers.User)){
            return value.replace("-US+ER-", "")
        }
        else if(IsMarked(value, Markers.Packet)){
            return value.replace("Pac-ket", "")
        }

        throw "[MoarTypes] ERROR - DATA IS NOT MARKED"
    }

    /**
     * Throws a error
     */
    //% block
    //% group="Misc"
    export function ThrowError(ERROR : string) : void{
        throw ERROR
    }
}
