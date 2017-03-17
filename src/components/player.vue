<template>
	<div class="player">
		<audio :src="currentData.songData.songUrl" autoplay id="audioPlay" @timeupdate="" @ended="" @error=""></audio>
		<div class="bot-player">
			<div class="warp pr">
				<a onclick="window.location.hash='songPage'" class="song-msg">
					<div class="play-avat"><img :src="currentData.songData.imgUrl" alt=""></div>
					<div class="play-msg">
						<p class="play-til" v-text="currentData.songData.title"></p>
						<p class="play-er" v-text="currentData.songData.singer"></p>
					</div>
				</a>
				<div class="play-control">
					<i class="song-close" :class="{'song-start':(isPlay&&isReadyPlay),'songLoading':!isReadyPlay}" @click="togglePlay()"></i>
					<i class="song-next" @click='next()'></i>
					<i class="song-download"></i>
				</div>
			</div>
		</div>
	</div>
	
</template>
<script>
	import { mapGetters } from 'vuex'
	export default {
		computed:mapGetters(['currentData','isPlay','isReadyPlay','canMove']),
		mounted(){
			this.isreadyPlay()
		},
		watch:{
			isPlay:function(nval,oval){
				this.checkstate()
				return nval;
			}
		},
		methods:{
			next(){
				this.$store.dispatch('next')
			},
			togglePlay(){
				this.$store.commit("togglePlay")
			},
			checkstate(){
				var audio=document.getElementById("audioPlay")
				audio.preload='auto'
				if(this.isPlay){
					if(this.isReadyPlay)
						audio.play()
				}else{
					audio.pause()
				}
			},
			isreadyPlay(){
				var audio=document.getElementById("audioPlay")
				var _this=this
				audio.oncanplay = function() {
            		_this.$store.commit('isReadyPlay')
        		}
				audio.onended=function(){
					_this.next()
				}
				audio.onwaiting=function(){
					_this.$store.commit('unReadPlay')
				}
				audio.onplaying=function(){
					_this.$store.commit('isReadyPlay')
				}
				audio.ontimeupdate=function(){
					if(!_this.canMove){
						var time=audio.currentTime
						_this.$store.commit('getCurrentTime',time)
					}else{
						audio.currentTime=_this.currentData.songData.currentLength
					}
					
				}
			}
		}
	}

</script>

<style scoped>
	.player{height: 4.7rem}
</style>