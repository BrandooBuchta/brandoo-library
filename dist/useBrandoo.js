"use strict";
// useBrandoo.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
const useBrandoo = () => {
    const token = process.env.NEXT_PUBLIC_BRANDOO_AUTH_TOKEN;
    token && (0, api_1.setAuthTokenHeader)(token);
    return {
        addStatisticValue: (statisticId, value) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield api_1.api.post(`statistics/value/${statisticId}`, value);
            }
            catch (error) {
                console.error(`${error}`);
            }
        }),
        getPropertyOptions: (propertyId, setter) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { data } = yield api_1.api.get(`forms/property/options/${propertyId}`);
                setter(data);
            }
            catch (error) {
                console.error(error);
            }
        }),
        createResponse: (formId, data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield api_1.api.post(`forms/create-response/${formId}`, data);
            }
            catch (error) {
                console.error(`${error}`);
            }
        }),
        getContent: (contentId, setter) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { data } = yield api_1.api.get(`contents/${contentId}/public`);
                const content = Object.values(data)[0];
                setter(content);
            }
            catch (error) {
                console.error(error);
            }
        }),
    };
};
exports.default = useBrandoo;
