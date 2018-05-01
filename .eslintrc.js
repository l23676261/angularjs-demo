module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "globals": {
        "angular": true,
        "$": true,
        "jQuery": true,
        "moment": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType":"module"
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-unused-vars": [
            "warn"
        ],
        "linebreak-style": [
            "off",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": ["warn"]
    }
};
