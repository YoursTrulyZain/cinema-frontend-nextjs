'use client';

import React, { useState, useEffect, useMemo } from 'react'
import Modal from './Modal'
import { ALL_ROWS, Row, ScreeningNormalized, Seat } from '@/lib/types';
import { cn } from '@/lib/utils';

type SeatSelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  screening: ScreeningNormalized | null;
  quantity: number;
  onPurchase: (seats: Seat[]) => void;
}

function SeatSelectionModal({
  isOpen,
  onClose,
  screening,
  quantity,
  onPurchase,
}: SeatSelectionModalProps) {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  
  // Reset selected seats when modal opens or screening changes
  useEffect(() => {
    setSelectedSeats([]);
  }, [isOpen, screening]);

  // Early return if no screening data
  if (!isOpen) return null;
  if (!screening) return (
    <Modal isOpen={isOpen} onClose={onClose} title="Seat Selection">
      <div className="p-4 text-center">
        <p>No screening data available. Please try again.</p>
        <button
          onClick={onClose}
          className="mt-4 inline-flex items-center px-4 py-2 text-sm font-semibold leading-6 shadow rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
          type="button"
        >
          Close
        </button>
      </div>
    </Modal>
  );

  const auditorium = screening.auditorium;
  
  // Check if seats are available
  if (!auditorium || !auditorium.seats || !Array.isArray(auditorium.seats)) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Seat Selection">
        <div className="p-4 text-center">
          <p>No seats available for this screening.</p>
          <button
            onClick={onClose}
            className="mt-4 inline-flex items-center px-4 py-2 text-sm font-semibold leading-6 shadow rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
            type="button"
          >
            Close
          </button>
        </div>
      </Modal>
    );
  }
  
  const availableSeats = auditorium.seats;

  // Check if seat is booked for current screening
  const isSeatBooked = (seat: Seat) => {
    // console.log('Checking seat:', seat.number, 'Tickets:', seat.tickets, 'Screening:', screening.id);
    return seat.tickets?.some(ticket => ticket.screeningId === screening.id);
  };

  const isSeatSelected = (seat: Seat) => {
    return selectedSeats.some(s => s.id === seat.id);
  };

  const handleSeatClick = (seat: Seat) => {
    // Don't handle click for booked seats (they should be disabled anyway)
    if (isSeatBooked(seat)) return;
    
    if (isSeatSelected(seat)) {
      // Deselect seat
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      // Select seat if under quantity limit
      if (selectedSeats.length < quantity) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const handlePurchase = () => {
    if (selectedSeats.length > 0) {
      onPurchase(selectedSeats);
    }
  };

  // Group seats by row
  const seatsByRow = ALL_ROWS.reduce((acc, row) => {
    acc[row] = availableSeats.filter(seat => seat.row === row).sort((a, b) => a.number - b.number);
    return acc;
  }, {} as Record<Row, Seat[]>);

  // Create a reversed copy of ALL_ROWS to display M first (closest to screen) and AA last
  const rowsInDisplayOrder = [...ALL_ROWS].reverse();

  // Determine if the purchase button should be disabled
  const isPurchaseDisabled = selectedSeats.length === 0 || selectedSeats.length !== quantity;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Seat Selection" maxWidth="max-w-4xl">
      <div className="flex flex-col items-center gap-3 sm:gap-5">
        <div className="text-center mb-0 w-full">
          <p className="text-xs sm:text-sm mb-1">
            {screening.movie?.title || 'Movie'} - {screening.theatre?.name || 'Theatre'} - {screening.auditorium?.type || 'Auditorium'}
          </p>
          <p className="text-xs sm:text-sm mb-1 sm:mb-2">
            {screening.startTime ? new Date(screening.startTime).toLocaleString() : 'Time not available'} - Select {quantity} seats
          </p>
          <div className="w-3/4 mx-auto h-5 sm:h-6 bg-gray-300 rounded-t-lg flex items-center justify-center mb-1 sm:mb-2">
            <p className="text-xs sm:text-sm font-medium text-gray-700">Screen</p>
          </div>
        </div>

        <div className="w-full max-w-full overflow-x-auto pb-2 -mt-1">
          <div className="flex justify-center min-w-fit">
            {/* Render seats by row, with M closest to screen */}
            <div className="flex flex-col gap-1 sm:gap-2">
              {rowsInDisplayOrder.map(row => {
                const rowSeats = seatsByRow[row] || [];
                if (rowSeats.length === 0) return null;
                
                return (
                  <div key={row} className="flex items-center">
                    <div className="w-6 sm:w-8 mr-1 sm:mr-2 text-center font-bold text-xs sm:text-base">{row}</div>
                    <div className="flex gap-[2px] sm:gap-1 flex-nowrap">
                      {rowSeats.map(seat => {
                        // Determine seat status
                        const isBooked = isSeatBooked(seat);
                        const isSelected = isSeatSelected(seat);
                        
                        return (
                          <button
                            key={seat.id}
                            className={cn(
                              "w-5 h-5 sm:w-7 sm:h-7 text-[10px] sm:text-xs flex items-center justify-center rounded-sm",
                              isBooked ? "bg-gray-400 cursor-not-allowed" : 
                              isSelected ? "bg-green-500 text-white" : "bg-blue-200 hover:bg-blue-300"
                            )}
                            onClick={() => handleSeatClick(seat)}
                            disabled={isBooked}
                            title={`Row ${seat.row}, Seat ${seat.number}${isBooked ? ' (Booked)' : ''}`}
                            type="button"
                          >
                            {seat.number}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-3 sm:gap-6 mt-1 sm:mt-2 items-center justify-center flex-wrap">
          <div className="flex gap-3 sm:gap-6 flex-wrap justify-center">
            <div className="flex items-center">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-200 mr-1 sm:mr-2 rounded-sm"></div>
              <span className="text-[10px] sm:text-xs">Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500 mr-1 sm:mr-2 rounded-sm"></div>
              <span className="text-[10px] sm:text-xs">Selected</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-400 mr-1 sm:mr-2 rounded-sm"></div>
              <span className="text-[10px] sm:text-xs">Booked</span>
            </div>
          </div>
        </div>

        {/* Completely rebuilt buttons area */}
        <div className="w-full flex justify-between border-t pt-3 sm:pt-4 mt-1">
          <div>
            <button
              type="button"
              onClick={handlePurchase}
              disabled={isPurchaseDisabled}
              className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold leading-6 shadow rounded-md text-white bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-300"
            >
              Purchase {selectedSeats.length}/{quantity}
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold leading-6 shadow rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default SeatSelectionModal