import { useRouter } from "next/router";
import React, { FC } from "react";
import { ArrowLeft } from "react-feather";


interface CardFormProps {
  children: React.ReactNode;
  backButton?: boolean | ((isBack: boolean) => void);
  backToLogin?: () => any;
}

const CardForm: FC<CardFormProps> = ({
  children,
  backButton = false,
  backToLogin,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (typeof backButton === "boolean") {
      router.back();
    } else {
      backButton?.(true);
    }
  };

  return (
    <div className="md:mx-auto lg:w-[1400px] mt-4 sm:mt-9 mx-3 md:max-w-md md:px-3 lg:max-w-lg">
      {backButton && (
        <button
          className="mb-4 rounded-full bg-white p-1 text-center border text-primary"
          onClick={handleClick}
        >
          <ArrowLeft />
        </button>
      )}
      {backToLogin && (
        <button
          className="mb-4 rounded-full bg-white p-1 text-center border text-primary"
          onClick={backToLogin}
        >
          <ArrowLeft />
        </button>
      )}
      <div
        className="
        border
          border-[#E7EFFC]
          px-8 py-8
          md:px-8
          md:py-14
          lg:px-12
          rounded-lg
        bg-white
          mb-8
        "
      >
        {children}
      </div>
    </div>
  );
};

export default CardForm;
