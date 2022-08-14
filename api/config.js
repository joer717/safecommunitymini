/**
 * 接口环境配置文件
 */
let baseUrl = ""
if (process.env.NODE_ENV === 'development') {
	baseUrl = 'https://www.liuyan.store/'  // 开发环境
} else {
	baseUrl = 'https://www.liuyan.store/' // 生产环境
}
export default baseUrl
