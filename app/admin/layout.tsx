import type { Metadata } from "next";

// Applies to the whole /admin tree, including /admin/login:
// keep this area completely out of search engines.
export const metadata: Metadata = {
  title: { default: "Quản trị | BlackDiamond", template: "%s | Quản trị BlackDiamond" },
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
