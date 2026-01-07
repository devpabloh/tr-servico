import React, { useState } from 'react';
import type {ChangeEvent} from 'react';

interface EditableFieldProps {
  
  initialValue: string; 

  onSave: (newValue: string) => void; 
  
  placeholder: string;
  
  className?: string;
}

export function EditableField({ initialValue, onSave, placeholder, className }: Readonly<EditableFieldProps>) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleBlur = () => {
    onSave(value);
    setIsEditing(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {

      e.currentTarget.blur(); 
    }
  };

  if (isEditing) {
    return (
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur} 
        onKeyDown={handleKeyDown} 
        autoFocus 
        className={`border border-blue-400 rounded-sm px-1 ${className}`}
      />
    );
  }

  
  return (
    <button
      type="button"
      onClick={() => setIsEditing(true)}
      className={`cursor-pointer hover:bg-yellow-100 p-1 rounded-sm transition-colors font-bold ${className}`}
      title="Clique para editar"
      style={{ background: 'none', border: 'none', padding: 0 }}
    >
      {value || placeholder}
    </button>
  );
}