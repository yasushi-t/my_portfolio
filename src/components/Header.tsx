import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { Nav } from '@/components/Nav';
import style from '@/styles/header.module.css';
import { MainVisual } from '@/components/MainVisual';
import { useRouter } from 'next/router';

export const Header = () => {
  const [isTopPage, setIsTopPage] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const router = useRouter();
  const { asPath } = router;
  const mainVisualRef = useRef<HTMLDivElement>(null);

  // スクロールイベントを監視してスクロール位置を更新する
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    // マウント時にスクロールイベントを追加し、アンマウント時に削除する
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (asPath && /^\/(#\w+)?$/.test(asPath)) {
      setIsTopPage(true);
    } else {
      setIsTopPage(false);
    }
  }, [asPath]);

  // MainVisualの高さを取得する
  const getMainVisualHeight = () => {
    if (mainVisualRef.current) {
      return mainVisualRef.current.clientHeight;
    }
    return 0;
  };

  const switchColor = (isTopPage: boolean) => {
    return isTopPage && (scrollPosition < getMainVisualHeight() || scrollPosition === 0)
      ? 'colorWhite'
      : 'colorBlack';
  };

  return (
    <>
      <header className={style.header}>
        <div className={style.headerInner}>
          <div className={`${style.headerLogo} ${switchColor(isTopPage)}`}>
            <Link href='/'></Link>
          </div>
          <Nav switchColor={switchColor(isTopPage)} />
        </div>
      </header>
      {isTopPage && (
        <div id='MainVisual' ref={mainVisualRef}>
          <MainVisual />
        </div>
      )}
    </>
  );
};
