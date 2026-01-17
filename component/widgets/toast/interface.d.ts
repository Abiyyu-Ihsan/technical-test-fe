interface ToastProps {
  visible: boolean;
  onClose: () => any;
  title?: string;
  text: string;
  outline?: boolean;
  onClick?: () => any;
}
