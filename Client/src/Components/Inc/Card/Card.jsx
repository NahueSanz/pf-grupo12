import style from "./Card.module.css"
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
function CardComponent({id,image,country,description,startDate,endDate,price}) {
  return (
    <Card className={style.card} style={{ width: '20vw', height: '25vw' }}>
      <Card.Img className={style.img} variant="top" src={image} />
      <Card.Body className={style.cardBody}>
          <div className={style.contanerTittle}>
          <Link className={style.link} to={`/rooms/${id}`} >
          <h5>{country}</h5>
          </Link>
          <span>☆ 4,55</span>
          </div>
    
            <p>{description}</p>
            <p>Availiabe from {startDate} to {endDate}</p>
            <h6>${price} USD night</h6>
   
      </Card.Body>
    </Card>
  );
}

export default CardComponent;