import { Meta } from '@/components/Meta';
import React from 'react';
import style from '@/styles/post.module.css';

const Custom404: React.FC = () => {
  return (
    <>
      <Meta pageTitle={'404エラー'} />
      <main>
        <h1 className={style.title}>404エラー</h1>
        <div className={style.body}>
          <p>ページがみつかりません</p>
        </div>
      </main>
    </>
  );
};

export default Custom404;
