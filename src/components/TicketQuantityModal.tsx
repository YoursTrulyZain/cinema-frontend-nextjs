'use client';

import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { Button } from './ui/button';
import { ScreeningNormalized } from '@/lib/types';

type TicketQuantityModalProps = {
    isOpen: boolean;
    onClose: () => void;
    screening: ScreeningNormalized | null;
    onContinue: (quantity: number) => void;
}

function TicketQuantityModal({ isOpen, onClose, screening, onContinue }: TicketQuantityModalProps) {
    const [quantity, setQuantity] = useState(1);
    
    useEffect(() => {
      if (isOpen) {
        setQuantity(1);
      }
    }, [isOpen]);

    // Format the date safely
    const formattedShowtime = React.useMemo(() => {
      if (!screening || !screening.startTime) return '';
      
      try {
        return new Date(screening.startTime).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit',
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        });
      } catch (e) {
        console.error('Error formatting date:', e);
        return '';
      }
    }, [screening]);

    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Ticket Selection">
          <div className="flex flex-col items-center gap-6">
            {screening && (
              <div>
                <p className="text-gray-700">
                  Showtime: {formattedShowtime}
                </p>
              </div>
            )}
            
            <div className="flex flex-col gap-2">
              <label className="font-medium">How many tickets?</label>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                  type="button"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-10 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => Math.min(10, prev + 1))}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-4">
              <Button 
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                type="button"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => onContinue(quantity)}
                className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600"
                type="button"
              >
                Continue
              </Button>
            </div>
          </div>
      </Modal>
    )
}

export default TicketQuantityModal