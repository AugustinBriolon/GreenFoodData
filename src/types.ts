export type Data = {
  name: string;
  category: string;
  calories: number;
  carbohydrates: number;
  proteins: number;
  lipids: number;
};

export type SelectedData = {
  food: Data;
  portion: number;
};

export type ListProps = {
  data: Data[];
  portion: number;
  selectedData: SelectedData[];
  setSelectedData: (data: SelectedData[]) => void;
};


export interface InputProps {
  type: string
  value: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  textSize: string
  min?: number
  max?: number
}

export type ModalType = {
  isOpen: boolean;
  toggle: () => void;
  data: Data[];
  selectedData: SelectedData[];
  setSelectedData: (selected: SelectedData[]) => void;
};

export type FastAddProps = {
  data: Data[];
  selectedData: SelectedData[];
  setSelectedData: (selected: SelectedData[]) => void;
  isOpenData: boolean;
  setIsOpenData: (isOpen: boolean) => void;
};

export interface ButtonProps {
  value?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  outline?: boolean;
}
