import { cls } from "@libs/client/utils";
import Link from "next/link";

interface INavPosProb {
  home?: boolean;
  likes?: boolean;
  create?: boolean;
  profile?: boolean;
  mobile?: boolean;
}

const NavBar = ({ home, likes, create, profile, mobile }: INavPosProb) => {
  const strokeWidth = "2";

  return (
    <>
      <div
        className={cls(
          " w-full bottom-0 flex items-end z-30",
          mobile ? "fixed bottom-0" : "absolute"
        )}
      >
        <div
          className="w-full h-[85px] rounded-t-xl rounded-b-md bg-white"
          style={{ boxShadow: "0px -3px 10px rgba(1,1,1,0.3)" }}
        >
          <div className="mt-3  w-full flex justify-around items-center">
            <div style={{ color: home ? "#00572D" : "#CCCCCC" }}>
              <Link href={"/"}>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </a>
              </Link>
            </div>
            <div style={{ color: likes ? "#00572D" : "#CCCCCC" }}>
              <Link href={"/likes"}>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </a>
              </Link>
            </div>
            <div style={{ color: create ? "#00572D" : "#CCCCCC" }}>
              <Link href={"/create"}>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>
              </Link>
            </div>
            <div style={{ color: profile ? "#00572D" : "#CCCCCC" }}>
              <Link href={"/profile"}>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
