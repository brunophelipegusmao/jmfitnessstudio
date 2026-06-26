import LoginHeader from "./components/login-header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LoginHeader />
      {children}
    </>
  );
}
