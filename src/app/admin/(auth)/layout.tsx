import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Admin | Cognaium",
  description: "Cognaium Admin Portal",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No authentication required for auth pages
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
