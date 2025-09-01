"use server";

import { cookies } from "next/headers";

export async function getJWTCookies() {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken");
  const refreshToken = cookiesStore.get("refreshToken");

  return { accessToken: accessToken, refreshToken: refreshToken };
}

export async function setAccessTokenCookie(
  accessToken: any,
  accessTokenMaxAge: number
) {
  const cookiesStore = await cookies();
  cookiesStore.set({
    name: "accessToken",
    value: accessToken,
    maxAge: accessTokenMaxAge,
    httpOnly: true, // is inaccessible to the javascript document.cookie api
    secure: true, // is only sent to the server with an encrypted request over the https protocol
    sameSite: "strict", // the browser only sends the cookie with requests from the cookie's origin site
  });
}

export async function setRefreshTokenCookie(
  refreshToken: any,
  refreshTokenMaxAge: number
) {
  const cookiesStore = await cookies();
  cookiesStore.set({
    name: "refreshToken",
    value: refreshToken,
    maxAge: refreshTokenMaxAge,
    httpOnly: true, // is inaccessible to the javascript document.cookie api
    secure: true, // is only sent to the server with an encrypted request over the https protocol
    sameSite: "strict", // the browser only sends the cookie with requests from the cookie's origin site
  });
}

export async function setJWTCookies({
  accessToken,
  refreshToken,
  accessTokenMaxAge,
  refreshTokenMaxAge,
}: any) {
  await setAccessTokenCookie(accessToken, accessTokenMaxAge);
  await setRefreshTokenCookie(refreshToken, refreshTokenMaxAge);
}

export async function removeJWTCookies() {
  const cookiesStore = await cookies();
  cookiesStore.delete({
    name: "accessToken",
  });
  cookiesStore.delete({
    name: "refreshToken",
  });
}
