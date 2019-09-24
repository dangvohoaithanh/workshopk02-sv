import env from 'src/environments/.env';
export const environment = {
  HTTP_PROXY: true,
  version: env.npm_package_version,
  serverUrl: 'localhost:4200',
  defaultLanguage: 'en-US',
  supportedLanguages: [
    'en-US',
    'vi-VN',
    'ja-JP'
  ]
};
