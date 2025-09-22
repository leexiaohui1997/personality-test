export default {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 100, // 根元素字体大小，通常是16px
      propList: ['*'], // 需要转换的属性，*表示所有属性
      selectorBlackList: ['.ignore', '.hairlines'], // 不转换的选择器
      replace: true, // 是否替换属性值
      mediaQuery: false, // 是否转换媒体查询中的px
      minPixelValue: 1, // 最小转换的像素值
      exclude: /node_modules/i, // 排除node_modules目录
    },
  },
};
