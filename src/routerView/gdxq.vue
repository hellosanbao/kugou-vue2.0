<template>
	<div class="heji-warp">
		<div class="topbar-fixed" v-if="!showLoading">
			<div class="top-bar opacted-bar">
			    <i class="top-bar-back" onclick="history.back()"></i>
				<p class="top-bar-title" v-text="pTitle"></p>
			</div>
		</div>
		
		<div class="heji-banner" v-if="!showLoading">
			<a href="javascript:;" class="slider-link"><img :src="banImg" alt=""></a>
		</div>
		<div class="index-sings-list top-change-data">
			<div class="list-js pr" v-if="!showLoading">
				<p class="list-js-text hide-text">《围炉音乐会》是由四川卫视原创出品，北京银河映画制作完成的大型音乐故事秀节目。每周会邀请60—90年代的大咖歌手及其圈内朋友，通过采取歌手自筹演唱会的外景纪实秀，加现场live围炉音乐会的创新模式呈现。并邀请梁翘柏担任音乐总顾问，吉杰担任音乐会主理人，同时节目还配备了一线的编曲团队和顶级乐队，为观众打造豪华的视听盛宴。节目首批录制邀请到的嘉宾有：黎明、费玉清、辛晓琪、张宇、品冠、黄大炜、魏晨、雷颂德等八人，带给了现场观众一场场绝无仅有的视听风暴。</p>
				<div class="show-more"><i></i></div>
			</div>
			<ul>
				<li class="id-list-item border1px-bottom" v-for="(song,index) in songList" @click="getSongData(song,index)">
					<a href="javascript:;" class="id-name" v-text="index+song.filename"></a>
					<div class="id-down-cont">
						<a href="javascript:;" class="id-down-icon"></a>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import apiPath from '../config.js'
	import { mapGetters } from 'vuex'
	export default {
		data(){
			return{
				songList:[],
				banImg:'',
				pTitle:''
			}
		},
		computed:mapGetters(['showLoading']),
		mounted(){
			this.$nextTick(function(){
				this.showList()
			})
		},
		watch:{
			$route(){
				this.songList=[]
				this.showList()
			}
		},
		methods:{
			showList(){
				this.$store.commit('showLoading')
				var _this=this
				var oDiv=$("<div></div>");
				var songList=[];
				$.ajax({
					type:'get',
					url:apiPath.delegateUrl+apiPath.kugouRootPath+"/plist/list/"+_this.$route.params.id,
					success:function(data){
						oDiv.html(data);
						oDiv.find(".panel-songslist-item").each(function(ind,ele){
							var songsMsg=$(ele).find(".panel-songs-item-download em").text();
							songList.push(JSON.parse(songsMsg))
						})
						_this.pTitle=oDiv.find(".page-title").text()
						_this.banImg=oDiv.find(".img-box img").attr('src')
						_this.songList=songList
						_this.$store.commit('hideLoading')
					}
				})	
			},
			getSongData(xq,index){
				var hash=xq.hash
				this.$store.dispatch('getSongData',{hash,index})
				this.$store.commit('getSongList',this.songList)
				this.$store.dispatch('showPlayer')
			}
		}
	}
</script>
<style scoped> 
	.id-list-item .id-name {font-size: 0.9rem;padding-left: 2rem;}
</style>
