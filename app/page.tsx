"use client";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { motion } from "framer-motion";
import "react-calendar/dist/Calendar.css";
import "./globals.css";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [holiday, setHoliday] = useState(null);

  // Food & beverage holidays (from your JSON)
  const [foodHolidays, setfoodHolidays] =useState([]);

  useEffect(() => {
    fetch("/api/getCalendar").then(
    resultAPI => resultAPI.json()
)
.then(
  result => setfoodHolidays(result)
)
  }, []);

  // Find holiday for the selected date
  useEffect(() => {
    const formattedSelected = selectedDate.toISOString().split("T")[0];
    const found = foodHolidays.find(
      (h) => h.date.split("T")[0] === formattedSelected
    );
    setHoliday(found || null);
  }, [selectedDate]);

  const formattedDate = selectedDate.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Dots + custom tooltip for holidays
  const tileContent = ({ date }) => {
    const formatted = date.toISOString().split("T")[0];
    const found = foodHolidays.find((h) => h.date.split("T")[0] === formatted);

    if (found) {
      return (
        <div
          title={`${found.title} — ${found.description}`} // browser tooltip
          style={{
            height: "6px",
            width: "6px",
            borderRadius: "50%",
            background: "#f97316",
            margin: "2px auto 0 auto",
          }}
        />
      );
    }
    return null;
  };

  return (
    <div className="relative min-h-screen bg-amber-50 text-gray-800 flex flex-col font-sans">
      {/* Banner */}
      <header className="bg-orange-500 text-white py-4 shadow-md flex justify-center items-center">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
          Holiday Calendar App
        </h1>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Calendar */}
        <div
          className="absolute top-6 right-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-3"
          role="region"
          aria-label="Select a date"
        >
          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
            next2Label="»"
            prev2Label="«"
            tileContent={tileContent}
            aria-label="Food holiday calendar"
          />
        </div>

        {/* Animated Center Content */}
        <motion.main
          key={formattedDate}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center px-4 mt-8"
        >
          <h2 className="text-5xl font-extrabold text-gray-900 mb-3">
            {formattedDate}
          </h2>

          <p className="text-xl text-gray-700 mb-6">
            {holiday
              ? `${holiday.title} — ${holiday.description}`
              : "Select a date to discover a holiday!"}
          </p>

          {holiday && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              className="inline-block bg-orange-200 text-orange-900 font-semibold px-6 py-3 rounded-full shadow-sm"
              aria-live="polite"
            >
              {holiday.title}
            </motion.div>
          )}
        </motion.main>
      </div>
    </div>
  );
}
