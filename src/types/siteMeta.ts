import { StaticImageData } from 'next/image';

export type SiteMeta = {
  siteLang: string;
  siteLocale: string;
  siteType: string;
  siteIcon: {
    src: string;
    height?: number;
    width?: number;
    blurWidth?: number;
    blurHeight?: number;
  };
  siteUrl: string;
  siteTitle: string;
  siteDescription: string;
  blogTitle: string;
};
