import type { Config } from "tailwindcss";
import flowbite from "flowbite/plugin";

const config: Config = {
    darkMode: "class",
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        "./node_modules/flowbite/**/*.js",
        "./node_modules/flowbite-react/lib/**/*.js"
    ],
    theme: {
        extend: {},
    },
    plugins: [flowbite],
};

export default config;