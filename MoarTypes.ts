//% weight=100 color=#751AE4 icon="\uf121" groups='["Dictionary","Vector2","Logic","JSON","Marking","Misc","Images","Depracated","Images"]'
namespace MoarTypes {
    export const marks = ["-DA+TA-", "-JS+ON-", "-MO+AR-", "Unknown", "-US+ER-","Pac-ket"]

    class Moar_Vector2 {
        public x :number;
        public y :number;

        constructor(X:number,Y:number){
            this.x = X
            this.y = Y
        }

        magitude() : number{
            return Math.sqrt((this.x * this.x) + (this.y * this.y))
        }

        private toJSON() {
            return {
                x : this.x,
                y : this.y,
                type :"Moar_Vector2"
            }
        }
    }

    export interface Moar_Dictionary {
        keys: string[];
        values: any[];
    }

    export enum TYPES {
        _string,
        _number,
        _Moar_Dictionary,
        _Moar_Vector2,
    }

    export enum Markers {
        Data,
        Json,
        MOAR,
        Unknown,
        User,
        Packet
    }

    export function isDictionary(obj: any): obj is Moar_Dictionary {
        return (obj && typeof obj === 'object' && typeof (obj as Moar_Dictionary).keys == "object");
    }

    export function isVector2(obj: any): obj is Moar_Vector2 {
        return (obj instanceof Moar_Vector2);
    }
    
    /**
     * MoarTypes : Makes A New Vector2
     */
    //% block  
    //% group="Vector2"
    //% weight=100

    export function NewVector2(x: number, y : number): Moar_Vector2 {
        let obj = new Moar_Vector2(x,y)
        return obj
    }

    /**
     * Gets the X of a Vector
     */
    //% block
    //% group="Vector2"
    //% weight=99
    export function XOf(vector : Moar_Vector2): number {
        return vector.x
    }

    /**
    * Gets the Y of a Vector
    */
    //% block
    //% group="Vector2"
    //% weight=98
    export function YOf(vector: Moar_Vector2): number {
        return vector.y
    }

    /**
     * Creates a Dictionary with a key and a value
     */
    //% block
    //% group="Dictionary"
    //% weight=100
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
    //% weight=99
    export function AppendDictionary(dictionary: Moar_Dictionary, key: string, value: any): void{
        dictionary.keys.insertAt(0, key)
        dictionary.values.insertAt(0, value)
    }

    /**
     * Gets the value using the key
     */
    //% block
    //% group="Dictionary"
    //% weight=98
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
    //% weight=97
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
     * !Depracated! Converts a dictionary to a dictionary used by most other text based coding launguages and then converts it to json
    */
    //% block
    //% group="Dictionary" 
    //% advanced=true
    export function ConvertDictionary(dictionary : Moar_Dictionary) : string{
        if(dictionary.keys[0] == null || dictionary.values[0]){
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

        serial.writeLine("[MoarTypes] - WARNING Convert Dictionary is Depracated and Will NOT be updated in the future")

        return JSON.stringify(foo)
    }

    /**
     * Returns true if it is the specified type
     */
    //% block
    //% group="Logic"
    //% weight=100
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
    //% weight=100
    export function JsonStringify(value : any) : string{
        if(isVector2(value) == true){
            return(JSON.stringify(value.toJSON()))
        }
        return JSON.stringify(value)
    }

    /**
     * Uses json to turn a json string into a object
     */
    //% block
    //% group="JSON"
    //% weight=99
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
    //% advanced=true
    //% weight=100
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
    //% advanced=true
    //% weight=98
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
    //% advanced=true
    //% weight=97
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
    //% advanced=true
    //% weight=100
    export function ThrowError(ERROR : string) : void{
        throw ERROR
    }

    /**
     * Gets the micro-bit's serial number
     */
    //% block
    //% group="Misc"
    //% advanced=true
    //% weight=98
    export function GetSerial() : string{
        return control.deviceSerialNumber().toString()
    }

    /**
     * Converts a Miro-Bit image class into a number[][] with the brigntness values
     */
    //% block="ImageToArray"
    //% group="Images"
    //% weight=100

    export function ImageToArray(input:Image) : number[][]{
        if(input == null){
            throw "Input cannot be null"
        }
        let array:number[][]  = 
        [[0,0,0,0,]
        ,[0,0,0,0,0]
        ,[0,0,0,0,0]
        ,[0,0,0,0,0]
        ,[0,0,0,0,0]]
        for (let x:number = 0; x < 5; x++) {
            for (let y:number = 0; y < 5; y++){
                array[x][y] = input.pixelBrightness(x,y)
            }
        }

        return array
    }

    /**
     * Uses the built in screenshot function
     */
    //% block="Screenshot"
    //% group="Images"
    //% weight=98
    export function screenshot() : Image{
        return led.screenshot()
    }

    /**
     * Converts a number array with brightness values to a MicroBit Image
     */
    //% block="ArrayToImage"
    //% group="Images"
    //% weight=99
    export function ArrayToImage(input: number[][]) : Image{
        let image = images.createImage(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
        for (let x: number = 0; x < 5; x++) {
            for (let y: number = 0; y < 5; y++) {
                image.setPixelBrightness(x,y,input[x][y])
            }
        }
        return image
    }

    /**
     * Returns a null value
     */
    //% group=Misc
    //% weight=100
    //% advanced=true
    //% block="null"
    export function Null() : any{
        return null
    }

}
