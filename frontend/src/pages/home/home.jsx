//IT21013300
import CarouselHome from "../../components/Carousel/CarouselHome";
import LuggageCard from "../../components/Cards/LuggageCard";
import BlogCard from "../../components/Cards/Blogs";
import RestingCard from "../../components/Cards/RestingLocations";
import ParkingCard from "../../components/Cards/Parking";

function Home() {
  return (
    <div className="filters-container d-flex justify-content-center pt-4 pb-4">
      <table width="95%" height="80%">
        <tbody>
          <tr>
            <td>
              <CarouselHome />
            </td>
          </tr>
          <tr>
            <td style={{ paddingBottom: "20px" }}>
              <LuggageCard />
            </td>
          </tr>
          <tr>
            <td style={{ paddingBottom: "20px" }}>
              <BlogCard />
            </td>
          </tr>
          <tr>
            <td style={{ paddingBottom: "20px" }}>
              <RestingCard />
            </td>
          </tr>
          <tr>
            <td>
              <ParkingCard />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Home;
