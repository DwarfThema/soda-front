import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { initFav } from "./stateManager";

interface IChoiceMap {
  [key: string]: any;
  img: string;
  cat: string;
  id: number;
  selected: Dispatch<SetStateAction<number>>;
  getSelected: number;
}

const ChoiceMap = ({ img, cat, selected, getSelected, id }: IChoiceMap) => {
  const [getSelect, setSelect] = useState(false);

  const [getFavArray, setFavArray] = useRecoilState(initFav);
  //console.log(getFav);
  //cat 를 활용해서 취향 데이터 던져줘야함
  const [enter, { loading, data }] = useMutation(
    "https://mtvs.kro.kr:8001/favorite"
  );

  console.log(data);

  useEffect(() => {
    if (getFavArray.length >= 5) {
      console.log(getFavArray);

      enter(getFavArray);
    }
  }, [getSelect]);

  return (
    <div className="flex items-center justify-center " key={id}>
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
              setFavArray((current: [number]) => [...current, id]);
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
