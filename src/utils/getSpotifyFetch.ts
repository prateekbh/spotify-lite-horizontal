export function getSpotifyFetch(token: string) {
  return function (url: RequestInfo, options?: RequestInit) {
    return fetch(`https://api.spotify.com/v1${url}`, {
      ...options,
      headers: {
        ...(options?.headers ?? {}),
        Authorization: `Bearer ${token}`,
      },
      credentials: "same-origin",
    });
  };
}
