import { cls } from "@libs/client/utils";
import Link from "next/link";

interface ButtonProps {
  text: string;
  href?: string;
  [key: string]: any;
  disabled: boolean;
  review: boolean;
}

const Button = ({ type, text, href, error, disabled, review }: ButtonProps) => {
  return (
    <button
      type={type}
      className={cls(
        "w-full h-12 rounded-2xl  text-base  ",
        error ? "text-red-600" : review ? "text-white" : "text-[#838383]",
        review ? "bg-[#00572D]" : "bg-white bg-opacity-70"
      )}
    >
      {href ? <Link href={`${href}`}>{text}</Link> : <>{text}</>}
    </button>
  );
};

export default Button;
