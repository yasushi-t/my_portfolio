import React from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import style from '@/styles/layout.module.css';
import { useRouter } from 'next/router';

type Props = {
  children: JSX.Element;
};

export const Layout = ({ children }: Props) => {
  const router = useRouter();
  const { asPath } = router;

  return (
    <>
      <Header />
      <main>
        <div
          className={
            asPath && /^\/(#\w+)?$/.test(asPath)
              ? `${style.topContentInner}`
              : `${style.contentInner}`
          }
        >
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};
