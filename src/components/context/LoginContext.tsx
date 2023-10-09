import React, { createContext, useState, useEffect } from 'react';

export const LoginContext = createContext(null);

const connectWallet = async () => {
    console.log('Requesting account...')
}