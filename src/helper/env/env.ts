import * as dotenv from 'dotenv';
import * as path from 'path';

export const initEnv = () => {
    dotenv.config({ path: path.resolve(process.cwd(), '.env') });
};