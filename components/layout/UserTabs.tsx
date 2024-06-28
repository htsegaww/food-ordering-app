import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({ isAdmin }: { isAdmin: boolean | null }) {
  const pathname = usePathname();
  return (
    <div className="flex mx-auto gap-2 tabs justify-center flex-wrap">
      <Link className={pathname === "/profile" ? "active" : ""} href="/profile">
        Profile
      </Link>

      {isAdmin && (
        <>
          <Link
            className={pathname === "/categories" ? "active" : ""}
            href="/categories"
          >
            Categories
          </Link>
          <Link
            href="/menu-items"
            className={pathname.includes("/menu-items") ? "active" : ""}
          >
            Menu Items
          </Link>
          <Link
            className={pathname.includes("/users") ? "active" : ""}
            href="/users"
          >
            Users
          </Link>
        </>
      )}

      <Link className={pathname === "/orders" ? "active" : ""} href="/orders">
        Orders
      </Link>
    </div>
  );
}
