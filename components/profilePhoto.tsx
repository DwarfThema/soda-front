import { IprofileImg } from "@libs/client/sharedProp";
import { cls } from "@libs/client/utils";
import { url } from "inspector";
import { NextPage } from "next";

const ProfilePhoto = ({ sm, md, lg, xlg, avatar }: any) => {

  return (
    <div
      className={cls(
        " rounded-full bg-red-700 flex justify-center items-center m-1 shadow-xl",
        sm
          ? "h-8 w-8"
          : md
          ? "h-9 w-9"
          : lg
          ? "h-10 w-10"
          : xlg
          ? "h-[72px] w-[72px]"
          : "h-8 w-8"
      )}
    >
      <div
        className={cls(
          " rounded-full  bg-cover bg-center ",
          sm
            ? "h-7 w-7"
            : md
            ? "h-8 w-8"
            : lg
            ? "h-9 w-9"
            : xlg
            ? "h-16 w-16"
            : "h-7 w-7"
        )}
        style={{
          backgroundImage: avatar ? `url(${avatar})` : `url(/img/so-sm.jpg)`,
        }}
      />
    </div>
  );
};

export default ProfilePhoto;
