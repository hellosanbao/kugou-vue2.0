<template>
	<div>
		<div class="hot-ser"><span>热门搜索</span></div>
		<ul>
			<li tag="li" class="id-list-item border1px-bottom" v-for="srae in searList" @click="checkKey(srae.key)">
				<a href="javascript:;" class="id-name" v-text="srae.key"></a>
			</li>
		</ul>
	</div>
</template>
<script>
	import apiPath from '../config.js'
	export default{
		data(){
			return{
				searList:[]
			}
		},
		mounted(){
			this.$nextTick(function(){
				this.showList();
			})
		},
		watch:{
			$route(){
				this.searList=[];
				this.showList();
			}
		},
		methods:{
			showList(){
				var _this=this
				$.ajax({
					type:'get',
					url:'src/data/search.json',
					success:function(data){
						_this.searList=data.keywords
					}
				})
			},
			checkKey(val){
				this.searWord=val
				this.$store.commit('checkWord',val)
				window.location.hash="/search/info"
			}
		}
	}
</script>
</script>