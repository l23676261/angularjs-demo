const mock = require('mockjs');
function Data (id) {
    // let detail = {
    //     id: String(id),
    //     name: mock.Random.cname(),
    //     birthday: mock.Random.date('yyyy-MM-dd'),
    //     height: mock.Random.int(150,180),
    //     weight: mock.Random.int(40,100),
    //     recipes: []
    // };
    // let recipeNum = mock.Random.int(1,3);
    // for (let i=0; i<recipeNum;i++) {
    //     let sample = {
    //         id: `${i+1}`,
    //         recipeType: mock.Random.int(1,2),
    //         surgery: 'XX科',
    //         diagnosis: 'XXXXXXXX',
    //         doctor: mock.Random.cname(),
    //         drugs: []
    //     };
    //     let drugNum = mock.Random.int(1,5);
    //     for (let j=0; j<drugNum;j++) {
    //         let drug = {
    //             name: 'XXXX',
    //             number: mock.Random.int(1,10),
    //             guide: 'XXXXXXXXXXXXXXXXXXXXXXXXX',
    //             price: mock.Random.float(1, 100, 0, 2).toFixed(2),
    //             company: '远大医药（中国）有限公司',
    //         };
    //         drug.total = (drug.price * drug.number).toFixed(2);
    //         sample.drugs.push(drug);
    //     }
    //     detail.recipes.push(sample);
    // }
    let detail = {
        'patientId': 'a001',
        'patientName': '张三',
        'birthday': 271353600000,
        'age': 40,
        'sex': '1',
        'anaphylaxis': '青霉素',
        'height': '180cm',
        'weight': '80kg',
        'recipeList': [
            {
                'recipeType': '1',
                'recipeNo': '1234567890',
                'seeDeptname': '肠胃科',
                'seeDocname': '王医生',
                'icdName': '肠胃炎',
                'totalAmount': 89.44,
                'drugList': [
                    {
                        'combNo': '123',
                        'sortNo': 2,
                        'drugName': '阿莫西林',
                        'quantity': '2盒1片',
                        'dosage': '每日3次,口服,每次1片',
                        'manufacturer': '哈药集团制药总厂',
                        'unitPrice': 10,
                        'totalCost': 21
                    },
                    {
                        'combNo': '123',
                        'sortNo': 3,
                        'drugName': '阿莫西林2',
                        'quantity': '2盒3片',
                        'dosage': '每日3次,口服,每次2片',
                        'manufacturer': '哈药集团制药总厂',
                        'unitPrice': 20,
                        'totalCost': 46
                    },
                    {
                        'combNo': '123',
                        'sortNo': 4,
                        'drugName': '阿莫西林3',
                        'quantity': '1盒8片',
                        'dosage': '每日2次,温水冲服,每次1片',
                        'manufacturer': '哈药集团制药总厂',
                        'unitPrice': 5,
                        'totalCost': 9
                    },
                    {
                        'combNo': '200',
                        'sortNo': 5,
                        'drugName': '感康胶囊',
                        'quantity': '1盒',
                        'dosage': '每日3次,温水冲服,每次1片',
                        'manufacturer': '哈药集团制药总厂',
                        'unitPrice': 13.44,
                        'totalCost': 13.44
                    }
                ]
            },
            {
                'recipeType': '2',
                'recipeNo': '1111111111',
                'seeDeptname': '肠胃科',
                'seeDocname': '王医生',
                'icdName': '肠胃炎2',
                'totalAmount': 50,
                'drugList': [
                    {
                        'combNo': '201',
                        'sortNo': 1,
                        'drugName': '感康胶囊2',
                        'quantity': '2盒',
                        'dosage': '每日3次,口服,每次2片',
                        'manufacturer': '哈药集团制药总厂',
                        'unitPrice': 25,
                        'totalCost': 50
                    }
                ]
            }
        ]
    };
    return detail;
}

function Response() {
    let responses = [];
    for (let i=0; i<10; i++) {
        // console.log(Data(i));
        responses.push({
            params: {
                patientId: String(i)
            },
            response: {
                status: 1,
                data: Data(i+1)
            }
        });
    }
    return responses[0].response;
}

module.exports = Response();
