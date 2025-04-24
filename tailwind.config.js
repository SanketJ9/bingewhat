module.exports ={
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
            },
        },
        extend: {
            colors: {
                background: "#061920",
                primary: "#0b3546",
                secondary: "#3cd293",
                accent: "#fbbf24",
                neutral: "#374151",
                "base-100": "#ffffff",
                info: "#3abff8",
                success: "#36d399",
                warning: "#fbbd23",
                error: "#f87272",
            },
        },
    },
    plugins: [],
}