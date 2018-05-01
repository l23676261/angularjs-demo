
/** @ngInject */
function navService( http ) {
    const API = {
        getSideBar: 'api/sidebar'
    };
    return {
        getSideBarData() {
            return http({
                url: API.getSideBar
            });
        }
    };
}
module.exports = navService;
