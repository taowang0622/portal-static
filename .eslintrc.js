module.exports = {
    "env": {
        // "browser": true,
        // "commonjs": true,
        "es6": true,
        "node": true,
        "mocha": true
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "script"
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-console": [
            "error",
            {
                "allow": ["warn", "error", "info"]
            }
        ]
    }
};
