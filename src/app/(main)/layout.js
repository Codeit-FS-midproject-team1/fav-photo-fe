import Header from "@/components/header/Header";

export default function MainLayout({ children }) {
  return (
    <>
      <Header
        isLoggedIn={false}
        points={1540}
        username="유디"
        unreadCount={1}
      />
      {children}
    </>
  );
}