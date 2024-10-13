import Image from "next/image";
import Link from "next/link";

export function Sidebar() {
  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/goals/add", label: "Goals" },
    { href: "/profile", label: "Profile" },
  ];
  return (
    <nav className="bg-primary w-[270px] h-screen px-10 flex flex-col items-center justify-between py-8 overflow-hidden">
      <div className="flex flex-col w-full items-center justify-center gap-5 mt-5">
        <div className="logo">
          <Image src="/image/logo.png" alt="logo" width={55} height={55} />
        </div>
        <h1 className="font-bold text-secondary text-2xl">Get It</h1>
        {navItems.map((nav) => (
          <Link
            href={nav.href}
            key={nav.label}
            className="bg-[#AADC8D] hover:bg-primaryGreenDark text-sm text-secondary py-3 px-8 font-semibold rounded-3xl w-full text-center"
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
