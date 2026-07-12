import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { termsOfService } from "@/content/legal";

export const metadata: Metadata = {
  title: termsOfService.title,
  description: termsOfService.metaDescription,
};

export default function TermsPage() {
  return <LegalPage doc={termsOfService} />;
}
