import { environment } from './environments/environment';

export class Settings {
  public static INATIVO = 0;
  public static PREPARAR = 1;
  public static FEEDBACK = 2;
  public static REFLEXAO = 3;
  public static FINALIZADO = 4;
}

export const OAuthConfig = {
  linkedin: {
    authEndpoint: environment.apiUrl + 'users/login',
    clientId: '77m7ad7n38rroh',
    redirectURI: environment.appUrl + 'auth'
  }
};
