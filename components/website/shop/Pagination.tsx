interface PaginationProps {
  currentPage: number;
  totalPages: number;
}
export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        className="rounded-lg border px-4 py-2 disabled:opacity-50"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;
        return (
          <button
            className={`h-10 w-10 rounded-lg border ${currentPage === page ? "bg-black text-white" : "bg-white hover:bg-gray-100"}`}
            key={page}
          >
            {page}
          </button>
        );
      })}
      <button
        className="rounded-lg border px-4 py-2 disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
