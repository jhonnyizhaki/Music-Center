import React from "react"
import About from "../pages/About"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="footer">
       <Link
                  to="/interactive-map"
                  className="about"
                >
                Map
                </Link>
       
      <p>&copy; 2024 Center Music. All rights reserved.</p>
      <Link
                  to="/about"
                  className="about"
                >
                 About
                </Link>
                <Link  
                  to="/contact"
                  className="contact"
                >
                 Contact
                </Link>

      <div className="location-links">
        <a
          
          href="https://www.google.com/maps/dir//Zvi+Nishri+St+6,+Tel+Aviv-Jaffa/@32.0545122,34.799405,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x151d4b11fe5cba8d:0x1b88d791c225c967!2m2!1d34.8019799!2d32.0545077?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
        >
          <img src="/google-maps.png" alt="Google Maps" className="nav-icon" />
        </a>
        <a
          href="https://www.waze.com/he/live-map/directions/%D7%AA%D7%9C-%D7%90%D7%91%D7%99%D7%91-%D7%99%D7%A4%D7%95?to=place.ws.il.20659.6"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/waze.png" alt="Waze" className="nav-icon" />
        </a>
        <a
          href="https://moovitapp.com/israel-1/poi/%D7%A6%D7%91%D7%99%20%D7%A0%D7%A9%D7%A8%D7%99%206/t/he?customerId=4908&ref=9&af_sub8=%2Findex%2Fhe%2F%25D7%25AA%25D7%2597%25D7%2591%25D7%2595%25D7%25A8%25D7%2594_%25D7%25A6%25D7%2599%25D7%2591%25D7%2595%25D7%25A8%25D7%2599%25D7%25AA-%25D7%259E%25D7%25A1%25D7%259C%25D7%2595%25D7%259C-Israel-city_880-1&af_sub9=Search%20bar%20button&poiType=City&tll=32.054471_34.801822&metroSeoName=Israel"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/moovit.png" alt="Moovit" className="nav-icon" />
        </a>
      </div>
    </footer>
  )
}

export default Footer
