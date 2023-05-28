import React, { useEffect, useRef, useState } from "react";

const Dropdown = ({ title, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (data) setItems(data);
  }, [data]);
  const ref = useRef();
  return (
    <>
      <div
        ref={ref}
        className={`filter-type platforms ${isOpen ? "open" : ""}`}
      >
        <div className="text" onClick={() => setIsOpen(!isOpen)}>
          <p>{title}</p>
          <p>
            {isOpen ? "Close" : "View All"}
            <span> {isOpen ? "" : ">"}</span>
          </p>
        </div>
        <div className="dropdown-menu">
          <div className="check-container">
            {items &&
              Array.from(items).map((filter, index) => (
                <div key={index} className="col-items">
                  <input
                    type="checkbox"
                    name={filter}
                    id={index} 
                    value={filter}
                    // onChange={checkedInput}
                    className={`${title}-checkbox`}
                  />
                  <label className="col-label" htmlFor={filter}>
                    {filter}
                  </label>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
