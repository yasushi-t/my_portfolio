import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Image from 'next/image';
import Img01 from '@/images/p02.png';
import Img02 from '@/images/photo-1483921020237-2ff51e8e4b22.jpeg';
import Img03 from '@/images/photo-1580752300969-1ceaaa1f3039.jpeg';
import style from '@/styles/mainVisual.module.css';

export const MainVisual = () => {
  return (
    <div id='mainVisual' className={style.mainVisualInner}>
      <Splide
        options={{
          type: 'fade',
          rewind: true,
          speed: 2000,
          autoplay: true,
          interval: 6000,
          heightRatio: 0.5,
          breakpoints: {
            1120: {
              heightRatio: 0.6,
            },
            768: {
              heightRatio: 1.4,
            },
          },
        }}
      >
        <SplideSlide>
          <Image src={Img01} width={1920} height={1080} alt={'img01'} />
        </SplideSlide>
        {/* <SplideSlide>
          <Image src={Img02} width={1920} height={1080} alt={'img02'} />
        </SplideSlide> */}
        {/* <SplideSlide>
          <Image src={Img03} width={1920} height={1080} alt={'img03'} />
        </SplideSlide> */}
      </Splide>

      <div className={style.message}>YASUSHI TANAKA’s portfolio</div>
      <div className={style.text}>
        福岡県糸島市を拠点に活動しております。
        <br />
        主な制作実績をご紹介いたします
      </div>

      <style jsx global>{`
        .splide {
          width: 100vw;
        }
        .splide__list li img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};
