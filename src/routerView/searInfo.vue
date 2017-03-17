<template>
	<div>
		<div class="search-result" v-if="!showLoading">共有{{searchResult.length}}条结果</div>
		<ul>
			<li class="id-list-item border1px-bottom" v-for="(song,index) in searchResult" @click="getSongData(song,index)">
				<a href="javascript:;" class="id-name" v-text="song.filename"></a>
				<div class="id-down-cont">
					<a href="javascript:;" class="id-down-icon"></a>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import apiPath from '../config.js'
	import { mapGetters } from 'vuex'
	export default{
		computed:mapGetters(['searchResult','checkWord','showLoading']),
		mounted(){
			this.$nextTick(function(){
				if(!this.checkWord) window.location.hash="/search"
			})
		},
		methods:{
			getSongData(xq,index){
				var hash=xq.hash
				this.$store.dispatch('getSongData',{hash,index})
				this.$store.commit('getSongList',this.searchResult)
				this.$store.dispatch('showPlayer')
			}
		}
	}
</script>

















