import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';
import {
  AuthenticationSucess,
  HttpClient,
  HttpRequest,
  HttpResponse
} from 'core/entities';
import { InvalidCredentialsError } from 'core/errors/invalid-credentials-error';
import { SessionStorage } from 'core/infra';

export class ApiClient implements HttpClient {
  async request(
    data: HttpRequest,
    unauthorized?: boolean
  ): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: unauthorized
          ? data.headers
          : this.applyDefaultConfig(data.headers),
        params: data.params,
        responseType: data.responseType
      });
    } catch (error: any) {
      axiosResponse = error.response;
    }

    return {
      statusCode: axiosResponse?.status,
      body: axiosResponse?.data ?? axiosResponse
    };
  }

  private applyDefaultConfig(
    headers: AxiosRequestHeaders
  ): AxiosRequestHeaders {
    const session = new SessionStorage();
    const token = session.get('token') as AuthenticationSucess;

    if (token?.access_token) {
      return {
        Authorization: `Bearer ${token.access_token}`,
        ...headers
      };
    } else {
      throw new InvalidCredentialsError();
    }
  }
}
