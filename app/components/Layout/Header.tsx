import Link from 'next/link'

const Header = () => {
  return (
    <header className="container">
      <h1 id="logo">
        <Link href="/">RequireDev</Link>
      </h1>
    </header>
  )
}

export default Header
