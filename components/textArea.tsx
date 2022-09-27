import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
  label?: string;
  name?: string;
  register?: UseFormRegisterReturn;
  [key: string]: any;
}

export default function TextArea({
  label,
  name,
  register,
  ...rest
}: TextAreaProps) {
  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={name}
        {...register}
        className="mt-1 shadow-sm w-full h-[110px] focus:ring-red-500 rounded-md border-gray-300 border-2 focus:border-red-500 p-4 "
        style={{ resize: "none" }}
        rows={3}
        {...rest}
      />
    </div>
  );
}
