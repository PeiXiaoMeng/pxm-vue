
/** http请求默认的配置 */
export const DEFAULT_REQUEST_CONFIG = {
  /** 报错时toast提示 */
  showToast: true,
  /** 是否展示loading，默认为false */
  showLoading: false,
  /** toast的持续毫秒数，默认2000毫秒 */
  toastDuration: 2000,
  /** 加载中，提示文案 */
  loadingText: '加载中',
  /** 是否显示透明蒙层，防止触摸穿透 */
  loadingMask: true,
  /** 接口500是否跳转错误页 */
  jumpOnError: true,
  /** 网络连接错误是否toast提示 */
  netWorkErrorToast: true,
  /** 认证失败后，是否自动重新认证，默认是 */
  autoReAuth: true,
  /** 接口报错是否提交日志 */
  reportOnError: true,
};

/** 状态信息 */
export const CODE_MESSAGE = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '服务异常，请稍后再试',
  401: '登录过期或未登录',
  403: '您没有权限',
  404: '活动太火爆了，请稍后再试(404)',
  406: '活动太火爆了，请稍后再试(406)',
  410: '活动太火爆了，请稍后再试(410)',
  422: '活动太火爆了，请稍后再试(422)',
  429: '活动太火爆了，请稍后再试(429)',
  499: '活动太火爆了，请稍后再试(499)',
  500: '活动太火爆了，请稍后再试(500)',
  502: '活动太火爆了，请稍后再试(502)',
  503: '活动太火爆了，请稍后再试(503)',
  504: '活动太火爆了，请稍后再试(504)',
};