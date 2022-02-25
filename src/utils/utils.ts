import { appConfig as _appConfig } from '../app.config';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

const appConfig = JSON.parse(JSON.stringify(_appConfig));

// 空函数
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}


export function getAppConfig(name?: string) {
  return name? appConfig[name] : appConfig;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function';


/**
 * 获取创建自增id方法
 * @example
 * const createId = getCreateId();
 * createId(); // 0
 * createId(); // 1
 * ...
 */
export const getCreatId = () => { let i = 0; return () => i++ }; 


export const log = (message?: any, ...optionParams: any[] ) => {
  if (getAppConfig('log')) {
    console.log(message, ...optionParams);
  }
}

/**
 * 函数防抖
 * @param fn 函数
 * @param delay 毫秒
 */
export function debounce(fn: (T?: any) => void, delay = 500) {
  let timer: any;
  return (...args: any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay)
  }
}

/**
 * mock 常见搜索流程
 */
interface StremFlowConfig<T, P> {
  data$Fn: (v: T) => any;
  debounceTime?: number;
  next?: (param: P) => void;
  error?: (err: any) => void;
  complete?: () => void;
}

export class StremFlow<T, P> {
  private _sub$ = new Subject();
  private _config: StremFlowConfig<T, P>;

  constructor(config: StremFlowConfig<T, P>) {
    const _config = {
      debounceTime: 600,
      distinctFn: (x: T, y: T) => x === y,
      next: noop,
      error: noop,
      complete: noop,
      ...config,
    }
    this._config = _config;
    this._sub$.pipe(
      debounceTime(_config.debounceTime),
      distinctUntilChanged(_config.distinctFn),
      switchMap(_config.data$Fn)
    )
    .subscribe(_config.next, _config.error, _config.complete);
  }

  next(v: T) {
    this._sub$.next(v);
  }

  complete() {
    this._sub$.complete();
  }
}
