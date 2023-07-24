import Card from 'react-bootstrap/Card';
import style from './Comentarios.module.css'

function Comentarios({user, review, score}) {
  return (
    <Card style={{ width: '18rem' }} className={style.container}>
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <Card.Text >
        
       
          <h5>{user.name} {user.lastname}</h5>
     
          <h3>{score}</h3>
          <p>{review}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Comentarios;