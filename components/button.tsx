interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  return (
    <button className="w-full h-12 rounded-2xl text-[#838383] text-base bg-white bg-opacity-70">
      {text}
    </button>
  );
};

export default Button;
