// app/(public)/layout.tsx
import NavBar from "@/components/nav/NavBar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
