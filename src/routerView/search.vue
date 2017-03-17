<template>
	<div class="gsxq-warp">
		<div class="topbar-fixed">
			<div class="top-bar">
				<i class="top-bar-back" onclick="history.back()"></i>
				<p class="top-bar-title">搜索</p>
			</div>
		</div>
		<div class="clear-top-fix">
			<div class="clear-nav"></div>
		</div>
		<div class="search-box">
			<div class="input-cont">
				<span class="search-icon"></span>
				<input type="text" v-model="inputWord" class="search-input" placeholder="歌手/歌名/拼音">
			</div>
			<span class="search-btn" @click="checkKey(inputWord)">搜索</span>
		</div>
		<router-view class="ph-items-list"></router-view>
	</div>
</template>

<script>
	import apiPath from '../config.js'
	import { mapGetters } from 'vuex'
	export default{
		data(){
			return{
				inputWord:''
			}
		},
		computed:mapGetters(['checkWord']),
		mounted(){
			this.$nextTick(function(){
				this.checkWord=""
			})
		},
		watch:{
			checkWord(nval,oval){
				this.inputWord=nval
			}
		},
		methods:{
			checkKey(val){
				this.searWord=val
				this.$store.commit('checkWord',val)
				window.location.hash="/search/info"
			}
		}
	}
</script>

<style>
	.id-list-item .id-name{
		padding-left: 1.1rem;
		font-size: 1.1rem;
	}
	.top-bar .top-bar-title{
		font-size: 1.15rem;
	}
	.search-result{
		height: 1.8rem;
		line-height: 1.8rem;
		background: #E6E6E6;
		padding-left: .9rem;
		font-size: .7857rem;
		color: #5d5d5d;
	}
</style>
