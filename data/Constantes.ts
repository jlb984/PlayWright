import dotenv from 'dotenv';
dotenv.config();

export const URLS = {
    SAUCEDEMO_BASE_URL: process.env.SAUCEDEMO_BASE_URL as string
}

export const CREDENCIALES = {
    SAUCEDEMO_USR_STANDAR:process.env.SAUCEDEMO_USR_STANDAR as string,
    SAUCEDEMO_USR_PROBLEM:process.env.SAUCEDEMO_USR_PROBLEM as string,
    SAUCEDEMO_PASSWORD:process.env.SAUCEDEMO_PASSWORD as string
}