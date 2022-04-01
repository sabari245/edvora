import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faFilter,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const Dropdown = ({ name, options, callback }) => {
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
        <div
          className="rounded-lg shadow-md bg-filter-dropdown z-10 scrollable cursor-default overflow-y-auto"
          style={{ maxHeight: "10rem" }}
        >
          {options.map((option, index) => {
            return (
              <div
                key={index}
                className="px-3 py-1 hover:bg-card-city cursor-pointer"
                onClick={() => {
                  callback(option);
                  setOpen(false);
                }}
              >
                {option}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Pages = ({ router, locality, filters, setFilters, ride }) => {
  const [FilterOpen, setFilterOpen] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // this will move to the next pages
  function pushPage(path) {
    router.push("/?page=" + path, undefined, { shallow: true });
  }

  // gets all the states and cities from the locality
  useEffect(() => {
    if (locality) {
      for (let key in locality) {
        states.push(key);
        cities.push(...locality[key]);
      }
      setStates(states);
      setCities(cities);
    }
  }, [locality]);

  // this will filter the states and cities based on the filters
  useEffect(() => {
    if (locality) {
      let no_of_states = 0;
      // get the count of states in the filters
      for (let each of filters) {
        if (states.includes(each)) {
          no_of_states += 1;
        }
      }
      if (no_of_states == 0) {
        for (let key in locality) {
          states.push(key);
          cities.push(...locality[key]);
        }
        setStates(states);
        setCities(cities);
      } else {
        let new_cities = [];
        for (let each of filters) {
          if (locality[each] !== undefined) {
            console.log(new_cities);
            new_cities.push(...locality[each]);
          }
        }
        setCities(new_cities);
      }
    }
  }, [filters, locality]);

  function filterHandler(filter) {
    if (!filters.includes(filter)) {
      setFilters((prev) => {
        return [...prev, filter];
      });
    }
  }

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
          Nearest Rides {`( ${ride.home.length} )`}
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
          Upcoming Rides {`( ${ride.upcoming.length} )`}
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
          Past Rides {`( ${ride.past.length} )`}
        </div>
      </div>
      <div className="flex justify-end items-center">
        <div
          className="flex justify-end items-center scrollable overflow-x-auto cursor-pointer"
          style={{ maxWidth: "40vw" }}
        >
          {filters.length > 0 &&
            filters.map((filter, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-center items-center px-3 py-2 inter font-medium text-white bg-card-city mr-3 rounded-full"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {filter}{" "}
                  <FontAwesomeIcon
                    className="ml-2 cursor-pointer"
                    icon={faTimesCircle}
                    onClick={() => {
                      setFilters(filters.filter((item) => item !== filter));
                    }}
                  />
                </div>
              );
            })}
        </div>
        <div className="relative font-medium text-filters">
          <div
            className="cursor-pointer"
            onClick={() => setFilterOpen((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faFilter} className="mr-2" /> Filter{" "}
          </div>
          {FilterOpen && (
            <div className="absolute rounded-lg shadow-md px-6 pt-6 pb-3 bg-filter-div top-8 right-0 w-48">
              <div className="sfpro font-light text-[#A5A5A5] filter_underline mb-5">
                Filters
              </div>
              <Dropdown
                name="state"
                options={states}
                callback={filterHandler}
              />
              <Dropdown name="city" options={cities} callback={filterHandler} />
              {/* <Dropdown /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pages;
