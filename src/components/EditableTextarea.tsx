import { useState, useEffect } from 'react';
import type {ChangeEvent} from 'react';

interface EditableTextareaProps {
  initialValue: string;
  onSave: (newValue: string) => void;
  className?: string; 
  isEditing: boolean;
}

  export function EditableTextarea({ initialValue, onSave, className, isEditing }: Readonly<EditableTextareaProps>) {
  const [value, setValue] = useState(initialValue);

  useEffect(()=>{
    setValue(initialValue)
  },[initialValue])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSave(newValue);
  };

  if (isEditing) {
    return (
      <textarea
        value={value}
        onChange={handleChange}
        autoFocus
        className="w-full h-auto p-2 border border-blue-400 rounded-md font-serif text-lg"
        rows={4}
      />
    );
  }

  return (
    <p
      className={`p-2 rounded-sm transition-colors whitespace-pre-wrap ${className}`}
    >
      {initialValue || <span className='text-gray-400 italic'>...</span>}
    </p>
  );
}