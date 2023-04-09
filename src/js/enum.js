const enumJS = {
    keyBackSpace: 8,
    keyTab: 9,
    keyEnter: 13,
    keyShift: 16,
    keyCtrl: 17,
    keyAlt: 18,
    keyEsc: 27,
    keyLeft: 37,
    arrowUp: 38,
    keyRight: 39,
    arrowDown: 40,
    key0: 48,
    key1: 49,
    key2: 50,
    key3: 51,
    key4: 52,
    key5: 53,
    key6: 54,
    key7: 55,
    key8: 56,
    key9: 57,
    keyA: 65,
    keyE: 69,
    keyD: 68,
    keyP: 80,
    keyS: 83,
    errorCode: {
        exception: 1,
        inValid: 2,
        duplicate: 3,
        insertFailed : 4,
        updateFailed : 5,
        deleteFailed : 6,
        notFound : 7,
    },
    type: {
        add: 1,
        clone: 2,
        edit: 3,
        delete: 4
    },
    typeValue: {
        text: 1,
        number: 2,
        boolean: 3,
        date: 4,
        money: 5,
        checkbox: 6,
        function: 7
    }
}

export default enumJS;