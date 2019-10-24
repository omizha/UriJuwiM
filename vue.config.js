const fs = require('fs')

module.exports = {
    devServer: {
        host: '0.0.0.0',
        allowedHosts: ['maemesoft.iptime.org'],
        https: {
            key: fs.readFileSync('./server.key'),
            cert: fs.readFileSync('./server.cert')
        }
    },
    chainWebpack: (config) => {
        const svgRule = config.module.rule('svg')

        svgRule.uses.clear()

        svgRule
            .use('vue-svg-loader')
            .loader('vue-svg-loader')
            .options({
                svgo: {
                    plugins: [{ removeDimensions: true }, { removeViewBox: false }]
                }
            })
    }
}
