/* constant */
const pharmacyConstant = require('../constant/pharmacy.constant');

/* config */
const routerConfig = require('../config/router.config');
const translateConfig = require('../config/translate.config');

/* controller */
const distributionController = require('../controller/distribution.controller');

/* service */
const pharmacyService = require('../service/pharmacy.service');

angular.module('system.app.pharmacy',
    [
        'ui.tree',
        'pascalprecht.translate',
        'ngDialog',
        'cfp.hotkeys'
    ])
    .constant('pharmacyConstant', pharmacyConstant)
    .config(routerConfig)
    .config(translateConfig)
    .controller('distributionController', distributionController)
    .service('pharmacy', pharmacyService);
