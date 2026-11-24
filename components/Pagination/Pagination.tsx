
import ReactPaginate from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  if (pageCount <= 1) {
    return null;
  }

  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      previousLabel="←"
      nextLabel="→"
      breakLabel="..."
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      containerClassName={css.pagination}
      pageClassName={css.page}
      pageLinkClassName={css.pageLink}
      activeClassName={css.active}
      previousClassName={css.arrow}
      nextClassName={css.arrow}
      disabledClassName={css.disabled}
      breakClassName={css.break}
    />
  );
}
