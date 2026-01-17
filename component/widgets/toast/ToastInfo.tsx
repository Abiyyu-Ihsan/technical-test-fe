import { FC } from 'react'
import { Info } from 'react-feather';

const ToastInfo: FC<ToastProps> = ({
  visible,
  onClose,
  title,
  text,
  outline = false
}) => {
  return (
    <div
      className={`${
        visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full ${outline ? `bg-white` : `bg-yellow-600`} shadow-lg rounded-lg pointer-events-auto flex border-2 border-white ring-1 ring-white ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className={`flex-shrink-0 items-center text-center justify-center pt-0.5 ${outline ? `text-primary` : `text-white`}`}>
            <Info />
          </div>
          <div className="ml-3 flex-1">
            <p className={`mt-1 text-sm ${outline ? `text-gray-500` : `text-white`}`}>
              {text}
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={onClose}
          className={`w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium ${outline ? `text-primary focus:ring-primary` : `text-white focus:ring-white`} focus:outline-none focus:ring-2`}
        >
          Tutup
        </button>
      </div>
    </div>
  );
}

export default ToastInfo