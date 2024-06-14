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
                blue: "#60879e",
                red: "#c36961",
                green: "#609e87",
                orange: "#d79551",
                bla: "#2c2c2c",
                whi: "#f5eee1",
                grey: "#c4c0c2",
                brown: "#583e26",
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
