/** @ngInject */
function registerController($scope,registerService, ngDialog, $message) {
    const service_ = registerService;
    service_.getAllOptions().then(function (result) {
        const [ noons, regTypes, payKinds, Sexs, Invoice ] = result;
        $scope.noons = noons.data.noonList || [];
        $scope.regTypes = regTypes.data || [];
        $scope.payKinds = payKinds.data || [];
        $scope.Sexs = Sexs.data || [];
        $scope.Invoice = Invoice.data.invoiceNo;
        $scope.regTypesActive = regTypes.data[0];
        $scope.noonsActive = noons.data.currentNoon;
        $scope.payKindsActive = payKinds.data[0];
        $scope.sexsActive = {};
        return service_.getAllInformation({
            date: '2018-04-16',
            noonCode: 1
        });
    }).then(function (result) {
        const [ departments, docctors ] = result;
        $scope.departments = departments.data;
        $scope.doctors = docctors.data;

        $scope.departmentsActive = {};
        $scope.doctorsActive = {};
    });
    $scope.pannel = 1;
    $scope.pay = 10;
    //切换回调 type 1: 科室; type 2 : 医生
    $scope.togglePanel = function (type) {
        $scope.pannel = type;
    };
    //搜索
    $scope.filterInput = {
        department: '',
        doctor: ''
    };
    //出生日期
    $scope.birthday = '2008-02-01';
    $scope.username = '';
    $scope.age = '';
    $scope.ageType = [
        {
            code: 1,
            name: '岁'
        },
        {
            code: 2,
            name: '月'
        },
        {
            code: 3,
            name: '天'
        }
    ];
    $scope.ageTypeActive = {
        code: 1,
        name: '岁'
    };
    $scope.seedate = '2018-04-18';
    $scope.phone = '';
    $scope.cncode = '';
    $scope.address = '';
    $scope.telephone = '';
    $scope.ptelephone = '';
    $scope.code = '';
    $scope.getRecord = function () {
        service_.getRecord().then(function (result) {
            $scope.patientId = result.data.patientId;
        });
    };
    $scope.selectItem = function (item, type) {
        if( item.limitCount === item.registedCount ){
            return false;
        }
        if( type === 1 ){
            $scope.departmentsActive = item;
            $scope.doctorsActive = {};
        }else{
            $scope.doctorsActive = item;
            let { deptCode, reglevelCode } = item;
            checkDeptAndDoctor(deptCode, reglevelCode);
        }
    };
    $scope.deptToggle = function (data) {
        $scope.doctorsActive = {};
    };
    $scope.$watch('doctorsActive',function (newValue ,oldValue ) {
        if( newValue !== oldValue && newValue ){
            let { deptCode, reglevelCode } = newValue;
            checkDeptAndDoctor(deptCode, reglevelCode);
        }
    });
    $scope.openDialog = function () {
        if( !$scope.departmentsActive.hasOwnProperty('code') || $scope.username == '' ){
            $message.error('请完善信息');
            return false;
        }
        if( !$scope.doctorsActive.hasOwnProperty('code') && $scope.regTypesActive.code != 1 ){
            $message.error('请完善信息');
            return false;
        }
        ngDialog.open({
            template: 'confirmRegister',
            scope: $scope
        });
    };
    $scope.registerSubmit = function () {
        let params = {
            schemaSn: $scope.doctorsActive.hasOwnProperty('code') ? $scope.doctorsActive.schemaSn : $scope.departmentsActive.schemaSn,
            markType: '1',
            markCardNo: '1',
            patientId: $scope.patientId,
            name: $scope.username,
            sex: $scope.sexsActive.name || '',
            birthday: $scope.birthday,
            telNum: $scope.phone,
            addrProvCo:"001",
            addrProvName:"辽宁省",
            addrCityCo:"0001",
            addrCityName:"沈阳市",
            addrDistCo:"00001",
            addrDistName:"浑南区",
            addrOther:"新秀街2号",
            seeDate: $scope.seedate,
            noonCode: $scope.noonsActive.code,
            noonName: $scope.noonsActive.name,
            beginTime: $scope.doctorsActive.hasOwnProperty('code') ? $scope.doctorsActive.beginTime : $scope.departmentsActive.beginTime,
            endTime: $scope.doctorsActive.hasOwnProperty('code') ? $scope.doctorsActive.endTime : $scope.departmentsActive.endTime,
            payKindCode: $scope.payKindsActive.code,
            payKindName: $scope.payKindsActive.name,
            YNPay: '1',
            doctCode: $scope.doctorsActive.hasOwnProperty('code') ? $scope.doctorsActive.code : '',
            doctName: $scope.doctorsActive.hasOwnProperty('code') ? $scope.doctorsActive.name : '',
            deptCode: $scope.departmentsActive.code,
            deptName: $scope.departmentsActive.name,
            regTypeCode: $scope.regTypesActive.code,
            regTypeName: $scope.regTypesActive.name,
            YNupdatePatientInfo: '1'
        };
        service_.save(params).then(function (result) {
            if( result.status == 1 ){
                $message.success('挂号成功');
            }else{
                $message.error('挂号失败');
            }
        });
    };

    function checkDeptAndDoctor(deptCode, reglevelCode){
        angular.forEach($scope.departments, function (item, key) {
            if( item.code == deptCode ){
                $scope.departmentsActive = item;
            }
        });
        angular.forEach($scope.regTypes, function (item, key) {
            if( item.code == reglevelCode ){
                $scope.regTypesActive = item;
            }
        });
    }

}
module.exports = registerController;
