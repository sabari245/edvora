import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "./card";
import Navbar from "./navbar";
import Pages from "./pages";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [ride, setRide] = useState({ home: [], upcoming: [], past: [] });
  const [data, setData] = useState(null);
  const [locality, setLocality] = useState(null);

  // this function will sort the data, split it into 3 arrays based on the date and save it
  function organizer(data) {
    data = data.map((each) => {
      return {
        ...each,
        distance: Math.abs(
          user.station_code -
            each.station_path.reduce(function (prev, curr) {
              return Math.abs(curr - user.station_code) <
                Math.abs(prev - user.station_code)
                ? curr
                : prev;
            })
        ),
      };
    });

    data.sort((a, b) => a.distance - b.distance);

    function datesCompare(date1, date2) {
      date1 = new Date(date1);
      date2 = new Date(date2);

      date1.setHours(0, 0, 0, 0);
      date2.setHours(0, 0, 0, 0);

      if (date1 > date2) {
        return 1;
      } else if (date1 < date2) {
        return -1;
      } else if (date1 == date2) {
        console.log("equal");
        return 0;
      }
    }

    let today = new Date();
    // filter everything that is today
    let todayRides = data.filter((each) => {
      return datesCompare(each.date, today) == 0;
    });

    // filter everything that is in the future
    let futureRides = data.filter((each) => {
      return datesCompare(each.date, today) == 1;
    });

    // filter everything that is in the past
    let pastRides = data.filter((each) => {
      return datesCompare(each.date, today) == -1;
    });

    setRide({
      home: todayRides,
      upcoming: futureRides,
      past: pastRides,
    });
  }

  // this function will make a object with state (as key) and city (as value (array ))
  function getStatesAndCity(data) {
    let state_and_city = {};
    data.forEach((each) => {
      if (state_and_city[each.state] === undefined) {
        state_and_city[each.state] = [];
      }
      state_and_city[each.state].push(each.city);
    });
    return state_and_city;
  }

  useEffect(() => {
    if (user) {
      fetch("https://assessment.api.vweb.app/rides").then((res) => {
        res.json().then((data) => {
          setData(data);
          organizer(data);
          setLocality(getStatesAndCity(data));
        });
      });
    }
  }, [user]);

  useEffect(() => {
    if (!router.query.page) {
      router.push("/?page=home", undefined, { shallow: true });
    }
  }, [router.query.page]);

  return (
    <div className="bg-body h-screen w-screen">
      <Navbar setUser={setUser} user={user} />
      <Pages router={router} locality={locality} />
      <div className="scrollable card-area-height">
        {ride &&
          router.query.page &&
          ride[router.query.page].map((each) => {
            return <Card key={each.id} data={each} user={user} />;
          })}
        {ride[router.query.page].length == 0 && (
          <div className="flex justify-center items-center w-full text-2xl inter h-full text-nav-link">
            <div className="text-center">No rides to show</div>
          </div>
        )}
      </div>
    </div>
  );
}
