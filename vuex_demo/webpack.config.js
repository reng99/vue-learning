module.exports = {
  // 要转换的文件
  entry:"./src/main.js",
  // 输出的目标文件
  output:{
    path:__dirname,
    // 输出的目标的文件名
    filename:"dist/build.js"
  },
  // 定义对模块的处理的逻辑
  module:{
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  }
}
