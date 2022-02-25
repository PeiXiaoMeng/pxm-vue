import { Observable, of, AsyncSubject } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';

/**
 * @description 模拟登录认证流程，验证rxjs
 */

class Authentication {

  login$ = new AsyncSubject();

  private _login() {
    return new Observable((observer: any) => {
      setTimeout(() => {
        const isLogin = true;
        const name = '忆晋南城';
        observer.next({
          isLogin, name
        });
      }, 3000)
    })
  }

  private _loginEnd(response: any) {
    this.login$.next(response);
    this.login$.complete();
  }

  login() {
    return this._login().pipe(
      switchMap(({ isLogin, name }) => {
        console.log(isLogin);
        return of ({
          isLogin,
          name,
          isMember: true,
        })
      }),
      catchError(() => {
        return of ({})
      }),
      switchMap((res: any) => {
        return of ({
          ...res,
          integral: 10,
        })
      }),
      tap((response: any) => {
        this._loginEnd(response);
      })
    )
  }
}

export const auth = new Authentication();