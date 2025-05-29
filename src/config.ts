import dotenv from 'dotenv';

dotenv.config(); // Ensure this is called at the top of the file

export const config = {
  port: process.env.PORT || 3000,
  moovBasePath: process.env.MOOV_BASE_PATH || '',
  moovClientId: process.env.MOOV_CLIENT_ID || '',
  moovClientSecret: process.env.MOOV_CLIENT_SECRET || '',
  userId: process.env.USER_ID || '', // Ensure this is correctly loaded
};

if (!config.moovClientSecret) {
  console.error('MOOV_CLIENT_SECRET environment variable is not set.');
  process.exit(1);
}

if (!config.userId) {
  console.error('USER_ID environment variable is not set.');
  process.exit(1);
}
