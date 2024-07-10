export const calculatePageRange = (pages, currentPage) => {
  const totalPage = pages?.pagination?.totalPages;
  console.log(totalPage, "total pages");
  const maxVisiblePages = 5;

  let startPage = currentPage - Math.floor(maxVisiblePages / 2);
  startPage = Math.max(startPage, 1);

  let endPage = startPage + maxVisiblePages - 1;
  endPage = Math.min(endPage, totalPage);

  const remainingPages = maxVisiblePages - (endPage - startPage + 1);
  startPage = Math.max(startPage - remainingPages, 1);

  return { startPage, endPage };
};
