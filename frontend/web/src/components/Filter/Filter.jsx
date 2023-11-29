import React, { useState } from "react";
import "./Filter.css";
import { MdArrowDropDown } from "react-icons/md";

function FilterOption({
  value,
  description,
  selectedOptions,
  handleCheckboxChange,
}) {
  return (
    <div className="filter-option">
      <input
        type="checkbox"
        id={value}
        name={value}
        checked={selectedOptions[value] || false}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={value}>{description}</label>
    </div>
  );
}

export default function Filter({
  title,
  options,
  selectedOptions,
  handleCheckboxChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="filter">
      <div className="title">
        <MdArrowDropDown className="icon" />
        <h3 onClick={toggleDropdown}>{title}</h3>
      </div>
      <div className="filter-options">
        {isOpen &&
          options.map((option) => (
            <FilterOption
              value={option.value}
              description={option.description}
              selectedOptions={selectedOptions}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))}
      </div>
    </div>
  );
}
