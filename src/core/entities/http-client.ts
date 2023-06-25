import { ResponseType } from 'axios';

export type HttpRequest = {
  responseType?: ResponseType;
  url: string;
  method: HttpMethod;
  body?: any;
  headers?: any;
  params?: any;
};

export interface HttpClient {
  request: <R = any>(
    data: HttpRequest,
    unauthorized?: boolean
  ) => Promise<HttpResponse<R>>;
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete' | 'patch';

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};

export type HttpErrorResponse = {
  detail: string;
  error: {
    name: string;
    statusCode: number;
  };
};

export declare type HttpErrorResponsePreValidation = {
  statusCode: number;
  message: string;
  description?: any;
};

export declare type HttpErrorResponsePreValidationV2 = {
  error: string;
  detail: string[];
  protocol: string;
};

export declare type HttpErrorResponsePreValidationV3 = {
  error: string;
  detail: {
    key: string;
    value: string;
  }[];

  protocol: string;
};

export type ControllerResponseType = {
  response: HttpResponse;
  error?: boolean;
};

export type GenericResponse = {
  statusCode: number;
  body: {
    message: string;
  };
};
