// useBrandoo.ts

import { api, setAuthTokenHeader } from "./api";
import { Brandoo, OptionsResponse } from "./interfaces";

const useBrandoo = (): Brandoo => {
  const token = process.env.NEXT_PUBLIC_BRANDOO_AUTH_TOKEN;

  token && setAuthTokenHeader(token);

  return {
    pushStatistic: async (statisticId, value) => {
      try {
        await api.post(`statistics/value/${statisticId}`, value);
      } catch (error) {
        console.error(`${error}`);
      }
    },
    getPropertyOptions: async (propertyId, setter) => {
      try {
        const { data } = await api.get<OptionsResponse>(
          `forms/property/options/${propertyId}`,
        );

        setter(data);
      } catch (error) {
        console.error(error);
      }
    },
    createResponse: async (formId, data) => {
      try {
        await api.post(`forms/create-response/${formId}`, data);
      } catch (error) {
        console.error(`${error}`);
      }
    },
    getContent: async (contentId, setter) => {
      try {
        const { data } = await api.get(`contents/${contentId}/public`);

        const content = Object.values(data)[0];

        setter(content);
      } catch (error) {
        console.error(error);
      }
    },
  };
};

export default useBrandoo;
