function SearchBtn({ query, onChange }) {
  return (
    <input
      className="lg:w-1/4 md:w-1/2 w-1/2 p-2 bg-transparent border font-semibold"
      type="text"
      placeholder="Search courses....."
      onChange={onChange}
      value={query}
    />
  );
}

export default SearchBtn;
