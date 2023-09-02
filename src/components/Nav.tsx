import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import style from '@/styles/nav.module.css';
import router from 'next/router';

type Props = {
  switchColor: string;
};

export const Nav = ({ switchColor }: Props) => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen((value) => !value);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  return (
    <>
      <nav className={`${navOpen ? style.open : style.close} ${switchColor}`}>
        {navOpen && (
          <style jsx global>
            {`
              @media (max-width: 767px) {
                body {
                  overflow: hidden;
                  position: fixed;
                  width: 100%;
                }
              }
            `}
          </style>
        )}
        <button className={style.btn} onClick={toggleNav}>
          <span className={style.bar}></span>
        </button>
        <ul className={style.list}>
          <li>
            <Link href='/#works' onClick={closeNav}>
              WORKS
            </Link>
          </li>
          <li>
            <Link href='/about' onClick={closeNav}>
              ABOUT
            </Link>
          </li>
          <li>
            <Link href='/contact' onClick={closeNav}>
              CONTACT
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
