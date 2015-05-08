/**
 * @fileoverview Tests for complexity rule.
 * @author Patrick Brosset
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require("../../../lib/eslint"),
    ESLintTester = require("eslint-tester");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------


var eslintTester = new ESLintTester(eslint);

eslintTester.addRuleTest("lib/rules/accessor-pairs", {
    valid: [
        "var o = {\n get a() {\n return val; \n} \n};",
        "var o = {\n set a(value) {\n val = value; \n},\n get a() {\n return val; \n} \n};",
        "var o = {a: 1};\n Object.defineProperty(o, 'b', \n{set: function(value) {\n val = value; \n},\n get: function() {\n return val; \n} \n});",
        {
            code: "var expr = 'foo';  var o = { set [expr](value) { val = value; }, get [expr]() { return val; } };",
            ecmaFeatures: {
                objectLiteralComputedProperties: true
            }
        }
    ],
    invalid: [
        {
            code: "var o = {\n set a(value) {\n val = value; \n} \n};",
            errors: [{
                message: "Getter is not present"
            }]
        },
        {
            code: "var o = {\n get a() {\n return val; \n} \n};",
            options: [{
                getWithNoSet: true
            }],
            errors: [{
                message: "Setter is not present"
            }]
        },
        {
            code: "var o = {d: 1};\n Object.defineProperty(o, 'c', \n{set: function(value) {\n val = value; \n} \n});",
            errors: [{
                message: "Getter is not present"
            }]
        },
        {
            code: "var expr = 'foo';  var o = { set [expr](value) { val = value; } };",
            ecmaFeatures: {
                objectLiteralComputedProperties: true
            },
            errors: [{
                message: "Getter is not present"
            }]
        }
    ]
});
