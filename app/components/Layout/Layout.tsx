import { PropsWithChildren } from 'react'
import Header from '@/app/components/Layout/Header'
import Footer from '@/app/components/Layout/Footer'

const Layout = (props: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="container">
        { props.children }
      </main>
      <Footer />
    </>
  );
}

export default Layout
