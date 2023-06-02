"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

function ActiveLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`${
        pathname === href ? "text-yellow-500 dark:text-yellow-500" : ""
      } flex flex-row py-3 text-xs font-bold text-gray-900 dark:text-gray-200 uppercase hover:text-gray-600`}
    >
      {children}
    </Link>
  );
}

export default ActiveLink;
