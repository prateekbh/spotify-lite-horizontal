export function getSpotifyFetch(token: string) {
  return function (url: RequestInfo, options?: RequestInit) {
    return fetch(url, {
      ...options,
      headers: {
        ...(options?.headers ?? {}),
        Authorization: `Bearer ${token}`,
      },
      credentials: "same-origin",
    });
  };
}
