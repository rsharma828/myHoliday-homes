import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LastestDestinationCard";

const Home = () => {
  const { data: hotels } = useQuery("fetchQuery", () =>
    apiClient.fetchHotels()
  );

  const { data: budgetHotels } = useQuery("fetchQuery", () =>
    apiClient.fetchHotelsBudget()
  );

  

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = budgetHotels || [];
  bottomRowHotels.map((hotel) => (
    console.log(hotel.adultCount)
  ));
  topRowHotels.map((hotel) => (
    console.log(hotel.lastUpdated)
  ))


  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent desinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
        <div>
          <h2 className="text-4xl font-bold pb-4">Featured</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
