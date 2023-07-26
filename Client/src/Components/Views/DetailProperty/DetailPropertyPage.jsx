// import './PropertyPage.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertyDetail } from '../../../redux/actions';
import Carousel from '../../Inc/Carousel/CarouselPropertyPage';
import Container  from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import FavoritesAddNotification from '../../Inc/ModalPropertypage/ModalProperty';
import profilePicGuess from '../../../images/guessProfilePic.webp';
import ReviewsPanel from '../../Inc/ReviewsPanel/ReviewsPanel'
import PanelComentarios from '../../Inc/PanelComentarios/PanelComentarios'
import style from './PropertyPage.module.css'
import { Link } from "react-router-dom";
import DropdownProperty from '../../Inc/DropDownPropertyDetail/Dropdown';

function calcularPromedio(arr) {
  if (arr.length === 0) return 0;
  
  const suma = arr.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
  const promedio = suma / arr.length;
  return Number(promedio.toFixed(1));
}


function DetailPropertyPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const property = useSelector((state) => state.propertyDetail);
  const currentUserID = useSelector(state => state.id);
  const reviews = useSelector((state) => state.review);
  const arrScore = reviews.map(el => el.score);
  
  // Filtrar los scores solo cuando el correspondiente enabled sea true
  const arrEnabled = reviews.map(el => el.enabled);
  const enabledScoresArray = arrScore.filter((score, index) => arrEnabled[index]);

  // Calcular el promedio solo para los scores habilitados
  const promedio = calcularPromedio(enabledScoresArray);
  const owner = property.User?.name;
  const ownerImage = property.User?.image || profilePicGuess;
  const ownerId = property.User?.id
  const ownerLanguage = property.User?.language;
  const ownerDescription = property.User?.description;
  const [ currentUserIsOwner, setCurrentUserIsOwner ] = useState(false);



  useEffect(() => {
    if(currentUserID === ownerId) {
      setCurrentUserIsOwner(true);
    }else {
      setCurrentUserIsOwner(false);
    }
  }, [currentUserID, ownerId]);


  useEffect(() => {
    async function getPropertyData(id) {
      try {
        const data = getPropertyDetail(id);
        dispatch(data);
      } catch (error) {
        console.log(error);
      }
    }

    getPropertyData(id);
  }, [dispatch, id]);

    return (
        <Container className={`${style.container} container-fluid container pt-5`}>
          <Row>
            <Col className='col-12 d-flex justify-content-end'> 
              {currentUserIsOwner ? <DropdownProperty/> : null }
            </Col>
            <Col className='p-3 col-12'>
              <Carousel image={property.image}/>
            </Col>
            <Col className='mx-1 text-start col-12'>
              <div className="d-flex align-items-center">
                <p><span className="mr-2 fw-bolder">${property.price} USD</span> night  │ </p>
                <p className='d-inline-flex align-items-center'>
                  <small className='fw-normal'>{property.guests} guests │ </small>
                  <i class="bi bi-star-fill"></i> <span className="ms-1">{promedio}</span>
                </p>
              </div>
            </Col>
            <Col className='d-inline-flex text-start col-12'>
                  <h2 className='fw-bold text-uppercase mt-2'>{property.title}</h2> { !currentUserIsOwner ? <FavoritesAddNotification title={property.title} image={property.image}/> : "" }
            </Col>
            <Col className='d-inline-flex text-start col-12 mt-3 mx-auto'>
                  <h6>{property.type} hosted by <a href="#owner" className='link-danger link-offset-1'>{owner}</a></h6>
            </Col>
            <Col className='text-start mt-3 col-12'>
              <p className='d-inline-flex align-items-center' style={{ cursor: 'pointer'}}>
                <i class="bi bi-geo-alt-fill"/><a href="#" className='link-dark link-offset-2'>{`${property.address}, ${property.country}`}</a>
              </p>
            </Col>
            
            <Col className='p-3 mb-5 rounded' sm={12} md={12} lg={12}>
                  <hr className='mb-4 border-top border-secondary' style={{ width: "100%" }} />
                  <h3 className='fw-semibold mb-4'>About this space</h3>
                  <p className='lh-sm mt-4 paragraph mb-4'>
                      { property.description?.length > 475 ? property.description.slice(0, 475).concat('...') : property.description }
                  </p>
                  { property.description?.length > 475 && <ReadMore description={property.description} /> }
              </Col>
              <Col className='p-3 mb-5 rounded text-start col-12'>
                <hr className='mb-4 border-top border-secondary' style={{ width: "100%" }} />
                <div className="d-flex align-items-center">
                  <img src={ownerImage} className='rounded-circle img-fluid profileImage' alt="User picture" style={{ width: "60px", marginRight: "10px", height: '50px' }} />
                  <div>
                    <h4 className='fw-semibold my-4'>Hosted by {owner}</h4>
                  </div>
                </div>
                <Col className='d-flex align-items-center text-start'>
                <span className="me-2"> <i class="bi bi-star-fill"></i> 23 reviews  </span> 
                {ownerLanguage && <span className='ms-2'>  <i class="bi bi-globe-americas"/> Languages: {ownerLanguage} </span>}
                </Col>
                  <p className='lh-sm mt-4 paragraph mb-4'>
                      { ownerDescription?.length > 475 ? ownerDescription.slice(0, 475).concat('...') : ownerDescription }
                  </p>
                  { ownerDescription?.length > 475 && <ReadMore description={ ownerDescription } /> } 
                  { currentUserIsOwner ? <div className='d-flex justify-content-end'> <Button className='btn-dark' href='/Miperfilform'>Edit profile</Button></div> : <div className='d-flex justify-content-end'> <Button className='btn-dark'>Contact Host</Button> </div> }
              </Col>
            <Row className={`${style.reserveSm} reserve-sm  shadow bg-body rounded mx-auto border border-white`}>
                <Col className='col-12 text-start'>
                  <small>${property.price}USD night</small>
                  <div className='mt-1'>
                    <input type="date" className=' rounded border border-light'/>
                  </div>
                 <div className='d-flex justify-content-end'>
                  <Button className='btn-danger btn-sm mb-2 ms-2'>Reserve</Button>
                 </div>
                </Col>
            </Row>
          </Row>
          {
            !currentUserIsOwner 
            ? <>
              <Row className={`${style.owner} owner ms-2 shadow rounded w-50 pt-3`}>
                <Col className='text-center'>
                <small className='fw-semibold'>CHECK-IN</small>
                <input type="date" className='rounded mb-4 mx-2 border border-secondary' placeholder='check-in'/>
                <small className='fw-semibold'>CHECKOUT</small> 
                <input type="date" className='rounded mb-4 mx-2 border border-secondary' placeholder='check-in'/>
                <Button className='btn-danger btn-sm my-2 mx-2' as={Link} to="/payment">Reserve</Button>
                  </Col>
                </Row>
                <ReviewsPanel idCasa={id}/>
              </>
              : null
          }
          <PanelComentarios idCasa={id}/>
        </Container>
      );
}

export default DetailPropertyPage;
