<template>
  <view class="page-bg">
	<navTop></navTop>
    <view class="main-container">
      <view class="tl-panel">
		<uni-search-bar placeholder="请输入你想搜索的内容" @confirm="search" :focus="true" v-model="searchValue" @blur="getSearchTitleBlur" @focus="getSearchTitleFocus" @input="getSearchTitle"
			@cancel="cancelSearch" @clear="clear">
		</uni-search-bar>
      </view>
      <view class="tl-history">
       <!-- <view class="tl-flex tl-flex-between">
          <view class="tl-font">最近搜索</view>
          <view class="tl-img">
            <image src="https://file.genepre.com/wechat/shanchu.png" class="tl-img-44"/>
          </view>
        </view>

        <view class="tl-flex tl-flex-wrap tl-flex-l">
          <view class="tl-tag-192" v-for="(item,index) in 5" :key="index">web前端</view>
        </view> -->
        <view class="tl-section-list" v-if="isShowTitle">
			<view >
				<view  class="tl-list-item" v-for="(item,index) in searchTitleData" :key="index">
				    <!-- 包含高亮的字段 -->
				    <rich-text :nodes="lingHeight(item)" @click="getItemDetail"></rich-text>
				  </view>
			</view>
			<!-- <view v-else>
			  <fq-empty :emptyImg="emptyImg" :imgStyle="imgStyle" :emptyText="emptyText"/>
			 </view> -->
		</view>
       	  <view v-else>
			  <block v-if="searchType === 'knowledge'">
       		  <block  v-for="(knowledge , index) in knowledgeListData" :key="knowledge.knowledgeTypeId">
       		  	<developmentSecurity 
       		  		@updateKnowledge="updateKnowledge"
       		  		@updateKnowledgeRead="updateKnowledgeRead"
       		  		:index="index" 
					:isSearch="isSearch"
       		  		:knowledge="knowledge">
       		  	</developmentSecurity>
       		  </block>
			  </block>
			   <block v-if="searchType === 'video'">
				 <block  v-for="(videoItem, index_) in videoListData" :key="index_">
					<videoCourse 
						:index='index_' 
						:isSearch="isSearch"
						:videoItem="videoItem"
						@updateVideoItem="updateVideoItem"
						@updateVideoItemRead="updateVideoItemRead"
						@jumpVideoItem='jumpItem' 
						>
					</videoCourse>
				 </block>
			 </block>
       	  </view>
      </view>

    </view>
  </view>
</template>

<script>
import navTop from "@/components/navTop.vue"
import developmentSecurity from './developmentSecurity.vue'
import videoCourse from './videoCourse.vue'
export default {
	components:{
			navTop,
			developmentSecurity,
			videoCourse
	},
  data() {
    return {
	  searchType:'',
	  searchWidth:'100%',
	  searchValue:'',
      emptyImg: 'https://file.genepre.com/wechat/nomsg7.png',
      emptyText: '暂无搜索结果',
      keyword: '',
      actionStyle: {
        color: '#333',
        fontsize: '32rpx'
      },
      imgStyle: {
        width: '254rpx',
        height: '230rpx'
      },
      historyList: [], // 本地搜索记录
      contactsList: [], // 搜索的处理结果
	  searchTitleData:[],
	  knowledgeListData:[],
	  videoListData:[],
	  isShowTitle:true,
	  isSearch:true,
	  type:0,
	  size:15,
	  index:1,
    }
  },
  onReachBottom () {
		this.index++
		this.getItemDetail()
  },
  onLoad(options) {
  	this.searchType = options.typeVal
  },
  onShow: function () {
	  //刷新点赞阅读数据
	  if(this.searchValue){
		this.getItemDetail()
	  }
   },
  methods: {
	  /**
	   * 
	   * 获取搜索词条列表
	   */
	  async getSearchTitle(){
	      if(!this.searchValue){return []}
		  let searchTitleData = this.searchType === 'knowledge'? await this.$request(`/knowledge/knowledge/kInfoApp/recommended/${this.searchValue}`,{
		  },'GET'):await this.$request(`/video/video/vInfoApp/recommended/${this.searchValue}`,{
		  },'GET');
		  this.searchTitleData = searchTitleData.data.body
	  },
	  cancelSearch(){
		  this.searchTitleData = []
	  },
	  getSearchTitleFocus(){},
	  getSearchTitleBlur(){},
	  lingHeight(text){
		  let  lineHeightStr = `<span style="color:red">${this.searchValue}</span>`
		  const reg = new RegExp(this.searchValue,'gi')
		  return text.replace(reg,lineHeightStr)
	  },
	  async getItemDetail(){
		  this.isShowTitle = false
		  if(this.searchType === 'knowledge'){
			let knowledgeListData =await this.$request(`/knowledge/knowledge/kInfoApp/getlistFromES/${this.type}/${this.size}/${this.index}/${this.searchValue}`,{
			},'GET')
			if(this.index === 1){
               this.knowledgeListData =knowledgeListData.data.body.list
			}else{
			   this.knowledgeListData =this.knowledgeListData.concat(knowledgeListData.data.body.list)
			}  
		  }
		  if(this.searchType === 'video'){
		     let videoListData = await this.$request(`/video/video/vInfoApp/getlistFromES/${this.type}/${this.size}/${this.index}/${this.searchValue}`,{
		     },'GET');
		  	if(this.index === 1){
		       this.videoListData =videoListData.data.body.list
		  	}else{
		  	   this.videoListData =this.videoListData.concat(videoListData.data.body.list)
		  	}  
		  }
		   
		 
	  },
	  /**
	   * @param {Object} index 在数据中下标	
	   * 更新列表阅读量
	   */
	  updateKnowledgeRead(index){
	  	this.videoListData[index]['readNumber'] = this.videoListData[index]['readNumber']+1
	  },
	  /**
	   * @param {Object} likeCollect 是点赞还是收藏
	   * @param {Object} index 在数据中下标	
	   * @param {Object} state 状态
	   * 更新列表点赞 收藏数据
	   */
	  updateKnowledge(likeCollect,index,state,updateNum){
	  	this.videoListData[index][likeCollect] = state
	  	if(state){
	  		this.videoListData[index][updateNum] = this.videoListData[index][updateNum]+1
	  	}else{
	  		this.videoListData[index][updateNum] = this.videoListData[index][updateNum]-1
	  	}
	  },
	  /**
	   * @param {Object} index 下标
	   */
	  updateVideoItemRead(index){
	  	this.videoListData[index]['readNumber'] = this.videoListData[index]['readNumber']+1
	  },
	  /**
	   * @param {Object} likeCollect 收藏还是点赞
	   * @param {Object} index 下标
	   * @param {Object} state 状态
	   * @param {Object} num 修改数量
	   */
	  updateVideoItem(likeCollect,index,state,num){
	  	this.videoListData[index][likeCollect] = state
	  	if(state){
	  		this.videoListData[index][num] = this.videoListData[index][num]+1
	  	}else{
	  		this.videoListData[index][num] = this.videoListData[index][num]-1
	  	}
	  },
	  /**
	   * @param {Object} pageurl
	   * 跳转自组件事件
	   */
	  jumpItem(pageurl){
	  	uni.navigateTo({
	  		url: pageurl
	  	})
	  },
    confirm() {
      let that = this
      app.search({}, (res) => {
        if (res.code == 0) {
          // 过滤出符合条件的值高亮
          res.data.map((item, index) => {
            if (item.name.includes(that.keyword)) {
              item.name = that.join(item.name, that.keyword)
            }
          })
          that.contactsList = res.data
        } else {
          app.showToast(res.message)
        }
      })
    },

    // 拼接
    join(str, key) {
      var reg = new RegExp(`(${key})`, 'gm')
      var replace = '<span style="color:#2851F3">$1</span>'
      return str.replace(reg, replace)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-bg {
  width: 100vw;
  height: 100vh;
  background-size: 750rpx auto;
  background-color: #F9F9F9;
}

.main-container {
  width: 686rpx;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.active{
	color: royalblue;
}
.tl-history{
	overflow-y: auto;
	margin-top: 100rpx;
	.tl-font{
		width: 200rpx;
		float: left;
		display: inline-block;
	}
	.tl-img{
		width: 100rpx;
		float: right;
		display: inline-block;
	}
	.tl-flex-wrap{
		padding-top: 10rpx;
		clear: both;
	}
}
.tl-panel{
  width: 686rpx;
  //width: 92%;
  background: white;
  position: fixed;
  margin-bottom:10rpx;
}
.tl-img-44{
  width: 44rpx;
  height: 44rpx;
}
.tl-tag-192{
  width: 192rpx;
  height: 64rpx;
  line-height: 64rpx;
  background: rgba(255, 255, 255, 0.39);
  border: 2rpx solid #F5F5F5;
  text-align: center;
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 400;
  color: #333333;
  border-radius: 32rpx;
  margin-right: 28rpx;
  margin-bottom: 28rpx;
  display: inline-block;
}
.tl-list-item{
  height: 98rpx;
  line-height: 98rpx;
  font-size: 30rpx;
  font-family: PingFang SC;
  font-weight: 400;
  color: #999999;
  border-bottom: 2rpx solid #EFEFEF;
}

</style>