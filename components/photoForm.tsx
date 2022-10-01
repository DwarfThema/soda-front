import useFormMutation from "@libs/client/useFormMutation";
import { NodeNextRequest } from "next/dist/server/base-http/node";
import { useEffect, useState } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { MutationResult } from "./editProfileModal";
import imageCompression from "browser-image-compression";

interface IPhotoForm {
  register?: UseFormRegisterReturn;
  title: string;
  setFile: any;
}

const PhotoForm = ({ register, title, setFile }: IPhotoForm) => {
  const [src, setSrc] = useState("");
  const [text, setText] = useState("영수증 분석 요청");
  // ---------영수증 post api 관련------------

  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const styleObj = {
    backgroundImage: `url(${src})`,
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
  };

  useEffect(() => {}, [src]);
  return (
    <div>
      <div
        style={styleObj}
        className="w-[350px] h-[350px] bg-slate-50 flex justify-center items-center rounded-3xl border-2 border-solid border-spacing-4 border-gray-500-400 drop-shadow-md"
      >
        <label
          htmlFor="photo"
          className="w-full h-full justify-center items-center"
        >
          <input
            {...register}
            type="file"
            id="photo"
            className="hidden absolute"
            accept="image/*"
            onChange={onChangeHandler}
          />
          {src == "" ? (
            <div className="flex flex-col w-full h-full justify-center items-center ">
              <div className="text-xl font-extrabold">{title}</div>
              <div>
                <div className="text-red-600 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-9 h-9"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ) : null}
        </label>
      </div>
    </div>
  );
};

export default PhotoForm;
