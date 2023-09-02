import React from 'react';
import style from '@/styles/footer.module.css';
import { siteMeta } from '@/libs/siteMeta';
import Link from 'next/link';

const { siteUrl } = siteMeta;

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const Footer = () => {
  return (
    <>
      <footer>
        <div className={style.footerInner}>
          <p className={style.message}>
            Next.js/ typescript/ microCMS/ CSS Modules/ deployed on Vercel
          </p>
          <p className={style.copyright}>© {siteUrl}</p>
          <button className={style.pagetop} onClick={scrollToTop}>
            TOP
          </button>
        </div>
      </footer>
    </>
  );
};
