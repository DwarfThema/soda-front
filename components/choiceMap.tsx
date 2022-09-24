import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IChoiceMap {
  [key: string]: any;
  img: string;
  cat: string;
  selected: Dispatch<SetStateAction<number>>;
  getSelected: number;
}

const ChoiceMap = ({ img, cat, selected, getSelected }: IChoiceMap) => {
  const [getSelect, setSelect] = useState(false);

  const [getFav, setFav] = useState([]);

  console.log(getFav);
  //cat 를 활용해서 취향 데이터 던져줘야함

  return (
    <div className="flex items-center justify-center ">
      {getSelect ? (
        <>
          <button
            onClick={() => {
              setSelect(false);
              selected(getSelected - 1);
            }}
          >
            <div className="w-3 h-3 bg-red-600 rounded-full" />
            <img className={"rounded-md "} src={img} />
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              setSelect(true);
              selected(getSelected + 1);
            }}
          >
            <img className="rounded-md" src={img} />
          </button>
        </>
      )}
    </div>
  );
};

export default ChoiceMap;
