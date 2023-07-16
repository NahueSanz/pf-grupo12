// import './PropertyPage.css'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertyDetail } from '../../../redux/actions';
import starIcon from '../../../assets/star.svg'
import Carousel from '../../Inc/Carousel/CarouselPropertyPage';
import Container  from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import FavoritesAddNotification from '../../Inc/ModalPropertypage/ModalProperty';
import locationIcon from '../../../assets/locationIcon.svg';
import profilePicGuess from '../../../images/guessProfilePic.webp';
import languageIcon from '../../../assets/languageIcon.svg';
import style from './PropertyPage.module.css'

function DetailPropertyPage() {
    
    const { id } = useParams();
    const dispatch = useDispatch();
    const property = useSelector(state => state.propertyDetail);

    const owner = property.User?.name
    const ownerImage = property.User?.image || profilePicGuess;
    const ownerLanguage = property.User?.language;
    const ownerDescription = property.User?.description;


    useEffect(() => {

      async function getPropertyData(id){
        try {
            const data = getPropertyDetail(id);
            dispatch(data)
        } catch (error) {
            console.log(error);
        }
    }
    
      getPropertyData(id);
    }, [ dispatch, id]);
 

    return (
        <Container className={`${style.container} container-fluid container pt-md-5`}>
          <Row>
            <Col className='p-3 col-12'>
              <Carousel image={property.image}/>
            </Col>
            <Col className='mx-1 text-start col-12'>
              <div className="d-flex align-items-center">
                <p><span className="mr-2 fw-bolder">${property.price} USD</span> night  │ </p>
                <p className='d-inline-flex align-items-center'>
                  <small className='fw-normal'>{property.guests} guests │ </small>
                  <img className='d-inline' style={{ height: "22px" }} src={starIcon} alt="Star icon"/>
                  <span className="ms-1">4,97</span>
                </p>
              </div>
            </Col>
            <Col className='d-inline-flex text-start col-12'>
                  <h2 className='fw-bold text-uppercase mt-2'>{property.title}</h2> <FavoritesAddNotification title={property.title} image={property.image}/>
            </Col>
            <Col className='d-inline-flex text-start col-12 mt-3 mx-auto'>
                  <h6>{property.type} hosted by <a href="#owner" className='link-danger link-offset-1'>{owner}</a></h6>
            </Col>
            <Col className='text-start mt-3 col-12'>
              <p className='d-inline-flex align-items-center' style={{ cursor: 'pointer'}}>
                <img className='d-inline' style={{ height: "22px" }} src={locationIcon} alt="Location icon"/>
                <a href="#" className='link-dark link-offset-2'>{`${property.address}, ${property.country}`}</a>
              </p>
            </Col>
            <Col className='p-3 mb-auto rounded text-start sm-text-center' sm={12} md={12} lg={12}>
                  <hr className='mb-4 border-top border-secondary' style={{ width: "100%" }} />
                  <h3 className='fw-semibold mb-4 mx-2'>About this space</h3>
                  <p className='lh-sm mt-4 paragraph mb-4 mx-2'>
                      { property.description?.length > 475 ? property.description.slice(0, 475).concat('...') : property.description }
                  </p>
                  { property.description?.length > 475 && <ReadMore description={property.description} /> }
              </Col>
              <Col className='p-3 mb-5 rounded text-start col-12'>
                <hr className='mb-4 border-top border-secondary' style={{ width: "100%" }} />
                <div className="d-flex align-items-center">
                  <img src={ownerImage} className='rounded-circle img-fluid profileImage mx-2' alt="User picture" style={{ width: "60px", marginRight: "10px", height: '50px' }} />
                  <div>
                    <h4 className='fw-semibold my-4 mx-1'>Hosted by {owner}</h4>
                  </div>
                </div>
                <p className='d-inline-flex align-items-center mt-2'>
                  <img className='d-inline' style={{ height: "22px" }} src={starIcon} alt="Star icon"/>
                  <span className="ms-1">23 reviews <img className='ms-3' style={{ height: "22px" }} src={languageIcon} alt="Star icon"/> <span className=''>Languages: {ownerLanguage} </span> </span>
                </p>
                  <p className='lh-sm mt-4 paragraph mb-4'>
                      { ownerDescription?.length > 175 ? ownerDescription.slice(0, 475).concat('...') : ownerDescription }
                  </p>
                  { ownerDescription?.length > 175 && <ReadMore description={ ownerDescription } /> }
                  <div className='d-flex justify-content-end'>
                    <Button className='btn-dark'>Contact Host</Button>
                  </div>
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
          <Row className={`${style.owner} owner ms-2 shadow rounded w-50 pt-3 mt-3`}>
            <Col className='text-center'>
              <small className='fw-semibold'>CHECK-IN</small>
              <input type="date" className='rounded mb-4 mx-2 border border-secondary' placeholder='check-in'/>
              <small className='fw-semibold'>CHECKOUT</small> 
              <input type="date" className='rounded mb-4 mx-2 border border-secondary' placeholder='check-in'/>
              <Button className='btn-danger btn-sm my-2 mx-2'>Reserve</Button>
            </Col>
          </Row>
        </Container>
      );
}


export default DetailPropertyPage