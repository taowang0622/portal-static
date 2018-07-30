module.exports = {
    "env": {
        // "browser": true,
        // "commonjs": true,
        "es6": true,  //For ES6 global variables, like NaN, Infinity, null, undefined, parseInt, Object, Function, Number, Date..
        "node": true,
        "mocha": true
    },
    //You only need to use babel-eslint if you are using types (Flow) or experimental features not supported in ESLint itself yet. Otherwise try the default parser (you don't have to use it just because you are using Babel)
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6, //For ES6 syntax, then the parser can tokenize the code texts as desired!!!
        "sourceType": "script" //We code in CommonJS modules, instead of ECMAScript modules, so set it to "script"
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
