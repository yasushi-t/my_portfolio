import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { client } from '@/libs/client';
import type { Post } from '@/types/blog';
import { Meta } from '@/components/Meta';
import { BlogList } from '@/components/BlogList';
import style from '@/styles/top.module.css';

type Props = {
  posts: Post[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await client.get({ endpoint: 'blog', queries: { limit: 20 } });

  return {
    props: {
      posts: posts.contents,
    },
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts }: Props) => {
  return (
    <>
      <Meta />
      <h1 id='works' className={style.topWorksTitle}>
        <span>WORKS</span>
      </h1>
      <BlogList column={1} posts={posts} />
    </>
  );
};

export default Home;
