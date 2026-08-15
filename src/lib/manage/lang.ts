import { cookies } from "next/headers";
import { MANAGE_LANG_COOKIE, type ManageLang } from "./dict";

// Server-only (uses next/headers) — Client Components must import the
// dictionary itself from "./dict", not from this file.
export async function getManageLang(): Promise<ManageLang> {
  const store = await cookies();
  return store.get(MANAGE_LANG_COOKIE)?.value === "ar" ? "ar" : "en";
}

export { MANAGE_LANG_COOKIE, manageDict, getDict, type ManageLang } from "./dict";
