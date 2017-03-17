<template>
	<div class="songPage">
		<div class="songPage-bg" :style="{'background-image':'url('+currentData.songData.imgUrl+')'}">
			<div class="zz-box"></div>
		</div>
		<div class="top-bar opacted-bar">
			<i class="top-bar-back" onclick="history.back()"></i>
			<p class="top-bar-title" v-text="currentData.songData.title"></p>
		</div>
		<div class="singer-avat">
			<img :src="currentData.songData.imgUrl" alt="">
		</div>
		<!-- 歌词s -->
		<div class="lyrc">
			<div class="lyrc-content">
				<p v-for="(lyrc,index) in currentData.songData.lyrc">{{lyrc | lyrctxt}}</p>
			</div>
		</div>
		<!-- 歌词e -->
		<div class="range-warp">
			<div class="range-content"><i class="rang-mark"></i><p class="range-value"></p></div>
			<span class="cur-time">{{currentData.songData.fomartCurrentLength}}</span><span class="total-time">{{currentData.songData.fomartSongLength}}</span>
		</div>
		<div class="play-operate">
			<i class="btn-prev" @click="prev()"></i>
			<i class="btn-pause" :class="{'btn-play':(isPlay&&isReadyPlay&&!canMove),'songLoading':!isReadyPlay&&!canMove}" @click="togglePlay()"></i>	
			<i class="btn-next" @click="next()"></i>
		</div>
	</div>
</template>
<script>
	import apiPath from '../config.js'
	import { mapGetters } from 'vuex'
	export default {
		computed:mapGetters(['currentData','isPlay','isReadyPlay','canMove']),
		filters: {
			lyrctxt(value){
				if(value){
					return value.substr(8)
				}else{
					return 'gg了，暂无歌词 ^_^!'
				}
				
			}
		},
		mounted(){
			this.$nextTick(function(){
				this.redir()
				this.changeTime()
			})
		},
		watch:{
			currentData:{
				handler: function (nval,oval) {
					var width=(nval.songData.currentLength/this.currentData.songData.songLength)*100+"%"
					$(".range-value").css({width})
					$(".rang-mark").css({left:$(".range-value").width()})
					this.aniLyrc()
				},
				deep: true
			}
		},
		methods:{
			redir(){
				var width=(this.currentData.songData.currentLength/this.currentData.songData.songLength)*100+"%"
				$(".rang-mark").css({left:width})
				$(".range-value").css({width})
				if(this.currentData.songData.songLength===undefined){
					window.location.hash="/"
				}
				if(this.currentData.songData.songLength==this.currentData.songData.currentLength){
					$(".range-value").css({width:0})
				}
			},
			next(){
				this.$store.dispatch('next')
				$(".lyrc-content").css({ top: 0});
			},
			prev(){
				this.$store.dispatch('prev')
				$(".lyrc-content").css({ top: 0});
			},
			togglePlay(){
				this.$store.commit("togglePlay")
			},
			changeTime(){
				var _this=this
				var rangMark=$(".rang-mark"),rangValue=$(".range-value"),rangeContent=$(".range-content"),canMove=false
				rangMark.on('touchstart',function() {
					_this.$store.commit('canMove')
				});
				rangMark.on('touchend',function() {
					_this.$store.commit('unMove')
				});
				rangeContent.on('touchmove',function(e){
					var event=e.targetTouches[0],winw=$(window).width(),rangw=$(this).width(),trimw=(winw-rangw)/2; 
					var currentw=event.clientX-trimw
					if(currentw<0){
						currentw=0
					}else if(currentw>rangw){
						currentw=rangw
					}
					var songLength=_this.currentData.songData.songLength;
					var time=songLength*(currentw/rangw)
					_this.$store.commit("getCurrentTime",time)
				})
			},
			aniLyrc(){
				var _this=this
					var currentTime = _this.currentData.songData.fomartCurrentLength
					$.each(_this.currentData.songData.lyrc, function(ind, ele) {
						var formatTime = ele.substr(0, 5)
						var _h = $(".lyrc-content p").height()
						var curind=(ind-1)>0?(ind-1):0
						if (currentTime == formatTime) {
							$(".lyrc-content").css({ top: -(curind * _h) });
							$(".lyrc-content p").eq(ind).prev().removeClass('curLyrc')
							$(".lyrc-content p").eq(ind).addClass('curLyrc')
						}
					})
				}
		}
	}
</script>
