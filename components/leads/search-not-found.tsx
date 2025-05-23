interface SearchNotFoundProps {
  searchQuery: string | null;
}
export const SearchNotFound = ({ searchQuery }: SearchNotFoundProps) => {
  return (
    <div className="text-center py-12">
      <h3 className="mt-2 text-sm font-medium text-gray-900">No leads found</h3>
      <p className="mt-1 text-sm text-gray-500">
        {searchQuery
          ? "Try a different search term."
          : "There are no leads matching your filters."}
      </p>
    </div>
  );
};
