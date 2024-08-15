import fs from 'fs/promises';
import { ApiError } from './api-error';

export const removeFile = async (filePath: string): Promise<void> => {
  try {
    await fs.unlink(filePath);
    console.log(`File ${filePath} removed successfully.`);
  } catch (error) {
    console.error(`Error removing file ${filePath}: Error: ${error.message}`);
    throw new ApiError(400, `Error removing file ${filePath}: Error: ${error.message}`)
  }
};
