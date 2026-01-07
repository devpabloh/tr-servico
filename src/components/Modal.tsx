import React from 'react';
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  children: React.ReactNode; 
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  
  if (!isOpen) return null;

  return (
  
    <div 
      onClick={onClose} 
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-transparent w-full max-w-4xl" 
      >
        <button type='button' aria-label='Fechar Modal' 
          onClick={onClose}
          className="absolute right-58 text-red-600 hover:text-red-300 cursor-pointer"
        >
          <IoClose size={35} />
        </button>
        
        {children}
      </div>
    </div>
  );
}