import axios, { AxiosInstance, AxiosResponse } from 'axios';

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  protected constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      withCredentials: true,
    });

    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this._handleResponse, this._handleError);
  };

  private _handleResponse = ({ data }: AxiosResponse) => data;

  protected _handleError = (error: any) => {
    console.error('Axios Request Error:', error);

    return Promise.reject(error);
  };

  public setAuthHeader = (token: string) => {
    this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };
}
