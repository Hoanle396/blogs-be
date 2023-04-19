export const Common = {
  jwtkey: process.env.JWT_KEY || 'jwtkey',
  jwtExpired: process.env.JWT_EXPIRED || '60m',
  jwtRefreshExpired: process.env.JWT_REFRESH_EXPIRED || '30d',
  GOOGLE_CLIENT_ID:
    process.env.GOOGLE_CLIENT_ID ||
    '970416655854-lshvdvota7og26upes5tij7n9vslke8g.apps.googleusercontent.com'
}

export const ALLOWED_DOMAINS = ['vku.udn.vn']
