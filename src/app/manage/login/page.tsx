import { getManageLang } from "@/lib/manage/lang";
import LoginForm from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const lang = await getManageLang();
  const { next } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <LoginForm lang={lang} next={next || "/manage"} />
    </div>
  );
}
