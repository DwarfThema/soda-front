/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  async headers() {
    const token = localStorage.getItem("Authorization") || "";
    return [
      {
        source: "/*",
        // 해당 위에 헤에 넣을 링크 넣기
        headers: [
          {
            key: "Authorization",
            //헤더 키  이름 확인
            value: token,
            //저장할 벨류 넣기
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
