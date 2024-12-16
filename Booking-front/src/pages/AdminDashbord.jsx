import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../components/ui/table";
  import { useState, useEffect } from "react";


  
  
  function AdminDashboard() {
    const [bookings, setBookings] = useState([]); // State for fetched data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error handling state
  
    // Fetch appointments data from the API
    useEffect(() => {
      const fetchBookings = async () => {
        setLoading(true);
        setError(null);
    
        try {
          const authToken = localStorage.getItem("authToken"); // Retrieve encoded credentials
          if (!authToken) {
            throw new Error("No credentials found. Please log in.");
          }
    
          // Ensure the Authorization header sends "Basic <encodedToken>"
          const response = await fetch("http://localhost:8080/api/appointments/dashboard", {
            method: "GET",
            headers: {
              Authorization: `Basic ${authToken}`, // Send the token as is (already encoded)
              "Content-Type": "application/json",
            },
          });
    
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
    
          const data = await response.json();
          const formattedData = data.map((item) => ({
            id: item.id,
            name: item.client.name,
            lastName: item.client.lastName,
            telephone: item.client.telephone,
            date: item.date,
            time: item.time.slice(0, 5), // Trim time to 'HH:MM'
            status: item.status,
          }));
          setBookings(formattedData);
        } catch (err) {
          setError(err.message);
          console.error("Error fetching bookings:", err);
        } finally {
          setLoading(false);
        }
      };
    
      fetchBookings();
    }, []);
  
    const handleValidate = async (id) => {
      try {
        const authToken = localStorage.getItem("authToken"); // Retrieve the token
        if (!authToken) throw new Error("No credentials found. Please log in.");
    
        const response = await fetch(`http://localhost:8080/api/appointments/validate/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Basic ${authToken}`, // Send Basic Auth header
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          throw new Error("Failed to validate the appointment.");
        }
    
        // Update the status in the state after successful request
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === id ? { ...booking, status: "CONFIRMED" } : booking
          )
        );
      } catch (err) {
        console.error("Error validating appointment:", err);
        setError("Failed to validate the appointment. Please try again.");
      }
    };
    
    const handleReport = async (id) => {
      try {
        const authToken = localStorage.getItem("authToken"); // Retrieve the token
        if (!authToken) throw new Error("No credentials found. Please log in.");
    
        const response = await fetch(`http://localhost:8080/api/appointments/cancel/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Basic ${authToken}`, // Send Basic Auth header
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          throw new Error("Failed to cancel the appointment.");
        }
    
        // Update the status in the state after successful request
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === id ? { ...booking, status: "CANCELLED" } : booking
          )
        );
      } catch (err) {
        console.error("Error canceling appointment:", err);
        setError("Failed to cancel the appointment. Please try again.");
      }
    };
  
    if (loading) {
      return <div className="text-center mt-10">Loading...</div>;
    }
  
    if (error) {
      return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
    }
  
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <Table className="border rounded-sm shadow-lg">
          <TableCaption>List of Appointments</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.name}</TableCell>
                <TableCell>{booking.lastName}</TableCell>
                <TableCell>{booking.telephone}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{booking.time}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>
                  <button
                    onClick={() => handleValidate(booking.id)}
                    disabled={booking.status !== "PENDING"}
                    className="px-4 py-2 font-semibold text-sm bg-green-500 text-white rounded-full shadow-sm disabled:opacity-50 mr-2"
                  >
                    CONFIRMED
                  </button>
                  <button
                    onClick={() => handleReport(booking.id)}
                    disabled={booking.status !== "PENDING"}
                    className="px-4 py-2 font-semibold text-sm bg-red-500 text-white rounded-full shadow-sm disabled:opacity-50"
                  >
                    Cancelled
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
  
  export default AdminDashboard;