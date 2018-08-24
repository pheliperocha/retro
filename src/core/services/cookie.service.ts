import { Injectable } from '@angular/core';

export interface CookieInterface { [key: string]: any; }
const COOKIE_PREFIX = '$retro$';
const DEFAULT_EXPIRATION = new Date(new Date().setDate(new Date().getDate() + 7));

@Injectable()
export class CookieService {
  private cookies: CookieInterface = {};

  get(key: string): any {
    key = this.injectPrefix(key);
    if (!this.cookies[key]) {
      const cookie = window.document
        .cookie.split('; ')
        .filter((item: any) => item.split('=')[0] === key).pop();
      if (!cookie) {
        return null;
      }
      this.cookies[key] = this.parse(cookie.split('=').slice(1).join('='));
    }

    return this.cookies[key];
  }

  set(key: string, value: any, expires: Date = DEFAULT_EXPIRATION): void {
    console.log(expires);
    key = this.injectPrefix(key);
    this.cookies[key] = value;
    const cookie = `${key}=${encodeURI(value)}; path=/${expires ? `; expires=${ expires.toUTCString() }` : ''}`;
    window.document.cookie = cookie;
  }

  remove(key: string) {
    key = this.injectPrefix(key);
    document.cookie = key + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    delete this.cookies[key];
  }

  private injectPrefix(key: string): string {
    return COOKIE_PREFIX + key;
  }

  private parse(value: any) {
    try {
      return JSON.parse(decodeURI(value));
    } catch (e) {
      return value;
    }
  }
}
