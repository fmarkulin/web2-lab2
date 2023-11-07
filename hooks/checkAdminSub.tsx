"use server";

export default async function checkAdminSub(sub: string) {
  if (sub === "auth0|654894e1277ae1aa4204f768") return true;
  return false;
}
