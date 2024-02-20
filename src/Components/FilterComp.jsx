import React from "react";
import { useState } from "react";

const FilterComp = ({ searchMovie, sortHandler }) => {
  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid d-block">
          <div className="d-flex" role="search">
            <div className="section">
              
              <select
                name="form-select"
                className="me-3 mt-2 sort"
                onChange={sortHandler}
              >
                <option disabled selected value>
                  Sort By
                </option>
                <option>Episode</option>
                <option>Year</option>
              </select>
              
            </div>

            <input
              className="form-control"
              type="text"
              placeholder="Type to search"
              aria-label="text"
              onChange={searchMovie}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default FilterComp;
