const DASHBOARD_URL: string =
  import.meta.env.VITE_DASHBOARD_URL || 'https://app.clickstream.manishb.in';

export const APP_URLS = {
  dashboard: DASHBOARD_URL,
  login: `${DASHBOARD_URL}/login`,
  signup: `${DASHBOARD_URL}/signup`,
};
