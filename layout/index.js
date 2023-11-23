
import UserLayout from "../components/Layout/UserLayout";

export default function Layout({ variant = "main", children, whiteMenu = false }) {
  return (
    <UserLayout whiteMenu={whiteMenu}>{children}</UserLayout>
  );
}
