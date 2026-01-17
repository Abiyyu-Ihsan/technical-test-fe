import { Dialog, Transition } from "@headlessui/react";
import { cn } from "@libs/utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import { FC, Fragment, useEffect, useState } from "react";
import { X } from "react-feather";

const modalDialogVariants = cva(
  "w-full transform overflow-hidden rounded-lg p-6 text-left align-middle shadow-xl transition-all",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        xxl: "max-w-4xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl",
        full: "max-w-full",
      },
      color: {
        white: "bg-white",
        blue: "bg-primary",
      },
    },
    defaultVariants: {
      size: "md",
      color: "white",
    },
  }
);

interface ModalDialogProps extends VariantProps<typeof modalDialogVariants> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
  clickOutside?: boolean;
  titleSeparator?: boolean;
  hide?: string;
}

const ModalMain: FC<ModalDialogProps> = ({
  isOpen,
  onClose,
  children,
  title = "",
  size,
  className,
  hide,
  clickOutside = true,
  titleSeparator = false,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        open={isOpen}
        onClose={clickOutside ? onClose : () => null}
        static
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={cn(modalDialogVariants({ size, className }))}
              >
                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold leading-6 text-gray-900"
                >
                  <div className="flex flex-row justify-between items-center mb-4 lg:mb-6">
                    <span>{title}</span>
                    <button
                      className={`${hide ? "hidden" : "flex"}`}
                      onClick={onClose}
                    >
                      <X />
                    </button>
                  </div>
                  {titleSeparator && <hr />}
                </Dialog.Title>
                <div className="mt-4">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalMain;
