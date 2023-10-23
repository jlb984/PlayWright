import dotenv from 'dotenv';
dotenv.config();

export const URLS = {
    SAUCEDEMO_BASE_URL: process.env.SAUCEDEMO_BASE_URL
}

export const CREDENCIALES = {
    SAUCEDEMO_USR_STANDAR:process.env.SAUCEDEMO_USR_STANDAR,
    SAUCEDEMO_USR_PROBLEM:process.env.SAUCEDEMO_USR_PROBLEM,
    SAUCEDEMO_PASSWORD:process.env.SAUCEDEMO_PASSWORD
}