//IT21013300
import { Carousel } from 'react-bootstrap'
import "../../CSS/carouselhome.css"
function CarouselHome() {
  return (
    <div>
        <Carousel>
        <Carousel.Item>
          <img
            className="custom-carousel"
            src="https://globetrender.com/wp-content/uploads/2019/11/FY20_ProBLK_GymBag-e1573494506979.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>MallSage</h3>
            <p>Mall's Choice🌍</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="custom-carousel"
            src="https://cdn.vox-cdn.com/thumbor/okY54qvEzKcEa2RpTNu84xArEFI=/0x0:5464x3640/1200x675/filters:focal(2295x1383:3169x2257)/cdn.vox-cdn.com/uploads/chorus_image/image/72262173/GettyImages_1354859135__1_.0.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>MallSage</h3>
            <p>Mall's Choice🌍</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="custom-carousel"
            src="https://images04.nicepage.com/feature/583347/blog-category.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>MallSage</h3>
            <p>Mall's Choice🌍</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default CarouselHome
