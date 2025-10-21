/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'upload.wikimedia.org',
    ],
  },
  // Excluir pasta server do build do Next.js
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/server/**', '**/node_modules/**'],
    }
    return config
  },
  // Excluir arquivos do backend
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  exclude: ['server/**/*'],
}

module.exports = nextConfig 