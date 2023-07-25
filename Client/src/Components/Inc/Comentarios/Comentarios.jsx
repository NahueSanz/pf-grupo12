import React from 'react';
import Card from 'react-bootstrap/Card';
import StarRatings from 'react-star-ratings';
import style from './Comentarios.module.css';

function Comentarios({ user, review, score }) {
  console.log(user)
  const defaultImage= "data:image/jpeg;base64,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"
  return (

    <Card className={style.container}>

      <Card.Body>
        {/* <Card.Title>Reviews</Card.Title> */}
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <Card.Text className={style.containerText}>
         
            <div className={style.containerName}>
              <div className={style.containerImg} >
                <img 
                className={style.img} 
                src={user?.image || defaultImage} 
                alt="" 
                />
              </div>

              <div className={style.containerName2}>
                <h5 className={style.userName}>{user?.name} {user?.lastname}</h5>
                <StarRatings
                  rating={score}
                  starDimension="18px"
                  starSpacing="1px"
                  starRatedColor="gold"
                  starEmptyColor="lightgray"
                  className={style.rating}
                />
              </div>

            </div>



            <p className={style.review}>{review}</p>
       
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Comentarios;
