// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Рекомендуется
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.myanimelist.net',
        port: '',
        pathname: '/**',
      },
      // Если вы используете placeholder с другого домена, добавьте его сюда
    ],
  },
  // ... другие ваши настройки
};

export default nextConfig;