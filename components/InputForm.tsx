import { cls } from "@libs/client/utils";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
  type?: string;
}

const Input = ({ label, errorMessage, register, type }: InputProps) => {
  return (
    <div className="mb-[25px] flex flex-col items-center">
      <div className=" w-[286px] flex items-center text-sm ">
        <div className="absolute ml-[11px] text-[#838383] ">{label}</div>
        <input
          className={cls(
            "w-full h-10 pl-20 rounded-2xl bg-white bg-opacity-70 ",
            Boolean(errorMessage) === true
              ? "focus-visible: border-red-600 border-1"
              : "border-0"
          )}
          {...register}
          type={type}
        ></input>
      </div>
      <div className="absolute text-sm text-red-600 mt-10">{errorMessage}</div>
    </div>
  );
};

export default Input;
