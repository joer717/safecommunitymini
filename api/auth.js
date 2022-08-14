/**
 * 登录封装
 */
import {encryptDes} from './DES.js';
import {parseTime} from '@/utils/time.js';
import tools from '@/utils/tools.js';
import request from './request.js'
const date = Date.parse(new Date())
const key = '&' + parseTime(date , '{y}-{m}-{d}')


/**
 * 
 * @param {*} userName 
 * @param {*} passWord 
 */
export const login = async (userName , passWord, jumpurl1,jumpurl2) =>{
	
	await request('authcenter/login',{
		'userName':userName,
		'password':encryptDes(passWord,key),
	},'POST').then(async (res)=>{
		let {data} = res;
		await tools.setStorage('jztoken',data.body.token) 
		await tools.setStorage('enterpriseId',data.body.state.enterpriseId) 
		if(data.body.state.enterpriseId === '107934321265889280'){//金证人
			if(jumpurl2){
				uni.redirectTo({
					url:jumpurl2
				});
			}
		}else{
			if(jumpurl1){
				uni.redirectTo({
					url:jumpurl1
				});
			}
		}
		
	})
}
/**
 * 
 * @param {*} code 
 */
export const loginByWx = async (code, jumpurl1,jumpurl2) =>{
	await request('/authcenter/loginByWx',{
		'code':code,
	},'POST').then(async (res)=>{
		let {data} = res;
		console.log(res)
		await tools.setStorage('jztoken',data.body.token) 
		await tools.setStorage('enterpriseId',data.body.state.enterpriseId) 
		//console.log(tools.getStorage('enterpriseId'))
		if(data.body.state.enterpriseId === '107934321265889280'){//金证人
			if(jumpurl2){
				uni.redirectTo({
					url:jumpurl2
				});
			}
		}else{
			if(jumpurl1){
				uni.redirectTo({
					url:jumpurl1
				});
			}
		}
	})
}

