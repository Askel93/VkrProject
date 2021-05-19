export interface ModalItem<T = {}> {
  className?: string;
  entity: T;
  disabled?: boolean;
  onSaving?: (i: number) => void;
  onClick?: (t: T) => void;
}