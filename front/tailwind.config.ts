import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                fondo: "#0f0e0e",
                input: "#232426",
                bluee: "#60879e",
                redd: "#c36961",
                greenn: "#609e87",
                orangee: "#d79551",
                blackk: "#2c2c2c",
                whitee: "#f5eee1",
                greyy: "#c4c0c2",
                brownn: "#583e26",
            },
            backdropFilter: {
                none: "none",
                blur: "blur(20px)",
            },
        },
    },
    plugins: [],
};
export default config;
