const mock = require('mockjs');
function Data () {
    let data = {
        'patientId': 'a001',
        'patientName': '张三',
        'birthday': null,
        'age': 0,
        'sex': null,
        'anaphylaxis': '青霉素',
        'height': '180cm',
        'weight': '80kg',
        'recipeList': [
        {
            'recipeType': null,
            'recipeNo': '1234567890',
            'seeDeptname': null,
            'seeDocname': null,
            'icdName': null,
            'totalAmount': 0,
            'drugList': null
        },
        {
            'recipeType': null,
            'recipeNo': '1111111111',
            'seeDeptname': null,
            'seeDocname': null,
            'icdName': null,
            'totalAmount': 0,
            'drugList': null
        }
        ]
    };
    return data;
}

module.exports = {
    response: {
        status: 1,
        data: Data()
    }
};
