// Basic test code copied from https://github.com/bsiever/microbit-pxt-timeanddate/blob/master/test.ts
// Thank you so much I have no idea what im doing

// Run the Test Suite or not?
const runTests = true

if (runTests) {
    let errors = 0
    let testsRun = 0
    function assert(where: string, expected: any, actual: any) {
        if (expected == actual) {
            serial.writeLine(where + " : Passed")
            testsRun += 1
        } else {
            errors += 1
            serial.writeLine(where + " : FAILED\t Expected: " + expected + ' got: ' + actual)
        }
    }

    function testingDone() {
        if (errors == 0) {
            serial.writeLine("All " + testsRun + " tests passed")
            basic.showIcon(IconNames.Happy)
        } else {
            serial.writeLine("Failed " + errors + " of " + testsRun)
            while (true) {
                basic.showIcon(IconNames.Sad)
                basic.showNumber(errors)
                break
            }
        }
    }

    //** Testing Begins */

    //Dictionary

    assert("Check if create dictionary returns a object","object", typeof MoarTypes.NewDictionary())
    assert("Check is create dictionary has keys","test", MoarTypes.NewDictionary("test","foo").keys[0])
    assert("Check is dictionary has values", "foo", MoarTypes.NewDictionary("test","foo").getValue("test"))
    let testDict = MoarTypes.NewDictionary("test", "foo")
    MoarTypes.RemoveElement(testDict, "test")
    assert("GetValue /key/", null, testDict.keys[0])
    assert("GetValue /value/", null, testDict.getValue(testDict.keys[0]))
    assert("GetValue", "foo", MoarTypes.GetValue(MoarTypes.NewDictionary("test","foo"), "test"))
    let testAppendDict = MoarTypes.NewDictionary("test", "foo")
    MoarTypes.AppendDictionary(testAppendDict, "test2", "value2")
    assert("AppendDictionary /key/", "test2", testAppendDict.keys[0])
    assert("AppendDictionary /key/", "value2", testAppendDict.getValue(testAppendDict.keys[0]))

    //Vector2
    let testVector = MoarTypes.NewVector2(5,6)
    assert("NewVector /Type/","object", typeof testVector)
    assert("NewVector /X/", 5, testVector.x)
    assert("NewVector /Y/", 6, testVector.y)
    
    //Logic
    assert("IsType /Dictionary/ /Backend/", true, MoarTypes.isDictionary(MoarTypes.NewDictionary("Test", "foo")))
    assert("IsType /Dictionary/ /Block/", true, MoarTypes.IsType(MoarTypes.TYPES._Moar_Dictionary, MoarTypes.NewDictionary("test", "foo")))
    assert("isType /Vector2/", true, MoarTypes.IsType(MoarTypes.TYPES._Moar_Vector2, testVector))
    assert("isType /Vector/ /Backend/", true, MoarTypes.isVector2(MoarTypes.NewVector2(5,6)))
    assert("isType /Number/", true, MoarTypes.IsType(MoarTypes.TYPES._number, 5))
    assert("isType /String/", true, MoarTypes.IsType(MoarTypes.TYPES._string, "Im so tired"))

    //Json
    const testJson = MoarTypes.JsonStringify(MoarTypes.NewVector2(5,6))
    const testJson2 = MoarTypes.JsonStringify(MoarTypes.NewDictionary("test", "foo"))
    assert("JsonStringify /Vector/", '{"x":5,"y":6,"type":"Moar_Vector2"}', testJson)
    assert("JsonStringify /Dictionary/", '{"data":{"test":"foo"},"type":"Moar_Dictionary"}', testJson2)

    const testParse = MoarTypes.JsonParse(testJson2)

    assert("JsonParse /Vector/ /X/", 5, MoarTypes.JsonParse(testJson).x)
    assert("JsonParse /Vector/ /Y/", 6, MoarTypes.JsonParse(testJson).y)
    assert("JsonParse /Dictionary/ /Keys/", "test", (testParse as MoarTypes.Moar_Dictionary).keys[0])


    //Marking

    for (let i :number = 0 ; i < MoarTypes.marks.length; i++){
        assert("Marks /" + i + "/", MoarTypes.marks[i], MoarTypes.Mark(i as MoarTypes.Markers, ""))
        assert("isMarked /" + i + "/", true, MoarTypes.IsMarked(MoarTypes.Mark(i as MoarTypes.Markers, ""),i as MoarTypes.Markers))
    }

    testingDone()
}