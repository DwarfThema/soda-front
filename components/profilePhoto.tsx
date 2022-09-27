import { cls } from "@libs/client/utils";
import { NextPage } from "next";

interface IProfilePhoto {
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  avatar: string | undefined;
}

const ProfilePhoto = ({ sm, md, lg, avatar }: IProfilePhoto) => {
  return (
    <div
      className={cls(
        " rounded-full bg-red-700 flex justify-center items-center m-1 shadow-xl",
        sm ? "h-8 w-8" : md ? "h-9 w-9" : lg ? "h-10 w-10" : "h-8 w-8"
      )}
    >
      <div
        className={cls(
          " rounded-full  bg-cover bg-center ",
          sm ? "h-7 w-7" : md ? "h-8 w-8" : lg ? "h-9 w-9" : "h-7 w-7"
        )}
        style={{ backgroundImage: `url(${avatar})` }}
      />
    </div>
  );
};

export default ProfilePhoto;
