const ACCESS_TOKEN_MAP_BOX =
"access_token=pk.eyJ1IjoiaGFyY2V1cyIsImEiOiJjbGVhbmM2NnUwaHdpM3RsZTFzZjFvMm9sIn0.2VEOvJvTzxm3HwYia2Egjw";

export const fetchLocalMapBox = (local: string) =>
fetch(
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?${ACCESS_TOKEN_MAP_BOX}`
).then(response => response.json()).then(data => data);

export const fetchUserGithub = (login: string) =>
fetch(`https://api.github.com/users/${login}`).then(response => response.json()).then(data => data);