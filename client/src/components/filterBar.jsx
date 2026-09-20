function FilterBar({ category, setCategory }) {
  return (
    <div className="filter-bar">
      <button onClick={() => setCategory("All")}>All</button>
      <button onClick={() => setCategory("Technical")}>Technical</button>
      <button onClick={() => setCategory("Cultural")}>Cultural</button>
      <button onClick={() => setCategory("Sports")}>Sports</button>
      <button onClick={() => setCategory("Workshop")}>Workshop</button>
    </div>
  )
}

export default FilterBar