import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import style from '@/styles/blogList.module.css';

const AdditionalPost = () => {
  return (
    <div>
      <Link href='/other'>
        <Image
          src='https://images.microcms-assets.io/assets/e314304a48754117bfc5f8581468f919/47269651f4ff4aa696ccedb3b00b502b/top-works-others.png'
          width='800'
          height='600'
          alt='その他 参画したプロジェクト'
          priority
        />
        <h2>その他 参画したプロジェクト</h2>
        <div className={style.rolesAndOutputs}>
          <span className={style.role}>OTHERS</span>
        </div>
      </Link>
    </div>
  );
};

export default AdditionalPost;
