// postcss 的配置文件 它是基于node.js运行的一个处理css的工具
// postcss-pxtorem将像素转成rem
// autoprefixer自动添加浏览器相关的声明前缀
module.exports = {
  // 配置需要使用的相关差价
  plugins: {
    // autoprefixer: {
    //   // browsers用来配置要兼容到的系统（浏览器）环境
    //   // 这个配置没有问题，但是写到这里会警告 cli是通过.browserslistrc来配置
    //   // browsers: ['Android >= 4.0', 'IOS >= 8']
    // },
    'postcss-pxtorem': {
      // Vant组件库是基于375宽写的
      // 移动端页面都是以iPhone 6/7/8 为原型设计的
      rootValue: 37.5,
      // 需要转换的css属性 * 就是所有属性都要转换
      propList: ['*']
    }
  }
}
