
import { cls } from "@libs/client/utils";
import Link from "next/link";

interface ButtonProps {
  text: string;
  href?: string;
  [key: string]: any;
}

const Button = ({ type, text, href, error }: ButtonProps) => {
  return (
    <button
      type={type}
      className={cls(
        "w-full h-12 rounded-2xl  text-base bg-white bg-opacity-70",
        error ? "text-red-600" : "text-[#838383]"
      )}
    >
      {href ? <Link href={`${href}`}>{text}</Link> : <>{text}</>}
    </button>
  );
};

export default Button;
