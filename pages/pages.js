import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const Dropdown = ({ name, options }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="sfpro relative rounded-lg shadow-md bg-filter-dropdown mb-3">
      <div
        className="flex justify-between px-3 items-center py-2"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        {name} <FontAwesomeIcon icon={faChevronDown} />
      </div>
      {open && (
        <div className="rounded-lg shadow-md bg-filter-dropdown z-10 h-40 scrollable cursor-default">
          {options.map((option) => {
            return <div className="px-3 py-1">{option}</div>;
          })}
        </div>
      )}
    </div>
  );
};

const Pages = ({ router, locality }) => {
  const [FilterOpen, setFilterOpen] = useState(true);
  const [filters, setFilters] = useState([]);

  const states = [];
  const cities = [];

  function pushPage(path) {
    router.push("/?page=" + path, undefined, { shallow: true });
  }

  useEffect(() => {
    for (let key in locality) {
      states.push(key);
      cities.push(...locality[key]);
    }
  }, [locality]);

  return (
    <div className="flex justify-between items-center h-16 px-8 inter">
      <div className="flex font-normal text-nav-link">
        <div
          onClick={() => {
            pushPage("home");
          }}
          className={
            "cursor-pointer mr-8" +
            (router.query.page === "home" ? " current-page" : "")
          }
        >
          Nearest Rides
        </div>
        <div
          onClick={() => {
            pushPage("upcoming");
          }}
          className={
            "cursor-pointer mr-8" +
            (router.query.page === "upcoming" ? " current-page" : "")
          }
        >
          Upcoming Rides
        </div>
        <div
          onClick={() => {
            pushPage("past");
          }}
          className={
            "cursor-pointer mr-8" +
            (router.query.page === "past" ? " current-page" : "")
          }
        >
          Past Rides
        </div>
      </div>
      <div className="relative font-medium text-filters">
        <FontAwesomeIcon icon={faFilter} className="mr-2" /> Filter
        {FilterOpen && (
          <div className="absolute rounded-lg shadow-md px-6 pt-6 pb-3 bg-filter-div top-8 right-0 w-48">
            <div className="sfpro font-light text-[#A5A5A5] filter_underline mb-5">
              Filters
            </div>
            <Dropdown name="state" options={states} />
            <Dropdown name="city" options={cities} />
            {/* <Dropdown /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pages;
