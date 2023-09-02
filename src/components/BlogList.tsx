import { Post } from '@/types/blog';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import NoImage from '@/images/no-image.png';
import style from '@/styles/blogList.module.css';
import AdditionalPost from './AdditionalPost';

type Props = {
  posts: Post[];
  column: number;
};

export const BlogList: React.FC<Props> = ({ posts, column }) => {
  return (
    <>
      <div className={column === 2 ? style.twoColumnBlogList : style.blogList}>
        {posts.map((post) => (
          <div key={post.id}>
            <Link href={`/blog/${post.id}`}>
              {post.eyecatch ? (
                <Image src={post.eyecatch.url} width='800' height='600' alt={post.title} priority />
              ) : (
                <Image src={NoImage.src} width='800' height='600' alt={post.title} />
              )}
              <h2>{post.title}</h2>
              <div className={style.rolesAndOutputs}>
                {post.roles
                  ? post.roles.map((role, index) => (
                      <span className={style.role} key={index}>
                        {role}
                      </span>
                    ))
                  : null}
                {post.outputs
                  ? post.outputs.map((output, index) => (
                      <span className={style.output} key={index}>
                        {output}
                      </span>
                    ))
                  : null}
              </div>
            </Link>
          </div>
        ))}
        <AdditionalPost />
      </div>
    </>
  );
};
