import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

export const initFav = atom<[]>({
  key: "initFav",
  default: [],
});
