module.exports = {
    restDomain: 'http://10.101.37.21:8090',
    basePath: '../',
    dev: true,
    entry: {
        module: [
            'ui.router',
            'system.util.http',
            'system.components.page.layout',
            'system.app.drug',
            'system.app.pharmacy'
        ]
    }
};
