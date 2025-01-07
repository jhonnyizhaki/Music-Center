import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styles from "./Home.module.css"
import axios from "axios"
import urls from "../constant/URLS"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const Home = () => {
  const [popularInstruments, setPopularInstruments] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const response = await axios.get(urls.INSTRUMENTS)
        setPopularInstruments(response.data.slice(0, 9)) // לוקח 9 מכשירים
      } catch (error) {
        console.error("Error fetching instruments:", error)
      }
    }

    fetchInstruments()
  }, [])

  // גלילה אוטומטית - רק אם יש כלים
  useEffect(() => {
    if (popularInstruments.length === 0) return

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
                      <p>{instrument.category}</p>
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
          <Link to="/practiceRoomBooking" className={styles.practiceRoomButton}>
            Book Practice Room
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
