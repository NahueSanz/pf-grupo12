import style from '../../Views/Landing/landing.module.css';
import Col from 'react-bootstrap/Col';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import * as actions from "../../../redux/actions"

function LandingPropertiesItem(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { img, title } = props;

  function handleClick(event) {
    event.preventDefault();
    const valueSelected = event.currentTarget.getAttribute('value');

    dispatch(actions.applyFilters(valueSelected));
    navigate('/home');
  }

  return (
    <Col lg={3} md={3} sm={6} xs={6} className='g-2 d-flex justify-content-center align-items-center'>
        <div className={style.item} value={title} onClick={handleClick}>
          <img src={img} fluid/>
          <h6 className='text-light fw-bolder font-monospace fs-2'>{title}</h6>
          <div className={style.box}/>
        </div>
     </Col>
  );
}

export default LandingPropertiesItem;