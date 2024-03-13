import Link from 'next/link'

const Header = () => {
  return (
    <header className="container">
      <Link id="logo" href="/">DevPush.io</Link>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  )
}

export default Header
