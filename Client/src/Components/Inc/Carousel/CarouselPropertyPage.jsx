import './Carousel.css'
import Carousel from 'react-bootstrap/Carousel';
import FavoritesAddNotification from '../../Inc/ModalPropertypage/ModalProperty';
 

function CarouselPropertyPage({ image }) {
  
  const images =  [image] ?  [image] : [];

  return (
    <Carousel fade >
      {images && images.map((image, index) => (
        <Carousel.Item key={index}>
         <img
           className="d-block w-100 rounded custom-height"
           src={ image }
           alt={`Slide ${index}`}
         />
       </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselPropertyPage;