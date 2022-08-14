/**
 * 工具类
 */
export default class tools {
	/**
	 * 存储本地Storage
	 * @param {string} key
	 * @param {Object} value
	 */
	static setStorage(key, value) {

		return new Promise(function(resolve, reject) {
			uni.setStorage({
				key: key,
				data: value,
				success: function(res) {
					resolve(res.data);
				},
				fail: function(error) {
					reject(error);
				}
			})
		})

	}

	/**
	 * 获取本地Storage
	 * @param {string}
	 * @returns {Object}
	 */
	static getStorage(key) {
		return new Promise(function(resolve, reject) {
			uni.getStorage({
				key: key,
				success: function(res) {
					resolve(res.data);
				},
				fail: function(error) {
					resolve('');
				}
			})
		})
	}
}
