module.exports = {
    devServer: {
        host: '0.0.0.0',
        allowedHosts: ['maemesoft.iptime.org']
    },
    chainWebpack: (config) => {
        const svgRule = config.module.rule('svg')

        svgRule.uses.clear()

        svgRule
            .use('vue-svg-loader')
            .loader('vue-svg-loader')
    }
}
