const Vector2 = {
    up: (): MoarTypes.Moar_Vector2 => { return new MoarTypes.Moar_Vector2(0,1)},
    right: (): MoarTypes.Moar_Vector2 => { return new MoarTypes.Moar_Vector2(1,0)},
    down: (): MoarTypes.Moar_Vector2 => { return new MoarTypes.Moar_Vector2(0,-1)},
    left: (): MoarTypes.Moar_Vector2 => { return new MoarTypes.Moar_Vector2(-1,0)},
    zero: (): MoarTypes.Moar_Vector2 => { return new MoarTypes.Moar_Vector2(0,0)},
    one: (): MoarTypes.Moar_Vector2 => { return new MoarTypes.Moar_Vector2(1,1)},
    lerp: (StartVector: MoarTypes.Moar_Vector2, EndVector: MoarTypes.Moar_Vector2, t: number): MoarTypes.Moar_Vector2 => {
        t = Math.clamp(0,1,t)
        let distance = Vector2.difference(StartVector,EndVector)
        return new MoarTypes.Moar_Vector2(distance.x * t, distance.y * t)
    },
    difference: (a: MoarTypes.Moar_Vector2, b: MoarTypes.Moar_Vector2) => {
        let obj = new MoarTypes.Moar_Vector2(b.x - a.x,b.y - a.y)
        return obj
    },
    New: (X: number = 0, Y: number = 0): MoarTypes.Moar_Vector2 => { return new MoarTypes.Moar_Vector2(X,Y)}
}

//% weight=100 color=#751AE4 icon="\uf121" groups='["Dictionary","Vector2","Logic","JSON","Marking","Misc","Images","Depracated"]'
namespace MoarTypes {
    export class Moar_Vector2 {
        public x: number;
        public y: number;

        constructor(X: number = 0, Y: number = 0) {
            this.x = X
            this.y = Y
        }
        /**
         * gets the mangitude of a vector
         */
        //%block="Vector2.Mangitude %Vector2"
        //%group="Vector2"
        //%weight=93
        magitude(): number {
            return Math.sqrt((this.x * this.x) + (this.y * this.y))
        }
        /**
         * Normalizes a vector
         */
        //%block="Vector2.normalize %Vector2"
        //%group="Vector2"
        //%weight=94
        normalize(): Moar_Vector2 {
            let obj = new Moar_Vector2()
            obj = this
            obj.x = obj.x / obj.magitude()
            obj.y = obj.y / obj.magitude()
            return obj
        }
        /**
         * Multiplies both side of the vector by a number
         */
        //%block="Vector2.Multiply %Vector2 %Number"
        //%group="Vector2"
        //%weight=95
        multiply(value: number) {
            this.x = value * this.x
            this.y = value * this.y
        }
        /**
         * Adds to both values of a vector
         */
        //%block="Vector2.Add %Vector2 %Number"
        //%group="Vector2"
        //%weight=97
        add(value: number) {
            this.x = value + this.x
            this.y = value + this.y
        }
        /**
         * Subtracts a number from both values of the vector
         */
        //%block="Vector2.Subtract %Vector2 %Number"
        //%group="Vector2"
        //%weight=96

        subtract(value: number) {
            this.x = value - this.x
            this.y = value - this.y
        }
        /**
         * Rounds a vector2
         */
        //%block="Vector2.toInt %Vector2"
        //%group="Vector2"
        //%weight=93
        toInt() {
            this.x = Math.round(this.x)
            this.y = Math.round(this.y)
        }

        toJSON() {
            let json = {
                x: this.x,
                y: this.y,
                type: "Moar_Vector2"
            }

            return JSON.stringify(json)
        }

        fromJson(json: string) {
            let obj = JSON.parse(json)

            if (obj.type != "Moar_Vector2") { throw "Cannot Convert non Vetcor" }

            let newObj = new Moar_Vector2(obj.x, obj.y)

            return newObj
        }
    }


    export class Moar_Dictionary {
        public keys: string[] = [];
        private values: any[] = [];

        constructor(key: string = null, value: any = null) {
            if (key != null || value != null) {
                this.keys.insertAt(0, key as string)
                this.values.insertAt(0, value)
            }
        }

        append(key: string, value: any): void {
            this.keys.insertAt(0, key)
            this.values.insertAt(0, value)
        }

        getValue(key: string): any {
            let i = 0
            for (let x of this.keys) {
                if (x == key) {
                    return this.values[i]
                }
                i++
            }
            return null
        }

        removeElement(key: string): void {
            let i = 0
            for (let x of this.keys) {
                if (x == key) {
                    this.keys.removeAt(i)
                    this.values.removeAt(i)
                    return
                }
                i++
            }
        }

        toJSON() {
            if (this.keys.length < 0 || this.values.length < 0) {
                return JSON.stringify({ data: null, type: "Moar_Dictionary" })
            }

            const firstKey: string = this.keys[0]
            const firstValue = this.values[0]
            let foo: { [key: string]: any } = {}

            for (let i = 0; i < this.keys.length; i++) {
                const xKey: string = this.keys[i]
                const xValue = this.values[i]
                foo[xKey] = xValue
            }

            return JSON.stringify({ data: foo, type: "Moar_Dictionary" })
        }

        fromJSON(json: string) {
            let data = JSON.parse(json)
            if (data.type != "Moar_Dictionary") { throw "Cannot convert non dictionary" }
            this.keys = []
            this.values = []
            if (data.data == null) {
                return this
            }
            let keys = Object.keys(data.data)
            for (let i = 0; i < keys.length; i++) {
                this.append(keys[i], data.data[keys[i]])
            }
            return this
        }
    }

    export const marks = ["-DA+TA-", "-JS+ON-", "-MO+AR-", "Unknown", "-US+ER-","Pac-ket"]

    export function isDictionary(obj: any): boolean {
        return (obj instanceof Moar_Dictionary);
    }

    export function isVector2(obj: any): boolean {
        return (obj instanceof Moar_Vector2);
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

    export enum VECTORTYPES{
        up,
        left,
        right,
        down,
        zero,
        one
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
     * Crates a new Vector2 From preset defualts
     */
    //%block="NewVector2.%Type"
    //%group="Vector2"
    //%weight=90
    export function NewVector(vector:VECTORTYPES):Moar_Vector2 {
        switch(vector){
            case VECTORTYPES.up:
                return Vector2.up()
                break
            case VECTORTYPES.left:
                return Vector2.left()
                break
            case VECTORTYPES.right:
                return Vector2.right()
                break
            case VECTORTYPES.down:
                return Vector2.down()
                break
            case VECTORTYPES.zero:
                return Vector2.zero()
                break
            default:
                return Vector2.one()
        }
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
    export function NewDictionary(initialKey : string = null, initialValue : any = null): Moar_Dictionary{
        if(initialKey == null || initialValue == null){
            return new Moar_Dictionary()
        }
        return new Moar_Dictionary(initialKey, initialValue)
    }

    /**
     * Appends to a Dictionary with a key and a value
     */
    //% block
    //% group="Dictionary"
    //% weight=99
    export function AppendDictionary(dictionary: Moar_Dictionary, key: string, value: any): void{
        dictionary.append(key,value)
    }

    /**
     * Gets the value using the key
     */
    //% block
    //% group="Dictionary"
    //% weight=98
    export function GetValue(dictionary : Moar_Dictionary, key : string) : any{
        return dictionary.getValue(key)
    }
    /**
     * Removes an element from a dictionary
     */
    //% block
    //% group="Dictionary"
    //% weight=97
    export function RemoveElement(dictionary : Moar_Dictionary, key : string) : void{
        dictionary.removeElement(key)
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
            return(value.toJSON())
        }
        if(isDictionary(value) == true){
            return(value.toJSON())
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
        let json = JSON.parse(value)

        if((json).type == "Vector2"){
            return new Moar_Vector2(0,0).fromJson(value)
        }

        if((json).type == "Moar_Dictionary"){
            let obj = new Moar_Dictionary()
            obj.fromJSON(value)
            return obj
        }

        return json
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
    //% block
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
    //% block
    //% group="Images"
    //% weight=98
    export function screenshot() : Image{
        return led.screenshot()
    }

    /**
     * Converts a number array with brightness values to a MicroBit Image
     */
    //% block
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