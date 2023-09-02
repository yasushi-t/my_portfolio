import { useEffect, useState } from 'react';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { client } from '@/libs/client';
import type { Post } from '@/types/blog';
import { Meta } from '@/components/Meta';
import { Breadcrumbs } from '@/components/Breadcrumb';
import { siteMeta } from '@/libs/siteMeta';
import { Pagination } from '@/components/Pagination';
import { BlogList } from '@/components/BlogList';
import Link from 'next/link';
import { useRouter } from 'next/router';
import style from '@/styles/layout.module.css';

const { blogTitle } = siteMeta;

type Props = {
  posts: Post[];
};

// microCMSへAPIリクエスト
export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await client.get<{ contents: Post[] }>({ endpoint: 'blog' });

  return {
    props: {
      posts: posts.contents,
    },
  };
};

const POSTS: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts }: Props) => {
  const router = useRouter();
  const { asPath } = router;
  const [selectedPosts, setSelectedPosts] = useState<Post[]>(posts);
  const [path, setPath] = useState(asPath);

  const [offset, setOffset] = useState(0); // 何番目の記事から表示するか
  const perPage = 2; // 1ページあたりに表示する記事数
  const handlePageChange = (data: { selected: number }) => {
    setOffset(data.selected * perPage);
  };
  const paginatedPosts = selectedPosts.slice(offset, offset + perPage);

  useEffect(() => {
    setOffset(0);
    setPath(asPath);
  }, [asPath]);

  return (
    <>
      <Meta pageTitle={blogTitle} />
      <Breadcrumbs pageTitle={blogTitle} />
      <div className={style.twoColumnsContainer}>
        <div className={style.columnMain}>
          <BlogList column={2} posts={paginatedPosts} />
        </div>
        <div className={style.columnSide}>
          {/* <h3 className={style.blogCategoryTitle}>カテゴリ一覧</h3>
          <ul>
            {tags.map((tag) => (
              <li key={tag.id}>
                <Link href={`/blog?tag=${tag.id}`}>{tag.tag}</Link>
              </li>
            ))}
          </ul> */}
        </div>
      </div>
      <Pagination
        key={path}
        pageCount={Math.ceil(selectedPosts.length / perPage)}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default POSTS;
