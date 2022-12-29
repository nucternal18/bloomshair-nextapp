import { useRouter } from "next/router";
import Link from "next/link";

function ActiveLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const router = useRouter();

  return (
    <Link
      href={href}
      className={`${
        router.asPath === href ? "text-yellow-500 dark:text-yellow-500" : ""
      } flex flex-row py-3 text-xs font-bold text-gray-900 dark:text-gray-200 uppercase hover:text-gray-600`}
    >
      {children}
    </Link>
  );
}

export default ActiveLink;
