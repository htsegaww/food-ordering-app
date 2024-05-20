import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="flex items-center justify-between">
        <Link href="/" className="text-primary font-semibold text-2xl">
          HenoFood
        </Link>
        <nav className="flex gap-4">
          <Link href="/home">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login">Login</Link>
        </nav>
      </header>
    </>
  );
}
