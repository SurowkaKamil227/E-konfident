const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Firebase ma pliki .mjs — Metro musi je umieć rozwiązać
config.resolver.sourceExts.push("mjs");

module.exports = config;
