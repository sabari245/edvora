import { Rides, UserDetails } from "../pages/index";

const InfoPair = ({ name, value }) => {
  return (
    <div className="flex justify-start items-center my-1">
      <div className="text-card-text-gray">{name + " : "}</div>
      <div className="text-white">{value}</div>
    </div>
  );
};

const Card = ({ data, user }: { data: Rides; user: UserDetails }) => {
  return (
    <div className="flex justify-between items-start py-4 px-4 inter font-medium bg-card mx-8 mb-4 rounded-lg">
      <div className="flex justify-start items-center">
        <div className="mr-8">
          <img src={data.map_url} alt="map" />
        </div>
        <div>
          <InfoPair name="Ride Id" value={data.id} />
          <InfoPair name="Origin Station" value={data.origin_station_code} />
          <InfoPair name="Station Path" value={data.station_path.toString()} />
          <InfoPair name="Date" value={data.date} />
          <InfoPair
            name="Distance"
            value={Math.abs(
              user.station_code -
                data.station_path.reduce(function (prev, curr) {
                  return Math.abs(curr - user.station_code) <
                    Math.abs(prev - user.station_code)
                    ? curr
                    : prev;
                })
            )}
          />
        </div>
      </div>
      <div className="flex justify-between items-start h-16 px-8 inter">
        <div className="bg-card-city rounded-full px-4 py-2 text-white text-sm">
          {data.city}
        </div>
        <div className="bg-card-city rounded-full px-4 py-2 text-white text-sm">
          {data.state}
        </div>
      </div>
    </div>
  );
};

export default Card;
