import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumb';
import { Meta } from '@/components/Meta';
import { client } from '@/libs/client';
import { Post } from '@/types/blog';
import Link from 'next/link';
import style from '@/styles/post.module.css';
import Image from 'next/image';
import { DateFormat } from '@/components/dateFormat';

type Params = {
  id: string;
};

type Props = {
  post: Post;
  nextPost: Post;
  prevPost: Post;
};

// APIリクエストを行うパスを指定
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await client.get<{ contents: Post[] }>({ endpoint: 'blog', queries: { limit: 20 } });
  const paths = data.contents.map((content) => `/blog/${content.id}`);

  return { paths, fallback: false };
};

// microCMSへAPIリクエスト
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const id = context.params?.id;

  // 全てのブログ記事を取得
  const allPosts = await client.get({ endpoint: 'blog', queries: { limit: 20 } });
  const posts = allPosts.contents;

  // 現在の記事のインデックスを特定
  const currentIndex = posts.findIndex((post: Post) => post.id === id);

  // 前のページと次のページの記事を取得
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  // 現在の記事のデータを取得
  const data = posts.find((post: Post) => post.id === id);

  console.log(data);

  return {
    props: {
      post: data,
      nextPost,
      prevPost,
    },
  };
};

const replaceLinksInText = (text: string): string => {
  // 正規表現を使ってhttp://またはhttps://で始まるリンクを探す
  const regex = /(https?:\/\/\S+)/g;

  // リンクを<a>タグに置換して返す
  return text.replace(regex, (match, url) => {
    return `<a href="${url}" target="_blank">${url}</a>`;
  });
};

const Post: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
  nextPost,
  prevPost,
}: Props) => {
  return (
    <>
      <Meta
        pageTitle={post.title}
        pageDesc={post.overview}
        pageImg={post.eyecatch?.url || ''}
        pageImgWidth={post.eyecatch?.width}
        pageImgHeight={post.eyecatch?.height}
      />
      <Breadcrumbs pageTitle={post.title} />
      <main>
        <h1 className={style.title}>{post.title}</h1>
        {/* <p className={style.date}>
          <DateFormat dateString={post.publishedAt} />
        </p> */}
        <div className={style.workBody}>
          {post.eyecatch ? (
            <div className='eyecatch'>
              <Image src={post.eyecatch.url} width='1200' height='800' alt={post.title} priority />
            </div>
          ) : null}
          {post.overview ? (
            <p
              className='overview'
              dangerouslySetInnerHTML={{
                __html: `${post.overview.replaceAll('\n', '<br>')}`,
              }}
            />
          ) : null}
          {post.images && post.images.length > 0 && (
            <div className='images'>
              {post.images.map((image, index) => (
                <Image
                  key={index}
                  src={image.url}
                  width='1200'
                  height='800'
                  alt={post.title}
                  priority
                />
              ))}
            </div>
          )}
          <div className='details'>
            {post.comment ? (
              <p
                className='comment'
                dangerouslySetInnerHTML={{
                  __html: `${post.comment.replaceAll('\n', '<br>')}`,
                }}
              />
            ) : (
              <p className='commentNull'>{null}</p>
            )}
            {post.credit ? (
              <p
                className='credit'
                dangerouslySetInnerHTML={{
                  __html: `${replaceLinksInText(post.credit.replaceAll('\n', '<br>'))}`,
                }}
              />
            ) : (
              <p>{null}</p>
            )}
          </div>
        </div>
        <div className={style.prevNextLink}>
          {nextPost && <Link href={`/blog/${nextPost.id}`}>＜ PREVIOUS 「{nextPost.title}」</Link>}
          {prevPost && <Link href={`/blog/${prevPost.id}`}>NEXT 「{prevPost.title}」＞</Link>}
        </div>
      </main>
    </>
  );
};

export default Post;
