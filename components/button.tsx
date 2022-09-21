import Link from "next/link";

interface ButtonProps {
  text: string;
  href?: string;
}

const Button = ({ text, href }: ButtonProps) => {
  return (
    <button className="w-full h-12 rounded-2xl text-[#838383] text-base bg-white bg-opacity-70">
      <Link href={`${href}`}>{text}</Link>
    </button>
  );
};

export default Button;
