import React from 'react';
import ReactPaginate from 'react-paginate';

type Props = {
  pageCount: number;
  onPageChange: (data: { selected: number }) => void;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const Pagination = ({ pageCount, onPageChange }: Props) => {
  return (
    <>
      <ReactPaginate
        previousLabel={'＜'} // 前のページボタン
        nextLabel={'＞'} // 次のページボタン
        pageCount={pageCount} // ページ総数
        onPageChange={onPageChange} // クリック時のfunction
        onClick={scrollToTop}
        containerClassName={'pagination'} // ページネーションであるulに付くクラス名
        activeClassName={'active'} // アクティブなページのliに着くクラス名
        disableInitialCallback={true}
      />

      <style jsx global>{`
        .pagination {
          margin: 100px 0 0 0;
        }

        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
          gap: 10px;
        }

        .pagination li {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 20px;
        }

        .pagination li.active {
          background: var(--accent-bg);
        }

        .pagination li.active a,
        .pagination li.disabled a {
          color: var(--white);
          font-weight: normal;
        }

        .pagination li.disabled a {
          visibility: hidden;
        }

        .pagination li a {
          font-size: 1.4rem;
          cursor: pointer;
          color: var(--accent);
        }
      `}</style>
    </>
  );
};
