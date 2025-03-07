// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export type RequestResult = Record<string, any> | { err: ResponseError };

export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response): any {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  // when empty body occur, .json is going to fail, in that case just return null
  return response.json().catch(() => null);
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response): any {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new ResponseError(response);
  error.response = response;
  throw error;
}

function printRequestDebug(response): any {
  return response;
}

/**
 * Requests a URL, returning a raw response
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export async function rawRequest(url: string, options?: RequestInit): Promise<RequestResult> {
  return fetch(url, options).then(checkStatus).then(printRequestDebug);
}

export async function pureRequest(url: string, options?: RequestInit): Promise<RequestResult> {
  return rawRequest(url, options).then(parseJSON);
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default async function request(url: string, options?: RequestInit): Promise<RequestResult> {
  return rawRequest(url, options).then(parseJSON);
}
