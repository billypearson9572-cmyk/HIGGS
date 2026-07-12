import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { cookiePolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: cookiePolicy.title,
  description: cookiePolicy.metaDescription,
};

export default function CookiesPage() {
  return <LegalPage doc={cookiePolicy} />;
}
