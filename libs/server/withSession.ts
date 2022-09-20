import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

const cookieOpts = {
  cookieName: "carrotsession",
  password: process.env.COOKIE_PASSWORD!,
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOpts);
  //iron session에게 req 오브젝트를 제공해서 ironsession 은 쿠키를 갖고온뒤 쿠키를 해독하고 쿠키결과를 req?.session.user 내부에 넣어주는 기능
}

export function withSsrSession(handler: any) {
  return withIronSessionSsr(handler, cookieOpts);
  //getServerSideProps 에서 사용 할 수 있도록 SSR 에서 Auth 를 받아오는 function
}
