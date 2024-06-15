import clsx from "clsx";
import { ButtonProps } from "../types"

export default function Button({ onClick, className, value, icon, children, outline }: ButtonProps) {
  return (
    <button onClick={onClick} className={clsx(outline ? "bg-white text-green-800 border border-solid border-green-800 hover:bg-green-50" : "bg-green-800 text-white hover:bg-green-900", `transition-all px-2 py-1 rounded flex items-center justify-center gap-2 ${className}`)}>
      {value && <p className="font-bold text-sm">{value}</p>}
      {children}
      {icon && icon}
    </button>
  );
}