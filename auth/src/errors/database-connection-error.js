"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionError = void 0;
var custom_error_1 = require("./custom-error");
var DatabaseConnectionError = /** @class */ (function (_super) {
    __extends(DatabaseConnectionError, _super);
    function DatabaseConnectionError() {
        var _this = 
        // CustomError (like Error) expects a default message property to be passed when instantiated
        // DatabaseConnectionError will just pass a default message for logging purposes, but for API responses will
        // rely on the array of type ValidationError[] from express-validator that we pass in when instantiating the DatabaseConnectionError
        _super.call(this, "Error connecting to database") || this;
        _this.message = "Error connecting to database";
        _this.statusCode = 500;
        Object.setPrototypeOf(_this, DatabaseConnectionError.prototype);
        return _this;
    }
    DatabaseConnectionError.prototype.toApiErrors = function () {
        return [{ message: this.message }];
    };
    return DatabaseConnectionError;
}(custom_error_1.CustomError));
exports.DatabaseConnectionError = DatabaseConnectionError;
