
import BookingForm from '../components/BookingForm';
import barberImage from "../assets/barber-background.jpg"
function BookingPage() {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row ">
        <div className="w-1/1 p-6 md:p-10">
          <h1 className="text-3xl font-bold mb-6 text-[#ff593f]">Barber Shop Booking</h1>
          <p className="mb-6 text-blue-400">Book your appointment today! Please note that our barber is not available on <b>Fridays</b>.</p>
          <BookingForm/>
        </div>
        <div className="flex-1 relative">
          <img
            src={barberImage}
            alt="Barber shop interior"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }
  
  export default BookingPage;