import { ButtonProps } from "../types"

export default function Button({ onClick, className, value, icon, children }: ButtonProps) {
  return (
    <button onClick={onClick} className={`bg-green-800 text-white px-2 py-1 rounded flex items-center justify-center gap-2 ${className}`}>
      {icon && icon}
      {value && <p className="font-bold text-sm">{value}</p>}
      {children}
    </button>
  );
}