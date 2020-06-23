# axios 分解
## AxiosConfigRequest  请求的配置对象
## AxiosResponse 请求返回对象
## XMLHttpRequest 请求对象
  ### readyState
    0	UNSENT	代理被创建，但尚未调用 open() 方法。
    1	OPENED	open() 方法已经被调用。
    2	HEADERS_RECEIVED	send() 方法已经被调用，并且头部和状态已经可获得。
    3	LOADING	下载中； responseText 属性已经包含部分数据。
    4	DONE	下载操作已完成。


# webpack 更新

1. 在webpack 的 devServer 配置中打开 hot 
2. 安装 HotModuleReplacementPlugin ,NamedModulesPlugin 插件
   
```
  devServer: {
    proxy: {
      // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
      // koa 代码在 ./mock 目录中，启动命令为 npm run mock
      '/api': {
        target: 'http://localhost:3000',
        secure: false
      }
    },
    contentBase:resolve(__dirname,'../bin/'), //本地服务器所加载的页面所在的目录
    watchContentBase: true,
    publicPath: '/',
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebook/create-react-app/issues/387.
      disableDotRule: true,
    },
    hot: true,  // 使用热加载插件 HotModuleReplacementPlugin

```

