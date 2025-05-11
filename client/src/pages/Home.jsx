import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import styles from "./Home.module.css"
import axios from "axios"
import urls from "../constant/URLS"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import Rating from '@mui/material/Rating';

const Home = () => {
  const [popularInstruments, setPopularInstruments] = useState([])
  const [instruments, setInstruments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0)
  const [page, setPage] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // שליפת המכשירים הכלליים
        const instrumentsResponse = await axios.get(urls.INSTRUMENTS);
        const instrumentsData = instrumentsResponse.data;

        // שליפת המכשירים הפופולריים
        const popularResponse = await axios.get(`${urls.BASE_URL}/popular-products`);
        const popularData = popularResponse.data;

        // התאמה בין פופולריים לכלים - מוסיף imageUrl
        const enrichedPopular = popularData.map(prod => {
          const match = instrumentsData.find(ins => ins._id === prod._id);
          return {
            ...prod,
            imageUrl: match?.imageUrl || null
          };
        });

        // רק עכשיו שמור לסטייט
        setInstruments(instrumentsData);
        setPopularInstruments(enrichedPopular);

      } catch (error) {
        console.error("Error fetching instruments or stats:", error);
      }
    };


    fetchData();
  }, []);


  // גלילה אוטומטית - רק אם יש כלים
  useEffect(() => {
    if (popularInstruments.length === 0) return

    console.log(popularInstruments);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 >= popularInstruments.length ? 0 : prevIndex + 1
      )
    }, 3000) // מחליף כל 3 שניות

    return () => clearInterval(interval)
  }, [popularInstruments.length])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= popularInstruments.length ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? popularInstruments.length - 1 : prevIndex - 1
    )
  }

  // מחשב אילו כלים להציג (3 כלים בכל פעם)
  const getVisibleInstruments = () => {
    if (popularInstruments.length === 0) return []

    const result = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % popularInstruments.length
      result.push(popularInstruments[index])
    }
    return result
  }

  const visibleInstruments = getVisibleInstruments()

  return (
    <div className={styles.homeContainer}>
      <div className={styles.videoContainer}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.videoBackground}
        >
          <source src="/bg1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className={styles.content}>
        <div className={styles.leftDiv}>
          <h1>"Find Your Sound, Master Your Art"</h1>
        </div>
        <div className={styles.rightDiv}>
          <h2 className={styles.instrumentsTitle}>Popular Instruments</h2>
          <div className={styles.instrumentsContainer}>
            <button
              className={styles.navButton}
              onClick={prevSlide}
              aria-label="Previous instruments"
            >
              <FaChevronLeft />
            </button>
            <div className={styles.instrumentsGrid}>
              {visibleInstruments.map(
                (instrument, index) =>
                  instrument && (
                    <div
                      key={`${currentIndex}-${index}`}
                      className={styles.instrumentCard}
                    >
                      <img src={instrument.imageUrl} alt={instrument.name} />
                      <h3>{instrument.name}</h3>
                      <p>{instrument.price}$</p>
                      <p>{instrument.sales} units sold</p>
                      <p>{<Rating name="half-rating" defaultValue={5} precision={0.5} size="small" />}</p>
                    </div>
                  )
              )}
            </div>
            <button
              className={styles.navButton}
              onClick={nextSlide}
              aria-label="Next instruments"
            >
              <FaChevronRight />
            </button>
          </div>
          <Link
            to="http://localhost:5173/practice-room-booking"
            className={styles.practiceRoomButton}
          >
            Book Practice Room
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
