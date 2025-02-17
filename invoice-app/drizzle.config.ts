import {defineConfig} from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({
	path: './.env.local',
});

if (typeof process.env.XATA_DABASE_URL !== 'string') {
	throw new Error('Please set your process.env.XATA_DABASE_URL');
}

export default defineConfig({
	out: './src/db/migrations',
	schema: './src/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.XATA_DABASE_URL,
	},
});
