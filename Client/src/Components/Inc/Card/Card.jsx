import axios from "axios";
import style from "./Card.module.css";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";



function calcularPromedio(arr) {
  if (arr.length === 0) return 0;
  
  const suma = arr.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
  const promedio = suma / arr.length;
  return promedio;
  
}

function CardComponent({
  id,
  image,
  country,
  description,
  startDate,
  endDate,
  price,
}) {
  const [promedio, setPromedio] = useState(0)
  
  async function getPromedioReviews(id){
    const res = await axios.get(`http://localhost:3001/user/property/${id}/review`)
    const arrScore= res.data.Reviews.map(el=>el.score)
    setPromedio(calcularPromedio(arrScore));
  }

  useEffect(()=> {
    getPromedioReviews(id)
  },[id])


  return (
    <Card className={style.card} style={{ width: "20vw", height: "25vw" }}>
      <Card.Img className={style.img} variant="top" src={image} />
      <Card.Body className={style.cardBody}>
        <div className={style.contanerTittle}>
          <Link className={style.link} to={`/rooms/${id}`}>
            <h5>{country}</h5>
          </Link>
          <span>☆ {promedio}</span>
        </div>

        <p>{description}</p>
        <p>
          Availiabe from {startDate} to {endDate}
        </p>
        <h6>${price} USD night</h6>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;
