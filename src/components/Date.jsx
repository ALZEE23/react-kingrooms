import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function MyDatePicker() {
  const [startDate, setStartDate] = useState(null);
  const bookedDates = [new Date("2024-04-01"), new Date("2024-04-02")]; // Contoh tanggal yang telah dipesan

  const isDateBooked = (date) => {
    return bookedDates.some(
      (bookedDate) =>
        // Memeriksa apakah tanggal yang dipilih sama dengan salah satu dari tanggal yang telah dipesan
        date.getFullYear() === bookedDate.getFullYear() &&
        date.getMonth() === bookedDate.getMonth() &&
        date.getDate() === bookedDate.getDate()
    );
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      minDate={new Date()} // Memastikan pengguna tidak bisa memilih tanggal sebelum hari ini
      filterDate={isDateBooked} // Menentukan fungsi untuk memeriksa apakah tanggal sudah dipesan
    />
  );
}

export default MyDatePicker;
