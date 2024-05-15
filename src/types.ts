export interface Data {
  name: string
  category: string
  calories: number
  carbohydrates: number
  proteins: number
  lipids: number
}

export interface InputProps {
  type: string
  value: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  textSize: string
  min?: number
  max?: number
}

export interface ListProps {
  data: Data[];
  portion: number;
  selectedData: Data[];
  setSelectedData: (data: Data[]) => void;
}

export interface ModalType {
  isOpen: boolean;
  toggle: () => void;
  data: Data[];
  selectedData: Data[];
  setSelectedData: (data: Data[]) => void;
}

export interface ButtonProps {
  value?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}
