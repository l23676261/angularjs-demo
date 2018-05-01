const mock = require('mockjs');
function Data () {
    // let data = [];
    // for(let i=0; i<5; i++) {
    //     let patient = {
    //         patientId: `a00${String(i+1)}`,
    //         patientName: mock.Random.cname(),
    //         recipeList: [],
    //     };
    //     let recipesNum = mock.Random.int(1,3);
    //     for (let j=0; j<recipesNum;j++) {
    //         patient.recipeList.push({
    //             id: String(j+1),
    //             recipeSn: `No ${mock.Random.int(1,10000)}`
    //         });
    //     }
    //     data.push(patient);
    // }
    let data = [
        {
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
        }
    ];
    return data;
}

module.exports = {
    response: {
        status: 1,
        data: Data()
    }
};
