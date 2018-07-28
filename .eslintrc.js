module.exports = {
    "extends": [
      "standard",
      "plugin:react/recommended"
    ],
    "env": {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "jquery": true
    },
    "plugins": [
        "standard",
        "promise",
        "react",
    ],
    "rules": {
        "semi": [2, "always"],
        // "no-unused-vars": ["off", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }]
    }
};
