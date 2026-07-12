import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { privacyPolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: privacyPolicy.metaDescription,
};

export default function PrivacyPage() {
  return <LegalPage doc={privacyPolicy} />;
}
