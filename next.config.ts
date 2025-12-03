/** @type {import('next').NextConfig} */
const nextConfig = {
  // Эта строка говорит Next.js создать статическую версию сайта
  output: 'export',

  // ВАЖНО: S3 не умеет оптимизировать картинки "на лету",
  // как это делает сервер Next.js. 
  // Эта настройка отключает оптимизацию через <Image>
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig