import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumb';
import { Meta } from '@/components/Meta';
import { client } from '@/libs/client';
import { Page } from '@/types/page';
import style from '@/styles/post.module.css';

type Params = {
  id: string;
};

type Id = {
  id: string;
};

type Props = {
  page: Page;
};

// APIリクエストを行うパスを指定
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await client.get({ endpoint: 'page' });
  const paths = data.contents.map((content: Id) => `/${content.id}`);

  return { paths, fallback: false };
};

// microCMSへAPIリクエスト
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const id = context.params?.id;
  const data = await client.get({ endpoint: 'page', contentId: id });

  // custom Contentの文字列を全て結合
  let all_content: string = '';

  //カスタムフィールドの繰り返しの分だけ結合
  data.body.map((content: any) => {
    all_content += content.richEditor || '';
    all_content += content.html || '';
  });

  return {
    props: {
      page: {
        id: data.id,
        title: data.title,
        body: all_content,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        revisedAt: data.revisedAt,
        publishedAt: data.publishedAt,
      },
    },
  };
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ page }: Props) => {
  return (
    <>
      <Meta pageTitle={page.title} />
      <Breadcrumbs pageTitle={page.title} />
      <main>
        <h1 className={style.title}>{page.title}</h1>
        <div
          className={style.body}
          dangerouslySetInnerHTML={{
            __html: `${page.body}`,
          }}
        />
      </main>
    </>
  );
};

export default Page;
