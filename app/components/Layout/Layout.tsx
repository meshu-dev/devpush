import { PropsWithChildren } from 'react';
import Header from '@/app/components/Layout/Header';

const Layout = (props: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="container">
        { props.children }
      </main>
    </>
  );
}

export default Layout;

