import style from "./Card.module.css"
import Card from 'react-bootstrap/Card';

function CardComponent() {
  return (
    <Card className={style.card} style={{ width: '17rem', height: '25rem' }}>
      <Card.Img className={style.img} variant="top" src="https://t2.uc.ltmcdn.com/es/posts/6/1/1/como_reservar_una_habitacion_por_horas_en_un_hotel_de_lujo_18116_600.jpg" />
      <Card.Body className={style.cardBody}>
          <div className={style.contanerTittle}>
          <h5>Argentina</h5>
          <span>☆ 4,55</span>
          </div>
    
            <p>Con vista a la playa</p>
            <p>7 al 12 de jul</p>
            <h6>$123 USD noche</h6>
   
      </Card.Body>
    </Card>
  );
}

export default CardComponent;