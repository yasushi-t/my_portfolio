import Head from 'next/head';
import { useRouter } from 'next/router';
import { siteMeta } from '@/libs/siteMeta';
import { MetaData } from '@/types/metaData';
import siteImg from '@/images/ogp.png';

const { siteLocale, siteType, siteIcon, siteUrl, siteTitle, siteDescription } = siteMeta;

export const Meta: React.FC<MetaData> = ({
  pageTitle,
  pageDesc,
  pageImg,
  pageImgWidth,
  pageImgHeight,
}) => {
  const router = useRouter();
  const title = pageTitle ? `${pageTitle}｜${siteTitle}` : siteTitle;
  const description = pageDesc ? pageDesc : siteDescription;
  const url = `${siteUrl}${router.asPath}`;
  const imgWidth = pageImgWidth || siteImg.width;
  const imgHeight = pageImgHeight || siteImg.height;
  const imgUrl = pageImg || siteImg.src;

  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={`https://${url}`} />
      <meta property='og:site_name' content={siteTitle} />
      <meta property='og:type' content={siteType} />
      <meta property='og:locale' content={siteLocale} />
      <meta property='og:image' content={imgUrl} />
      <meta property='og:image:width' content={String(imgWidth)} />
      <meta property='og:image:height' content={String(imgHeight)} />
      <link rel='canonical' href={`https://${url}`} />
      <link rel='icon' href={siteIcon.src} />
      <link rel='apple-touch-icon' href={siteIcon.src} />
    </Head>
  );
};
