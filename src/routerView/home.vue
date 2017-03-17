<template>
	<div class="home-warp">
		<div class="banner-comp" v-if="!showLoading">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="banner in bannerImgUrl">
						<a href="javascript:;" class="slider-link"><img :src="banner" alt=""></a>
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
		</div>
		<div class="index-sings-list">
			<ul>
				<li class="id-list-item border1px-bottom" v-for='(xg,index) in xgList' @click="getSongData(xg,index)">
					<a href="javascript:;" class="id-name" v-text="xg.filename"></a>
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
	export default{
		data(){
			return {
				xgList:[],
				bannerImgUrl:[]
			}
		},
		computed:mapGetters(['showLoading']),
		mounted(){
			this.$nextTick(function(){
				this.showList()
			})
		},
		updated(){
			this.slides();
		},
		methods:{
			showList(){
				this.$store.commit('showLoading')
				var oDiv=$('<div></div>');
				var xgarr=[];
				var ind=0;
				var bannerList=[];
				var _this=this;
				$.ajax({
					type:'get',
					url:apiPath.delegateUrl+apiPath.kugouRootPath,
					success:function(data){
						oDiv.html(data);
						oDiv.find(".panel-songslist-item").each(function(ind,ele){
							var sonsData=JSON.parse($(ele).find(".panel-songs-item-download em").text())
							xgarr.push(sonsData)
						})
						oDiv.find(".swipe-wrap img").each(function(ind,ele){
							var bannerImgUrl=$(ele).attr('src')
							bannerList.push(bannerImgUrl)
						})
						_this.xgList=xgarr;
						_this.bannerImgUrl=bannerList;
						_this.$store.commit('hideLoading')
					}
				})
			},
			slides(){
				var mySwiper = new Swiper('.swiper-container', {
					loop: true,
					autoplay: 3000,
					speed: 500,
					pagination: '.swiper-pagination',
					autoplayDisableOnInteraction: false,
				})
			},
			getSongData(xq,index){
				var hash=xq.hash
				this.$store.dispatch('getSongData',{hash,index})
				this.$store.commit('getSongList',this.xgList)
				this.$store.dispatch('showPlayer')
			}
		}

	}
</script>