/* constant */
const drugConstant = require('../service/drug.constant');

/* config */
const RouterConfig = require('../config/router.config');
const TranslateConfig = require('../config/translate.config');

/* controller */
const distributionCtrl = require('../controller/distribution.controller');
const patientCtrl = require('../controller/patients.controller');

/* directive */
const searchPatientDirective = require('../directive/searchPatient.directive');
const recipeDetailDirective = require('../directive/recipeDetail.directive');

/* service */
const drugService = require('../service/drug.service');
angular.module('system.app.drug', [
    'ui.tree',
    'pascalprecht.translate',
    'ngDialog',
    'cfp.hotkeys',
    'system.components.ui.input'
])
    .constant('drugConstant', drugConstant)
    .config(RouterConfig)
    .config(TranslateConfig)
    .controller('distributionController', distributionCtrl)
    .controller('patientController', patientCtrl)
    .directive('searchPatient', searchPatientDirective)
    .directive('recipeDetail', recipeDetailDirective)
    .service('drugService', drugService);

