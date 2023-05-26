
import UserLayout from "../components/Layout/UserLayout";

export default function Layout({ variant = "main", children }) {
 
  return (
    <UserLayout>{children}</UserLayout>
  );
}
