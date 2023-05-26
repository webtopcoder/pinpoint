import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Access from "@/components/AccessError";
import { ownerLinks, locationManagerLinks } from "@/utils/pagesLinks";

export function AuthGuard({ children }) {
  let token = "";
  let additionRole = "";
  if (typeof window !== "undefined") {
    token = window.localStorage.getItem('token');
    additionRole = window.localStorage.getItem('additionRole');
  }
  const { user, initializing, setRedirect } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!initializing) {
      // auth is initialized and there is no user
      if (!token) {
        // remember the page that user tried to access
        setRedirect(router.route);
        router.push("/");
      }
      else {
        if (additionRole === "Location Manager") {
          const filteredUrls = locationManagerLinks.filter(url => url === router.pathname);
          filteredUrls.length > 0 ? '' : router.push("/partner/dashboard")
        }
        else if (additionRole === "Owner") {
          const filteredUrls = ownerLinks.filter(url => url === router.pathname);
          filteredUrls.length > 0 ? '' : router.push("/partner/dashboard")
        }
      }
    }
  }, [user, initializing, setRedirect, router]);

  /* show loading indicator while the auth provider is still initializing */
  if (initializing) {
    return <Access />
  }
  // if auth initialized with a valid user show protected page
  if (!initializing && token) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}
