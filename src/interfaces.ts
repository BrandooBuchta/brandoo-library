// interfaces.ts

import { Dispatch, SetStateAction } from "react";

type TimeString = `${number}${number}:${number}${number}:${number}${number}`;

export interface StatisticValue {
  number?: number;
  boolean?: boolean;
  time?: TimeString;
}

export interface OptionsResponse {
  propertyName: string;
  formName: string;
  options: string[];
}

export interface Brandoo {
  addStatisticValue: (statisticId: string, value: StatisticValue) => Promise<void>;
  getPropertyOptions: (
    propertyId: string,
    setter: Dispatch<SetStateAction<OptionsResponse>>,
  ) => Promise<void>;
  createResponse: (formId: string, data: object) => Promise<void>;
  getContent: (
    contentId: string,
    setter: Dispatch<SetStateAction<any>>,
  ) => Promise<void>;
}
