import { useRouter } from 'next/router';
import Link from 'next/link';
import { siteMeta } from '@/libs/siteMeta';
import style from '@/styles/breadcrumbs.module.css';

const { blogTitle } = siteMeta;

type BreadcrumbItem = {
  label: string;
  href: string;
};

type Props = {
  pageTitle: string;
};

export const Breadcrumbs = ({ pageTitle }: Props) => {
  const router = useRouter();
  const { asPath } = router;

  // パンくずリストのアイテムの配列を定義
  const breadcrumbs: BreadcrumbItem[] = [{ label: 'HOME', href: '/' }];

  // 現在のページに対応するパンくずリストのアイテムを追加
  if (asPath === '/blog' || asPath.startsWith('/blog?')) {
    breadcrumbs.push({ label: blogTitle, href: '/blog' });
  } else if (asPath.startsWith('/blog')) {
    breadcrumbs.push({ label: blogTitle, href: '/#works' }, { label: pageTitle, href: asPath });
  } else if (asPath && asPath !== '/') {
    breadcrumbs.push({ label: pageTitle, href: asPath });
  }

  return (
    <>
      <nav className={style.breadcrumbs}>
        <ul>
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={index}>
              {index !== breadcrumbs.length - 1 ? (
                <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
              ) : (
                <span>{breadcrumb.label}</span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
