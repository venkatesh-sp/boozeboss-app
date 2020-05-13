export function decode(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const raw = window.atob(base64);
    const obj = JSON.parse(raw);
    const newObj = {...obj};
    return Object.assign({}, newObj);
  }