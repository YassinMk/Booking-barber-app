import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "./ui/calendar";
function BookingForm() {
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]); // State to hold available times

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const hours = Array.from({ length: 12 }, (_, i) => i + 9); // 9 AM to 8 PM

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Construct the object to send
    const bookingData = {
      name,
      lastName,
      telephone: phone,
      date: date.toISOString().split("T")[0], // Format date as "YYYY-MM-DD"
      time: hour,
    };
    setLoading(true); // Start loading
    setError(""); // Clear any previous error
    setSuccess(false); // Reset success state
    try {
      const response = await fetch(
        "https://diligent-perfection-production.up.railway.app/api/appointments/book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000); // Remove success message after 4 seconds
        setName("");
        setLastName("");
        setPhone("");
        setDate(new Date());
        setHour("");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to submit booking."); // Set error message
        setTimeout(() => setError(""), 4000); // Remove error message after 4 seconds
      }
    } catch (err) {
      setError("An error occurred while submitting your booking.");
      setTimeout(() => setError(""), 4000); // Remove error message after 4 seconds
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length <= 10) {
      // Only allow up to 10 digits
      setPhone(value);
    }
  };


  useEffect(() => {
    const fetchAvailableTimes = async () => {
      try {
        const formattedDate = date.toISOString().split("T")[0]; // Format the date as YYYY-MM-DD
        const response = await fetch(`https://diligent-perfection-production.up.railway.app/api/appointments/available-times/${formattedDate}`);
        
        if (response.ok) {
          const times = await response.json(); // Assuming the API returns an array of times
          setAvailableTimes(times); // Populate the state with available times
        } else {
          setError("Failed to fetch available times.");
          setTimeout(() => setError(""), 4000);
        }
      } catch (err) {
        setError("An error occurred while fetching available times.");
        setTimeout(() => setError(""), 4000);
      }
    };

    fetchAvailableTimes();
  }, [date]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter your last name"
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number (Maroc)
        </label>
        <input
          id="phone"
          type="tel"
          value={phone} // You should rename this state to 'phone'
          onChange={handlePhoneChange} // Rename this to setPhone
          placeholder="Enter your phone number"
          pattern="[0-9]{10}" // Validates 10-digit phone numbers
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
        />
      </div>

      <div className="space-y-2 ">
        <label className="block text-sm font-medium text-gray-700">
          Select Date
        </label>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          minDate={new Date()}
          className="rounded-md border shadow"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="hour"
          className="block text-sm font-medium text-gray-700"
        >
          Select Hour
        </label>

        <select
          id="hour"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
          required
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select an hour</option>
          {availableTimes.length > 0 ? (
            availableTimes.map((time) => (
              <option key={time} value={time}>
                {time.slice(0, 5)} 
              </option>
            ))
          ) : (
            <option disabled>No available times</option>
          )}
        </select>

      </div>
      
      <button
        type="submit"
        disabled={loading} // Disable button while loading
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#49a0f7] hover:bg-[#3b80c5]"
        }`}
      >
        {loading ? "Submitting..." : "Book Appointment"}
      </button>

     
      {success && (
        <div className="mt-4 p-2 rounded-md bg-green-100 text-green-700 text-center text-sm">
          Booking submitted successfully!
        </div>
      )}

      {error && (
        <div className="mt-4 p-2 rounded-md bg-red-100 text-red-700 text-center text-sm">
          {error}
        </div>
      )}

    </form>
  );
}

export default BookingForm;
