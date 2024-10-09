// api.ts

import axios, { AxiosInstance } from "axios";
import {
  camelCase,
  snakeCase,
  isArray,
  isObject,
  mapKeys,
  mapValues,
} from "lodash";

export const baseURL: string = "https://api.brandoo.cz/api/";

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthTokenHeader = (token: string | null): void => {
  let t: string | null = `Bearer ${token}`;

  if (token === null) t = null;
  instance.defaults.headers.common["Authorization"] = t;
};

const toCamelCase = (obj: any): any => {
  if (isArray(obj)) {
    return obj.map((v) => toCamelCase(v));
  } else if (isObject(obj)) {
    return mapValues(
      mapKeys(obj, (_value, key) => camelCase(key)),
      (value) => toCamelCase(value),
    );
  } else {
    return obj;
  }
};

const toSnakeCase = (obj: any): any => {
  if (isArray(obj)) {
    return obj.map((v) => toSnakeCase(v));
  } else if (isObject(obj)) {
    return mapValues(
      mapKeys(obj, (_value, key) => snakeCase(key)),
      (value) => toSnakeCase(value),
    );
  } else {
    return obj;
  }
};

instance.interceptors.request.use(
  (config) => {
    if (config.url?.includes("create-response") && config.data) {
      config.data = toCamelCase(config.data);
      return config;
    }
    config.data = toSnakeCase(config.data);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = toCamelCase(response.data);
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const api = instance;
