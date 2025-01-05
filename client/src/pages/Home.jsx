import React from "react"
import styles from "./Home.module.css"

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <VideoBackground />
      {/* תוכן נוסף של דף הבית */}
    </div>
  )
}

export default Home

const VideoBackground = () => {
  return (
    <div className={styles.videoContainer}>
      <video autoPlay muted loop playsInline className={styles.videoBackground}>
        <source src="https://videocdn.cdnpk.net/videos/27b481b9-a546-5d48-8c9d-a0d1dcb363b1/horizontal/previews/watermarked/large.mp4" type="video/mp4" />
        הדפדפן שלך לא תומך בתגית וידאו.
      </video>
      {/* שכבת כהות אופציונלית מעל הוידאו */}
      <div className={styles.overlay}></div>
    </div>
  )
}
