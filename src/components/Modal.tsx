'use client';

import { X } from 'lucide-react';
import React, { useEffect } from 'react'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    maxWidth?: string; // Add customizable max-width option
}

function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-lg" }: ModalProps) {

  useEffect(() => {
    const modalElement = document.body;
  
    if (isOpen && modalElement) {
      disableBodyScroll(modalElement);
    }
  
    return () => {
      enableBodyScroll(modalElement);
    };
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
      const handleEsc = (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
              onClose();
          }
      };
      window.addEventListener('keydown', handleEsc);
      
      return () => {
          window.removeEventListener('keydown', handleEsc);
      };
  }, [onClose]);

  if (!isOpen) return null;

  
    return (
      <div 
        className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-2 sm:p-4 overflow-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
        style={{ pointerEvents: 'auto' }}
        role="dialog"
        aria-modal="true"
      >
        <div 
          className={`bg-white rounded-lg shadow-lg w-full ${maxWidth} text-black relative my-2 sm:my-4 max-h-[90vh] overflow-auto`}
          onClick={e => e.stopPropagation()}
          style={{ pointerEvents: 'auto' }}
        >
          <div className="flex justify-between items-center pt-3 sm:pt-4 px-3 sm:px-6 sticky top-0 bg-white z-10">
            <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700 p-1 sm:p-2"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-3 sm:p-6 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    );
}

export default Modal