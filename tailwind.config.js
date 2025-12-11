/** @type {import{'tailwindcss'}.Config} */

module.exports = {
    content: ["./app/**/*.{js, jsx, ts, txs}"],
    theme: {
        extends: {
              colors: {
                'theme-black-backgound': '#000',
                'theme-white-background': '#fafafa',
                'black': '#121212',
                'white': '#eeeeee',
                'gray': {
                    50: '#404040',
                    200: '#393E46'
                },
                'lime': {
                    200: '#1CF01E'
                },
            }   

        },
        plugins: {}
    }
}