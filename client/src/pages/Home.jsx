import React from "react"
import styles from "./Home.module.css"
import urls from "../constant/URLS"

const Home = () => {
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
          <source src={urls.BACKGROUND_VIDEO} type="video/mp4" />
        </video>
        <div className={styles.overlay}></div>
      </div>
      {/* תוכן נוסף של דף הבית */}
    </div>
  )
}

export default Home
