let constant = {
    /**
     * distribution controller
     * @description 默认配置
     */
    defaultTab: 'wait',
    reLoadInterval: 30,
    minInterval: 5,
    confirmDialog: false,
    delayDialog: false,
    cancelDialog: true,

    /**
     * distribution controller
     * @description 发药页面 当前tab页名称 与 查询类型 之间关系 map
     */
    tabMap: {
        wait: '1',
        sent: '3',
        later: '4'
    },

    /**
     * recipe detail directive;
     * @description 处方类型 与 使用颜色 之间的 map
     */
    recipeTypeMap: {
        1: '#FEFF99',
        2: '#61FAA7'
    },
    /**
     * recipe detail directive;
     * @description 性别type 与 文字 之间的 map
     */
    genderMap: {
        1: '男',
        2: '女'
    }
};

module.exports = constant;
