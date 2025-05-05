'use client';

import React from 'react'
import Modal from './Modal'
import { Seat } from '@/lib/types'
import { Button } from './ui/button'

type PurchaseSuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  seats: Seat[];
  isLoading?: boolean;
  error?: string | null;
}

function PurchaseSuccessModal({ isOpen, onClose, seats, isLoading, error }: PurchaseSuccessModalProps) {
  if (!seats || seats.length === 0) return null;
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={error ? "Purchase Failed" : "Purchase Successful"}>
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="py-8 text-center">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p>Processing your purchase...</p>
          </div>
        ) : error ? (
          <div className="py-4">
            <h3 className="text-lg font-medium mb-2 text-red-500">There was a problem with your purchase</h3>
            <p className="text-gray-600">{error}</p>
            <Button onClick={onClose} className="w-full mt-6 bg-red-500 hover:bg-red-600">
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="py-4">
              <h3 className="text-lg font-medium mb-2">Your tickets have been purchased!</h3>
              <p className="text-gray-600">You have successfully purchased {seats.length} seat(s):</p>
              <ul className="list-disc pl-5 mt-2">
                {seats.map(seat => (
                  <li key={seat.id} className="text-gray-600">
                    Row {seat.row}, Seat {seat.number}
                  </li>
                ))}
              </ul>
            </div>
            <Button onClick={onClose} className="w-full mt-2 bg-blue-500 hover:bg-blue-600">
              Done
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
}

export default PurchaseSuccessModal