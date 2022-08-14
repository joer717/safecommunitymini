/**
 * 接口封装
 */
import baseUrl from './config.js'
import tools from '@/utils/tools.js';

function packageHeader(url,header){
	let jztoken = ''
	if(url!=='authcenter/login'){
		jztoken = tools.getStorage('jztoken')
		header.Authorization = jztoken;
	}
	return header;
}
function CheckCode(res){
	let check = true;
	let { data } = res; 
	
	if( data.status !== 200 ){
		check = false;
	}
	let judge = {
		check : check,
		msg : data.message,
		code : data.status
	}
	return judge;
}
function refreshToken(res){
	if(res&&res.data&&res.data.refreshToken){
		tools.setStorage('jztoken',res.data.refreshToken) 
	}
}

const request = async (url = '', params = {}, type = 'GET', header = {
}) => {
	//配置隐藏loading
	params['hideloading'] = params['hideloading']?params['hideloading']:false;
	
	if(!params['hideloading']){
		uni.showLoading();
	}
	
	if(url!=='authcenter/login'){
		header.Authorization = await tools.getStorage('jztoken')
	}
    return new Promise((resolve, reject) => {
        uni.request({
            method: type,
            url: baseUrl + url,
            data: params,
            header: header,
            dataType: 'json'
        }).then((response) => {
            setTimeout(function() {
                uni.hideLoading();
            }, 200);
            let [error, res] = response; 
			let judge = CheckCode(res);
			if(judge.check==false){
				uni.showToast({
					title: judge.msg,
					icon: 'none',
					duration: 2000
				})	
				if(judge.code==50014){
					uni.navigateTo({
						url: '/pages/login/index'
					})
				}
				return;
			}
			refreshToken(res);
			resolve(res);
        }).catch(error => {
			console.log(res)
			uni.showToast({
				title: '服务器维护中，请稍后联系客服',
				icon: 'none',
				duration: 2000
			})			
            let [err, res] = error;
			reject(err)
        })
    })
}
export default request