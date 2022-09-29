import useMutation from "@libs/client/useMutation";
import usePutMutation from "@libs/client/usePutMutation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IEditProfile {
  uploadFile?: FileList;
  oldPassword?: string;
  newPassword?: string;
  introduce?: string;
  result?: string;
}

export interface MutationResult {
  httpStatus: number;
  message: string;
  results: object;
}

interface IEditProfileModal {
  getEditProfile: boolean;
  setEditProfile: Function;
}

const EditProfileModal = ({
  getEditProfile,
  setEditProfile,
}: IEditProfileModal) => {
  //------------ 폼관련 ------------

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isValid, isDirty },
  } = useForm<IEditProfile>({});

  //------------ 폼관련 ------------

  //---------포토 api 관련-----------
  const [edit, { loading, data }] = useMutation<MutationResult>(
    "https://mtvs.kro.kr:8001/profile"
  );

  //---------포토 api 관련-----------

  //--------- pw api 관련 ---------s

  const [pwEdit, { loading: pwLoading, data: pwData }] =
    usePutMutation<MutationResult>("https://mtvs.kro.kr:8001/info/password");

  const [getPwMessage, setPwMessage] = useState("");

  useEffect(() => {
    if (pwData?.httpStatus === 201) {
      setPwMessage("비밀번호가 변경됐습니다.");
    } else {
      setPwMessage("");
    }
  }, [pwEdit]);

  //--------- pw api 관련 ---------

  //--------- submit 관련 ---------
  const oninvalid = (validForm: IEditProfile) => {
    //console.log(validForm);
    if (validForm.oldPassword && validForm.newPassword) {
      const passChange = {
        oldPassword: validForm.oldPassword,
        newPassword: validForm.newPassword,
      };
      pwEdit(passChange);
    }

    console.log(validForm);
  };

  const uploadImage = (validForm: IEditProfile) => {
    //console.log(validForm);
    if (validForm.uploadFile) {
      edit(validForm.uploadFile);
    }

    console.log(validForm);
  };

  //--------- submit 관련 ---------

  return (
    <AnimatePresence>
      {getEditProfile && (
        <motion.div
          className="absolute top-40 left-[76px] w-[250px] h-[330px] rounded-2xl  bg-white z-50 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.75, y: 30 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <form
            encType="multipart/form-data"
            action="https://mtvs.kro.kr:8001/profile"
            method="post"
            className="w-full h-full flex justify-center items-center flex-col "
          >
            <div className="w-[180px] h-[40px]">
              <label
                htmlFor="uploadFile"
                className="block text-white text-sm w-[180px] h-[40px] rounded-md bg-[#00572D]"
              >
                <div className="w-full h-full flex justify-center items-center">
                  <span>아바타 수정</span>
                </div>
                <input
                  {...register("uploadFile")}
                  type="file"
                  id="uploadFile"
                  className="hidden absolute"
                  accept="image/*"
                />
                <div className="flex flex-col w-full h-full justify-center items-center shadow-lg "></div>
              </label>
            </div>
            <div className=" text-white text-sm w-[180px] mt-2 rounded-md bg-[#00572D] flex flex-col justify-center items-center shadow-lg">
              <div className="my-3 flex flex-col justify-center items-center">
                <div>비밀번호 수정</div>
                <input
                  className="w-36 h-9 rounded-xl mt-2 text-black"
                  placeholder="기존 비밀번호"
                  type="Password"
                  {...register("oldPassword", {
                    onChange() {
                      clearErrors("result");
                    },
                    minLength: {
                      value: 5,
                      message: "5글자 이상 입력해 주세요",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]/,
                      message: "비밀번호는 영문 대소문자와 포함해야합니다.",
                    },
                  })}
                />{" "}
                <input
                  className="w-36 h-9 rounded-xl mt-2 text-black"
                  placeholder="새 비밀번호"
                  type="Password"
                  {...register("newPassword", {
                    onChange() {
                      clearErrors("result");
                    },
                    minLength: {
                      value: 5,
                      message: "5글자 이상 입력해 주세요",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]/,
                      message: "비밀번호는 영문 대소문자와 포함해야합니다.",
                    },
                  })}
                />
              </div>
            </div>
            <div className="mt-2 text-sm text-red-600 font-extrabold">
              {getPwMessage}
            </div>
            {/*             <div className=" text-white text-sm w-[180px] mt-2 rounded-md bg-[#00572D] flex flex-col justify-center items-center shadow-lg">
              
              {              <div className="my-3 flex flex-col justify-center items-center">
                <div>프로필 소개 수정</div>
                <textarea
                  className="w-36 h-28 rounded-xl mt-2 text-black"
                  style={{ resize: "none" }}
                  rows={3}
                  {...register("introduce", {
                    onChange() {
                      clearErrors("result");
                    },
                    maxLength: {
                      value: 30,
                      message: "30글자 이하로 입력해 주세요",
                    },
                  })}
                />
              </div>}
            </div> */}
            <button
              type="submit"
              className=" text-white text-sm w-[180px] mt-2 rounded-md bg-[#00572D] flex flex-col justify-center items-center shadow-lg"
              disabled={!isValid || loading || !isDirty}
            >
              <div className="my-3 flex flex-col justify-center items-center">
                <div>
                  {loading
                    ? "프로필을 수정중입니다."
                    : data?.httpStatus === 400
                    ? "에러가 있습니다."
                    : errors?.introduce?.message
                    ? errors?.introduce?.message
                    : errors?.oldPassword?.message
                    ? errors?.oldPassword?.message
                    : errors?.newPassword?.message
                    ? errors?.newPassword?.message
                    : "프로필 수정"}
                </div>
              </div>
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;
