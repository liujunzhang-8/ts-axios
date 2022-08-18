import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "../types";
import xhr from './xhr'
import { buildURL } from "../helpers/url";
import { transformRequest, transformResponse } from "../helpers/data";
import { processHeader } from "../helpers/headers";

