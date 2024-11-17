{/* Dropdown for categories */}
<div className="dropdown relative mt-2 dropdown-right mt-2">
{!isOtherSelected && (
  <>
    <div
      tabIndex={0}
      role="button"
      className="btn m-1"
    >
      Select Category
    </div>
    <ul
      tabIndex={0}
      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
    >
      {categories.map((category, index) => (
        <li key={index}>
          <a onClick={() => handleCategorySelect(category)}>
            {category}
          </a>
        </li>
      ))}
      <li>
        <a onClick={() => handleCategorySelect("Other")}>Other</a>
      </li>
    </ul>
  </>
)}

{/* Input for "Other" category */}
{isOtherSelected && (
  <div className="flex gap-2 mt-2">
    <input
      type="text"
      className="input input-bordered w-full"
      placeholder="Enter your category..."
      value={otherCategory}
      onChange={(e) => setOtherCategory(e.target.value)}
    />
    <button
      type="button"
      className="btn btn-primary"
      onClick={handleOtherSubmit}
    >
      Add
    </button>
  </div>
)}
</div>