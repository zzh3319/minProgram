1.先安装nodejs
2.npm install wepy-cli -g
3.npm install -g @mindev/min-cli
4.npm i
5.min update

saas入口配置：
set SAASCONFIG=ST

开发启动：
npm run dev 或者 wepy build -w

生产环境打包：
npm run build

生产环境打包 设置入口并打包
set SAASCONFIG=ST && npm run build

在 dos里  set SAASCONFIG=ST
并且 在dos里 启动

备注：
url上的传参，orderNo 是指订单id orderId