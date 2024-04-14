// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname, { isCSSEnabled: true });
defaultConfig.resolver.sourceExts.push('cjs');

module.exports = withNativeWind(defaultConfig, { input: './global.css' });
