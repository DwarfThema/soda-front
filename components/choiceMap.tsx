import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { initFav } from "./stateManager";

interface IChoiceMap {
  [key: string]: any;
  img: string;
  cat: string;
  id: number;
  selected: Dispatch<SetStateAction<number>>;
  getSelected: number;
  key: number;
}

const ChoiceMap = ({
  img,
  cat,
  selected,
  getSelected,
  key,
  id,
}: IChoiceMap) => {
  const [getSelect, setSelect] = useState(false);

  const [getFavArray, setFavArray] = useRecoilState(initFav);
  const [enter, { loading, data }] = useMutation(
    "https://mtvs.kro.kr:8001/favorite"
  );

  useEffect(() => {
    if (getFavArray.length >= 5) {
      enter(getFavArray);
    }
  }, [getSelect]);

  return (
    <div className="flex items-center justify-center" key={key}>
      {getSelect ? (
        <>
          <button
            className="w-full h-full "
            onClick={() => {
              setSelect(false);
              selected(getSelected - 1);
              setFavArray((state: any) => {
                return state.filter((element: number) => element != id);
              });
            }}
          >
            <div
              className="rounded-md bg-cover bg-center h-[300px] w-full flex "
              style={{
                backgroundImage: `url(${img})`,
              }}
            >
              <div
                className="h-[300px] w-full backdrop-blur-md text-white flex justify-center items-center text-[30px] "
                style={{
                  textShadow: "2px 2px 4px black",
                }}
              >
                <div>{cat}</div>
              </div>
            </div>
          </button>
        </>
      ) : (
        <>
          <button
            className={cls("w-full h-full ")}
            onClick={() => {
              setSelect(true);
              selected(getSelected + 1);
              setFavArray((current: any) => [...current, id]);
            }}
          >
            <div
              className="rounded-md bg-cover bg-center h-[300px] w-full "
              style={{
                backgroundImage: `url(${img})`,
              }}
            ></div>
          </button>
        </>
      )}
    </div>
  );
};

export default ChoiceMap;
