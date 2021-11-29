enum Methods {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
}

type RequestOptions = {
  method?: Methods;
  data?: XMLHttpRequestBodyInit;
  headers?: Headers;
  timeout?: number;
  retries?: number;
};

function queryStringify(data: Record<string, unknown>) {
  return `?${Object.keys(data!)
    .map((k) => ((data && typeof data[k] !== undefined)
      ? `${k}=${data[k]}`
      : null))
    .filter((item) => item)
    .join('&')}`;
}

export default class HTTPTransport {
  base: string;

  constructor(base = '') {
    this.base = base;
  }

  get = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
    let search = '';
    if (options.data) {
      search = queryStringify(options.data as unknown as Record<string, unknown>);
    }
    return this.request(url + search, { ...options, method: Methods.get });
  };

  post = (url: string, data = {}): Promise<XMLHttpRequest> => (
    this.request(url, { data: JSON.stringify(data), method: Methods.post })
  );

  put = (url: string, data = {}): Promise<XMLHttpRequest> => (
    this.request(url, { data: JSON.stringify(data), method: Methods.put })
  );

  del = (url: string, data = {}): Promise<XMLHttpRequest> => (
    this.request(url, { data: JSON.stringify(data), method: Methods.delete })
  );

  request = (url: string, {
    method = Methods.get,
    data,
    headers,
    timeout = 5000,
  }: RequestOptions): Promise<XMLHttpRequest> => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open(method, this.base + url);

    xhr.timeout = timeout;

    xhr.setRequestHeader('content-type', 'application/json');

    if (headers) {
      Object.entries(headers).forEach(([header, value]) => xhr.setRequestHeader(header, value));
    }

    xhr.onload = () => {
      resolve(xhr);
    };

    xhr.onabort = reject;
    xhr.onerror = reject;
    xhr.ontimeout = reject;

    if (method === Methods.get || !data) {
      xhr.send();
    } else {
      xhr.send(data);
    }
  });
}

let fails = 0;

export function fetchWithRetry(url: string, options: RequestOptions): Promise<XMLHttpRequest> {
  return new HTTPTransport().request(url, options)
    .then((res) => {
      fails++;
      return res;
    })
    .catch(() => {
      if (fails < (options.retries ?? 1)) {
        fails++;
        return fetchWithRetry(url, options);
      }
      fails = 0;
      throw new Error('');
    });
}
