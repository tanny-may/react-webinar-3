import { cn as bem } from "@bem-react/classname";
import { useMemo } from "react";
import { pageSize } from "../../const";
import "./style.css";

function Pagination({ totalCount, currentPage, onClick }) {
  const cn = bem("Pagination");

  let pages = usePagination(totalCount, pageSize, currentPage);

  return (
    <div className={cn()}>
      {pages.map((pageNumber, i) =>
        pageNumber !== DOTS ? (
          <button className={currentPage=== pageNumber ? cn("button-active"): cn("button")} key={i} onClick={() => onClick(pageNumber)}>
            {pageNumber}
          </button>
        ) : (
          <span className={cn("dots")}>{DOTS}</span>
        )
      )}
    </div>
  );
}

export default Pagination;

const DOTS = "...";

const usePagination = (totalCount, pageSize, currentPage) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = 6;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - 1, 1);
    const rightSiblingIndex = Math.min(currentPage + 1, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = currentPage <= 2 ? 3 : 4;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = currentPage >= totalPageCount - 1 ? 2 : 3;
      let rightRange = range(totalPageCount - rightItemCount, totalPageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, currentPage]);

  return paginationRange;
};

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};
