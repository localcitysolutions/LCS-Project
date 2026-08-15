"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { MANAGE_LANG_COOKIE, type ManageLang } from "@/lib/manage/lang";

export async function setManageLangAction(formData: FormData) {
  const lang: ManageLang = formData.get("lang") === "ar" ? "ar" : "en";
  const store = await cookies();
  store.set(MANAGE_LANG_COOKIE, lang, {
    path: "/manage",
    maxAge: 60 * 60 * 24 * 365,
  });

  const referer = (await headers()).get("referer");
  redirect(referer && referer.includes("/manage") ? referer : "/manage");
}
