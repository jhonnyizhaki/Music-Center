import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import urls from "../constant/URLS"
import styles from "./PracticeRoomBooking.module.css"

const PracticeRoomBooking = () => {
  const { user } = useAuth()
  const [instruments, setInstruments] = useState([])
  const [bookingData, setBookingData] = useState({
    participantsCount: 1,
    rentInstruments: [],
    date: "",
    time: "",
    howLong: 1,
    isVIP: false,
    roomNumber: null,
    startTime: null,
    endTime: null,
    userId: null,
    totalPrice: 0,
    artists: [],
  })
  const [unavailableDates, setUnavailableDates] = useState([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const fetchUnavailableDates = async () => {
    try {
      const { data } = await axios.get(urls.GET_UNAVAILABLE_DATES, {
        withCredentials: true,
      })
      setUnavailableDates(data)
    } catch (error) {
      console.error("Error fetching unavailable dates:", error)
    }
  }

  const fetchInstruments = async () => {
    try {
      const { data } = await axios.get(urls.INSTRUMENTS, {
        withCredentials: true,
      })
      setInstruments(data)
    } catch (error) {
      console.error("Error fetching instruments:", error)
    }
  }

  useEffect(() => {
    fetchUnavailableDates()
    fetchInstruments()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const startDateTime = new Date(`${bookingData.date}T${bookingData.time}`)
      const endDateTime = new Date(
        startDateTime.getTime() + bookingData.howLong * 60 * 60 * 1000
      )

      const bookingPayload = {
        ...bookingData,
        startTime: startDateTime,
        endTime: endDateTime,
        userId: user?.id,
      }

      const { data } = await axios.post(urls.BOOKINGS, bookingPayload, {
        withCredentials: true,
      })
      setSuccess("ההזמנה בוצעה בהצלחה!")
      setError("")
      fetchUnavailableDates()
    } catch (error) {
      setError(error.response?.data?.message || "אירעה שגיאה בביצוע ההזמנה")
      setSuccess("")
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setBookingData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleInstrumentChange = (e) => {
    const instrumentId = e.target.value
    const isChecked = e.target.checked

    setBookingData((prev) => ({
      ...prev,
      rentInstruments: isChecked
        ? [...prev.rentInstruments, instrumentId]
        : prev.rentInstruments.filter((id) => id !== instrumentId),
    }))
  }

  if (!user) {
    return (
      <div className={styles["error-message"]}>
        עליך להתחבר כדי להזמין חדר חזרות
      </div>
    )
  }

  return (
    <div className={styles["booking-page"]}>
      <video autoPlay muted loop className={styles["background-video"]}>
        <source src="/videos/modern-studio.mp4" type="video/mp4" />
      </video>

      <div className={styles["booking-container"]}>
        <h2>הזמנת חדר חזרות</h2>
        {error && <div className={styles["error-message"]}>{error}</div>}
        {success && <div className={styles["success-message"]}>{success}</div>}

        <form onSubmit={handleSubmit} className={styles["booking-form"]}>
          <div className={styles["form-group"]}>
            <label>מספר משתתפים:</label>
            <input
              type="number"
              name="participantsCount"
              min="1"
              value={bookingData.participantsCount}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label>תאריך:</label>
            <input
              type="date"
              name="date"
              value={bookingData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label>שעת התחלה:</label>
            <input
              type="time"
              name="time"
              value={bookingData.time}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label>משך זמן (שעות):</label>
            <input
              type="number"
              name="howLong"
              min="1"
              max="24"
              value={bookingData.howLong}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label>השכרת כלי נגינה:</label>
            <div className={styles["instruments-grid"]}>
              {instruments.map((instrument, index) => (
                <div
                  key={instrument._id || index}
                  className={styles["instrument-item"]}
                >
                  <label>
                    <input
                      type="checkbox"
                      value={instrument._id}
                      checked={bookingData.rentInstruments.includes(
                        instrument._id
                      )}
                      onChange={handleInstrumentChange}
                    />
                    <span>{instrument.name}</span>
                    <span className={styles["instrument-price"]}>
                      ₪{instrument.price} / שעה
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className={styles["form-group"]}>
            <label>
              <input
                type="checkbox"
                name="isVIP"
                checked={bookingData.isVIP}
                onChange={handleInputChange}
              />
              חדר VIP
            </label>
          </div>

          <button type="submit" className={styles["submit-btn"]}>
            הזמן חדר
          </button>
        </form>

        {unavailableDates.length > 0 && (
          <div className={styles["unavailable-dates"]}>
            <h3>תאריכים תפוסים:</h3>
            <ul>
              {unavailableDates.map((booking, index) => (
                <li key={booking._id || index}>
                  {new Date(booking.startTime).toLocaleString()} -
                  {new Date(booking.endTime).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default PracticeRoomBooking
