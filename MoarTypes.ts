interface Vector2{
    X : number;
    Y : number;
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
}
