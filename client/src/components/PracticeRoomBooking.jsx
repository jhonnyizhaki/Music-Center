import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import urls from "../constant/URLS"
import styles from "./PracticeRoomBooking.module.css"
import { FaGuitar, FaDrum, FaMicrophone, FaMusic } from "react-icons/fa"

const PracticeRoomBooking = () => {
  const { user } = useAuth()
  const [instruments, setInstruments] = useState([])
  const [showInstrumentModal, setShowInstrumentModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
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
      setUnavailableDates(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching unavailable dates:", error)
      setUnavailableDates([])
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

  const calculateHourlyRate = (originalPrice) => {
    return (originalPrice * 0.05).toFixed(2)
  }

  const handleInstrumentChange = (instrumentId, withArtist = undefined) => {
    setBookingData((prev) => {
      const existingIndex = prev.rentInstruments.findIndex(
        (item) => item.instrumentId === instrumentId
      )

      if (existingIndex > -1) {
        const updatedInstruments = [...prev.rentInstruments]
        if (withArtist !== undefined) {
          updatedInstruments[existingIndex].withArtist = withArtist
        } else {
          updatedInstruments.splice(existingIndex, 1)
        }
        return { ...prev, rentInstruments: updatedInstruments }
      } else {
        return {
          ...prev,
          rentInstruments: [
            ...prev.rentInstruments,
            { instrumentId, withArtist: false },
          ],
        }
      }
    })
  }

  const filteredInstruments = instruments.filter(
    (instrument) =>
      instrument.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" || instrument.category === selectedCategory)
  )

  const calculateTotalPrice = () => {
    let total = bookingData.isVIP ? 200 : 100
    total *= bookingData.howLong

    bookingData.rentInstruments.forEach(({ instrumentId, withArtist }) => {
      const instrument = instruments.find((i) => i._id === instrumentId)
      if (instrument) {
        total += calculateHourlyRate(instrument.price) * bookingData.howLong
        if (withArtist) {
          total += 150 * bookingData.howLong
        }
      }
    })

    return total
  }

  const getInstrumentIcon = (category) => {
    const normalizedCategory = category.toLowerCase().trim()

    switch (normalizedCategory) {
      case "guitar":
      case "electric_guitar":
      case "acoustic_guitar":
        return (
          <FaGuitar size={20} style={{ color: "#8B4513", marginLeft: "8px" }} />
        )
      case "drums":
        return (
          <FaDrum size={20} style={{ color: "#C0C0C0", marginLeft: "8px" }} />
        )
      case "vocals":
      case "microphone":
        return (
          <FaMicrophone
            size={20}
            style={{ color: "#4169E1", marginLeft: "8px" }}
          />
        )
      case "piano":
      case "grand_piano":
        return (
          <FaMusic size={20} style={{ color: "#000000", marginLeft: "8px" }} />
        )
      case "violin":
        return (
          <FaMusic size={20} style={{ color: "#8B0000", marginLeft: "8px" }} />
        )
      case "saxophone":
        return (
          <FaMusic size={20} style={{ color: "#FFD700", marginLeft: "8px" }} />
        )
      default:
        return null
    }
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

          <button
            type="button"
            className={styles["rent-instruments-btn"]}
            onClick={() => setShowInstrumentModal(true)}
          >
            השכרת כלי נגינה
          </button>

          {showInstrumentModal && (
            <div className={styles["modal"]}>
              <div className={styles["modal-content"]}>
                <div className={styles["modal-header"]}>
                  <h3>בחירת כלי נגינה להשכרה</h3>
                  <button
                    onClick={() => setShowInstrumentModal(false)}
                    className={styles["close-btn"]}
                  >
                    ×
                  </button>
                </div>

                <div className={styles["filters"]}>
                  <input
                    type="text"
                    placeholder="חיפוש כלי נגינה..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles["search-input"]}
                  />

                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={styles["category-select"]}
                  >
                    <option value="all">כל הקטגוריות</option>
                  </select>
                </div>

                <div className={styles["instruments-grid"]}>
                  {filteredInstruments.map((instrument, index) => {
                    const isSelected = bookingData.rentInstruments.some(
                      (item) => item.instrumentId === instrument._id
                    )
                    const withArtist = bookingData.rentInstruments.find(
                      (item) => item.instrumentId === instrument._id
                    )?.withArtist

                    return (
                      <div key={index} className={styles["instrument-card"]}>
                        <h4 className={styles["name"]}>
                          {getInstrumentIcon(instrument.category)}
                          <span>{instrument.name}</span>
                        </h4>
                        <p className={styles["price"]}>
                          ₪{calculateHourlyRate(instrument.price)} / שעה
                        </p>
                        <div className={styles["card-actions"]}>
                          <label className={styles["artist-checkbox"]}>
                            <input
                              type="checkbox"
                              checked={withArtist || false}
                              onChange={(e) =>
                                handleInstrumentChange(
                                  instrument._id,
                                  e.target.checked
                                )
                              }
                              disabled={!isSelected}
                            />
                            כולל אמן (+150₪/ מחיר לשעה )
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              handleInstrumentChange(instrument._id)
                            }
                            className={`${styles["select-btn"]} ${isSelected ? styles["selected"] : ""}`}
                          >
                            {isSelected ? "הסר" : "בחר"}
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          <div className={styles["selected-instruments"]}>
            <h4>כלי נגינה שנבחרו:</h4>
            {bookingData.rentInstruments.map(
              ({ instrumentId, withArtist }, index) => {
                const instrument = instruments.find(
                  (i) => i._id === instrumentId
                )
                if (!instrument) return null

                return (
                  <div key={index} className={styles["selected-instrument"]}>
                    <span>{instrument.name}</span>
                    {withArtist && (
                      <span className={styles["with-artist"]}>כולל אמן</span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleInstrumentChange(instrumentId)}
                      className={styles["remove-btn"]}
                    >
                      הסר
                    </button>
                  </div>
                )
              }
            )}
          </div>

          <div className={styles["total-price"]}>
            סה"כ לתשלום: ₪{calculateTotalPrice()}
          </div>

          <button type="submit" className={styles["submit-btn"]}>
            הזמן חדר
          </button>
        </form>

        {Array.isArray(unavailableDates) && unavailableDates.length > 0 && (
          <div className={styles["unavailable-dates"]}>
            <h3>תאריכים תפוסים:</h3>
            <ul>
              {unavailableDates.map((booking, index) => (
                <li key={index}>
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