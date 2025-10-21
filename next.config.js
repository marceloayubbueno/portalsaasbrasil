/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'upload.wikimedia.org',
    ],
  },
  // Excluir pasta server do build do Next.js
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    }
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [/server/],
      use: 'ignore-loader',
    })
    return config
  },
  // Ignorar erros de TypeScript
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ignorar erros de ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 