import style from './landing.module.css'
import LandingNavBar from '../../Inc/LandingNavBar/landingNavbar';
import Hero from '../../Inc/HeroLanding/Hero';
import PropertiesLanding from '../../Inc/PropertiesLanding/PropertiesLanding';
import BecomeHostLanding from '../../Inc/BecomeHostLanding/becomeHostLanding';
import AboutUs from '../../Inc/AboutUs/AboutUs';


function LandingPage() {
    return(
        <div className={style.landing}>
            <LandingNavBar/>
            <Hero/>
            <PropertiesLanding/>
            <BecomeHostLanding/>
            <AboutUs/>
        </div>
    )
}



export default LandingPage;