import Image from "next/image";
import Link from "next/link";

export function Sidebar() {
  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/goals", label: "My Goals" },
    { href: "/settings", label: "Settings" },
  ];
  return (
    <nav className="bg-primary w-[307px] h-screen flex flex-col items-center justify-between py-8 overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-5 px-8 mt-5">
        <div className="logo">
          <Image src="/image/logo.png" alt="logo" width={55} height={55} />
        </div>
        {navItems.map((nav) => (
          <Link
            href={nav.href}
            key={nav.label}
            className="text-secondary w-[200px] rounded-2xl text-center text-base bg-[#AADC8D] p-2"
          >
            {nav.label}
          </Link>
        ))}
      </div>
      <div>
        <Image
          src="/image/background-sidebar.svg"
          alt="background sidebar"
          width={200}
          height={150}
          className="w-full h-auto object-contain"
        />
      </div>
    </nav>
  );
}
