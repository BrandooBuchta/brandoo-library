"use strict";
// api.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.setAuthTokenHeader = exports.baseURL = void 0;
const axios_1 = require("axios");
const lodash_1 = require("lodash");
exports.baseURL = "https://api.brandoo.cz/api/";
const instance = axios_1.default.create({
    baseURL: exports.baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
const setAuthTokenHeader = (token) => {
    let t = `Bearer ${token}`;
    if (token === null)
        t = null;
    instance.defaults.headers.common["Authorization"] = t;
};
exports.setAuthTokenHeader = setAuthTokenHeader;
const toCamelCase = (obj) => {
    if ((0, lodash_1.isArray)(obj)) {
        return obj.map((v) => toCamelCase(v));
    }
    else if ((0, lodash_1.isObject)(obj)) {
        return (0, lodash_1.mapValues)((0, lodash_1.mapKeys)(obj, (_value, key) => (0, lodash_1.camelCase)(key)), (value) => toCamelCase(value));
    }
    else {
        return obj;
    }
};
const toSnakeCase = (obj) => {
    if ((0, lodash_1.isArray)(obj)) {
        return obj.map((v) => toSnakeCase(v));
    }
    else if ((0, lodash_1.isObject)(obj)) {
        return (0, lodash_1.mapValues)((0, lodash_1.mapKeys)(obj, (_value, key) => (0, lodash_1.snakeCase)(key)), (value) => toSnakeCase(value));
    }
    else {
        return obj;
    }
};
instance.interceptors.request.use((config) => {
    var _a;
    if (((_a = config.url) === null || _a === void 0 ? void 0 : _a.includes("create-response")) && config.data) {
        config.data = toCamelCase(config.data);
        return config;
    }
    config.data = toSnakeCase(config.data);
    return config;
}, (error) => {
    return Promise.reject(error);
});
instance.interceptors.response.use((response) => {
    if (response.data) {
        response.data = toCamelCase(response.data);
    }
    return response;
}, (error) => {
    return Promise.reject(error);
});
exports.api = instance;
