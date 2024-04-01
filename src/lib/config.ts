const conf = {
  environment: String(process.env.NEXT_PUBLIC_ENVIRONMENT),
  googleAnalyticsId: String(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID),
  googleTagManagerId: String(process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID),
};

export default conf;
