import {
  AuthenticationSucess,
  AuthenticationParams,
  HttpClient,
  HttpResponse,
  HttpStatusCode,
  CreateUserParams
} from 'core/entities';
import { SessionStorage } from 'core/infra';

export class AuthenticationController {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async auth(
    params: AuthenticationParams
  ): Promise<HttpResponse<AuthenticationSucess>> {
    const response = await this.httpClient.request<AuthenticationSucess>(
      {
        url: this.url,
        method: 'post',
        body: params
      },
      true
    );

    const err = response.statusCode !== HttpStatusCode.created;

    if (!err) {
      const session = new SessionStorage();
      await session.set('token', response.body);
    }

    return response;
  }

  async createUser(
    params: CreateUserParams
  ): Promise<HttpResponse<AuthenticationSucess>> {
    const response = await this.httpClient.request<AuthenticationSucess>(
      {
        url: this.url,
        method: 'post',
        body: params
      },
      true
    );

    return response;
  }
}
