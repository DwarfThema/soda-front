/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  async headers() {
    return [
      {
        source: "/about",
        // 해당 위에 헤에 넣을 링크 넣기
        headers: [
          {
            key: "x-custom-header",
            //헤더 키  이름 확인
            value: "my custom header value",
            //저장할 벨류 넣기
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
