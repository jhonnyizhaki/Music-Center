import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import urls from "../constant/URLS"
import styles from "./PracticeRoomBooking.module.css"
import { FaGuitar, FaDrum, FaMicrophone, FaMusic } from "react-icons/fa"
import { addHours } from "date-fns"

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
    howLong: "1",
    isVIP: false,
    roomNumber: null,
    startDate: null,
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
      const { data } = await axios.get(urls.GET_UNAVAILABLE_DATES)
      setUnavailableDates(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching unavailable dates:", error)
      setUnavailableDates([])
    }
  }

  const fetchInstruments = async () => {
    try {
      const { data } = await axios.get(urls.RENTINSTRUMENTS)
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
      const startDateTime = addHours(
        new Date(bookingData.date),
        parseInt(bookingData.time.split(":")[0])
      )
      const endDateTime = new Date(
        startDateTime.getTime() + bookingData.howLong * 60 * 60 * 1000
      )

      const bookingPayload = {
        ...bookingData,
        //rentInstruments:
        startDate: startDateTime,
        endTime: endDateTime,
        userId: user?.id,
      }

      const { data } = await axios.post(urls.CREATE_BOOKING, bookingPayload, {
        withCredentials: true,
      })
      setSuccess("Booking successful!")
      setError("")
      fetchUnavailableDates()
      window.location.href = data.redirectUrl
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred during booking"
      )
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

  const handleInstrumentChange = (instrumentId, artist = undefined) => {
    setBookingData((prev) => {
      const existingIndex = prev.rentInstruments.findIndex(
        (item) => item.instrumentId === instrumentId
      )

      if (existingIndex > -1) {
        const updatedInstruments = [...prev.rentInstruments]
        if (artist !== undefined) {
          updatedInstruments[existingIndex].artist = artist
        } else {
          updatedInstruments.splice(existingIndex, 1)
        }
        return { ...prev, rentInstruments: updatedInstruments }
      } else {
        return {
          ...prev,
          rentInstruments: [
            ...prev.rentInstruments,
            { instrumentId, artist: false },
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

    bookingData.rentInstruments.forEach(({ instrumentId, artist }) => {
      const instrument = instruments.find((i) => i._id === instrumentId)
      if (instrument) {
        total += instrument.rentPrice * bookingData.howLong

        if (artist) {
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
        Please login to book a practice room
      </div>
    )
  }

  return (
    <div className={styles["booking-page"]}>
      <video autoPlay muted loop className={styles["background-video"]}>
        <source src="/videos/modern-studio.mp4" type="video/mp4" />
      </video>

      <div className={styles["booking-container"]}>
        <h2>Book a Practice Room</h2>
        {error && <div className={styles["error-message"]}>{error}</div>}
        {success && <div className={styles["success-message"]}>{success}</div>}

        <form onSubmit={handleSubmit} className={styles["booking-form"]}>
          <div className={styles["form-group"]}>
            <label>Number of Participants:</label>
            <input
              type="number"
              name="participantsCount"
              min="1"
              value={bookingData.participantsCount}
              onChange={(e) => {
                setBookingData({
                  ...bookingData,
                  participantsCount: parseInt(e.target.value),
                })
              }}
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={bookingData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label>Start Time:</label>
            <input
              type="time"
              name="time"
              value={bookingData.time}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label>Duration (hours):</label>
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
          <label htmlFor="isVIPinput">VIP room</label>
          <input
            type="checkbox"
            id="isVIPinput"
            value={bookingData.isVIP}
            onChange={() => {
              setBookingData({ ...bookingData, isVIP: !bookingData.isVIP })
            }}
          />

          <button
            type="button"
            className={styles["rent-instruments-btn"]}
            onClick={() => setShowInstrumentModal(true)}
          >
            Rent Instruments
          </button>

          {showInstrumentModal && (
            <div className={styles["modal"]}>
              <div className={styles["modal-content"]}>
                <div className={styles["modal-header"]}>
                  <h3 className="h">Select Instruments to Rent</h3>
                  <button
                    onClick={() => setShowInstrumentModal(false)}
                    className={styles["close-btn"]}
                  >
                    <img
                      src="/istockphoto-1210969290-1024x1024-removebg-preview.png"
                      alt="Close"
                      className={styles["close-icon"]}
                    />
                  </button>
                </div>

                <div className={styles["filters"]}>
                  <input
                    type="text"
                    placeholder="Search instruments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles["search-input"]}
                  />
                </div>

                <div className={styles["instruments-grid"]}>
                  {filteredInstruments.map((instrument, index) => {
                    const isSelected = bookingData.rentInstruments.some(
                      (item) => item.instrumentId === instrument._id
                    )
                    const artist = bookingData.rentInstruments.find(
                      (item) => item.instrumentId === instrument._id
                    )?.artist

                    return (
                      <div key={index} className={styles["instrument-card"]}>
                        <h4 className={styles["name"]}>
                          {getInstrumentIcon(instrument.category)}
                          <span>{instrument.name}</span>
                        </h4>
                        <p className={styles["price"]}>
                          ₪{calculateHourlyRate(instrument.rentPrice)} / hour
                        </p>
                        <div className={styles["card-actions"]}>
                          <label className={styles["artist-checkbox"]}>
                            <input
                              type="checkbox"
                              checked={artist || false}
                              onChange={(e) =>
                                handleInstrumentChange(
                                  instrument._id,
                                  e.target.checked
                                )
                              }
                              disabled={!isSelected}
                            />
                            <p className={styles["with-artist"]}>
                              Include Artist (+₪150/hour)
                            </p>
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              handleInstrumentChange(instrument._id)
                            }
                            className={`${styles["select-btn"]} ${isSelected ? styles["selected"] : ""}`}
                          >
                            {isSelected ? "Remove" : "Select"}
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
            <h4>Selected Instruments:</h4>
            {bookingData.rentInstruments.map(
              ({ instrumentId, artist }, index) => {
                const instrument = instruments.find(
                  (i) => i._id === instrumentId
                )
                if (!instrument) return null

                return (
                  <div key={index} className={styles["selected-instrument"]}>
                    <span>{instrument.name}</span>
                    {artist && (
                      <span className={styles["with-artist"]}>With Artist</span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleInstrumentChange(instrumentId)}
                      className={styles["remove-btn"]}
                    >
                      Remove
                    </button>
                  </div>
                )
              }
            )}
          </div>

          <div className={styles["total-price"]}>
            Total Price: ₪{calculateTotalPrice()}
          </div>

          <button type="submit" className={styles["submit-btn"]}>
            Book Room
          </button>
        </form>

        {Array.isArray(unavailableDates) && unavailableDates.length > 0 && (
          <div className={styles["unavailable-dates"]}>
            <h3>Unavailable Dates:</h3>
            <ul>
              {unavailableDates.map((booking, index) => (
                <li key={index}>
                  {new Date(booking.startDate).toLocaleString()} -
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
