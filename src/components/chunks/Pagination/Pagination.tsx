'use client';

import React from 'react';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import ArrowLeft from '../../../../public/icons/arrowMobileLeft.svg';
import ArrowRight from '../../../../public/icons/arrowMobileRight.svg';
import styles from './Pagination.module.scss';

interface PaginationProps {
  pages: number;
  active: number;
}

const Pagination: React.FC<PaginationProps> = ({ pages, active }) => {
  const maxDisplayPages = 5;
  const router = useRouter();

  const handlePageClick = (page: number) => {
    router.push(`/read${page > 1 ? `/page/${page}` : ''}`);
  };

  const handleNextClick = () => {
    if (active < pages) {
      const nextPage = active + 1;
      handlePageClick(nextPage);
    }
  };

  const handlePrevClick = () => {
    if (active > 1) {
      const prevPage = active - 1;
      handlePageClick(prevPage);
    }
  };

  const getPageNumbers = () => {
    if (pages <= maxDisplayPages) {
      return Array.from({ length: pages }, (_, i) => i + 1);
    }

    const pageNumbers: (number | 'ellipsis')[] = [1, 2, 3];

    if (active > 4) {
      pageNumbers.push('ellipsis');
    }

    for (let i = Math.max(4, active - 1); i < Math.min(active + 2, pages - 2); i += 1) {
      pageNumbers.push(i);
    }

    if (active < pages - 4) {
      pageNumbers.push('ellipsis');
    }

    pageNumbers.push(pages - 2, pages - 1, pages);

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={styles.pagination}>
      {active > 1 ? (
        <>
          <button
            type="button"
            className={`${styles.textButton} ${styles.button}`}
            onClick={handlePrevClick}
          >
            Previous
          </button>
          <ArrowLeft onClick={handlePrevClick} className={styles.arrow} />
        </>
      ) : (
        <div />
      )}
      <div>
        <ul>
          {pageNumbers.map((page) => (
            <li key={`${page}`}>
              {page === 'ellipsis' ? (
                <span className={styles.ellipsis}>&hellip;</span>
              ) : (
                <button
                  type="button"
                  className={cn(styles.textButton, styles.fixed, {
                    [styles.active]: page === active,
                  })}
                  onClick={() => handlePageClick(page as number)}
                >
                  {page}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {active < pages ? (
        <>
          <button
            type="button"
            className={`${styles.textButton} ${styles.button}`}
            onClick={handleNextClick}
          >
            Next
          </button>
          <ArrowRight onClick={handleNextClick} className={styles.arrow} />
        </>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Pagination;
