import { useState, useRef, useEffect } from 'react';
import { InputProps } from '../types';

export default function Input({ type, value, onChange, textSize, min, max }: InputProps) {
  const [inputWidth, setInputWidth] = useState('auto');
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  if (value === undefined) {
    value = 0;
  }

  useEffect(() => {
    if (measureRef.current) {
      setInputWidth(`${measureRef.current.offsetWidth + 10}px`);
    }
  }, [value]);

  return (
    <div style={{ minWidth: '20px', maxWidth: '100%', whiteSpace: 'nowrap' }}>
      <input
        ref={inputRef}
        type={type}
        style={{ width: inputWidth }}
        className={`font-youngserif w-fit text-green-800 border-0 bg-transparent focus:outline-none focus:ring-0 text-right ${textSize}`}
        value={value || ""}
        onChange={onChange}
        min={min}
        max={max}
        pattern={type === 'number' ? '[0-9]*' : undefined}
      />
      <span className={`overflow-hidden invisible h-0 absolute whitespace-pre ${textSize}`} ref={measureRef}>
        {value || ""}
      </span>
    </div>
  );
}
