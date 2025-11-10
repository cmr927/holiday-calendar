"use client";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { motion } from "framer-motion";
import "react-calendar/dist/Calendar.css";
import "./globals.css";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [holiday, setHoliday] = useState("");

  // Food & beverage holidays
  const foodHolidays = {
    "1-1": "🍾 New Year’s Day – Champagne & Brunch!",
    "2-9": "🍕 National Pizza Day",
    "3-25": "🧇 International Waffle Day",
    "4-7": "🍺 National Beer Day",
    "5-6": "🍩 National Donut Day",
    "7-6": "🍫 World Chocolate Day",
    "8-3": "🍉 Watermelon Day",
    "9-29": "☕ National Coffee Day",
    "10-17": "🍝 National Pasta Day",
    "11-26": "🥧 Thanksgiving Dessert Day",
    "12-4": "🍪 National Cookie Day",
  };

  useEffect(() => {
    const key = `${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
    setHoliday(foodHolidays[key] || "");
  }, [selectedDate]);

  const formattedDate = selectedDate.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Add tooltip and dot under food-holiday tiles
  const tileContent = ({ date }) => {
    const key = `${date.getMonth() + 1}-${date.getDate()}`;
    if (foodHolidays[key]) {
      return (
        <div
          title={foodHolidays[key]} // Tooltip
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
      {/* Top banner */}
      <header className="bg-orange-500 text-white py-4 shadow-md flex justify-center items-center">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
          Holiday Calendar App
        </h1>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Calendar in top-right corner */}
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

        {/* Animated content */}
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
            {holiday || "Select a date to discover a food or beverage holiday!"}
          </p>

          {holiday && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              className="inline-block bg-orange-200 text-orange-900 font-semibold px-6 py-3 rounded-full shadow-sm"
              aria-live="polite"
            >
              {holiday}
            </motion.div>
          )}
        </motion.main>
      </div>
    </div>
  );
}
