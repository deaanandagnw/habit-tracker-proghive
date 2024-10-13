import Image from "next/image";
import Link from "next/link";

export function Sidebar() {
  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/goals/add", label: "Goals" },
    { href: "/profile", label: "Profile" },
  ];
  return (
    <nav className="bg-primary w-[307px] h-screen flex flex-col items-center justify-between py-8 overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-5 px-8 mt-5">
        <div className="logo">
          <Image src="/image/logo.png" alt="logo" width={55} height={55} />
        </div>
        <h1 className="font-bold text-secondary text-2xl">Get It</h1>
        {navItems.map((nav) => (
          <Link
            href={nav.href}
            key={nav.label}
            className="text-secondary w-[200px] rounded-full font-semibold text-sm text-center bg-[#AADC8D] p-2"
          >
            {nav.label}
          </Link>
        ))}
      </div>
      <div>
        <Image
          src="/image/background-sidebar.png"
          alt="background sidebar"
          width={200}
          height={150}
          className="w-[20rem] h-auto object-cover"
        />
      </div>
    </nav>
  );
}
