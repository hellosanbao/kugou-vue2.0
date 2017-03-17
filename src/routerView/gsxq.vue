<template>
	<div class="gsxq-warp">
		<div class="topbar-fixed">
			<div class="top-bar">
				<i class="top-bar-back" onclick="history.back()"></i>
				<p class="top-bar-title" v-text="pTitle"></p>
			</div>
		</div>
		<div class="clear-top-fix">
			<div class="clear-nav"></div>
		</div>
		<div class="ph-items-list">
			<ul>
				<router-link :to="'/gsSong/'+gs.hashPath" class="gd-item gs-item border1px-bottom" v-for="gs in gsList">
					<a href="javascript:;" class="dp_block pr">
						<div class="ph-item-avat"><img :src="gs.imgUrl" alt=""></div>
						<div class="ph-item-text">
							<div class="gd-box">
								<div class="vt">
									<span class="gd-name" v-text="gs.gsName"></span>
								</div>
							</div>
						</div>
					</a>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
	import apiPath from '../config.js'
	export default{
		data(){
			return{
				gsList:[],
				pTitle:'',
			}
		},
		mounted(){
			this.$nextTick(function(){
				this.showList();
			})
		},
		watch:{
			$route(){
				this.gsList=[];
				this.showList();
			}
		},
		methods:{
			showList(){
				this.$store.commit('showLoading')
				var _this=this
				var gsList=[]
				var oDiv=$("<div></div>")
				$.ajax({
					type:'get',
					url:apiPath.delegateUrl+apiPath.kugouRootPath+"/singer/list/"+_this.$route.params.id,
					success:function(data){
						oDiv.html(data)
						oDiv.find(".panel-img-list li").each(function(ind,ele){
							var hashPath=$(ele).find("a").attr("href")
							hashPath=hashPath.replace(/\D+/g,"")
							var imgUrl=$(ele).find(".panel-img-left img").attr("_src")
							var gsName=$(ele).find(".panel-img-content-first").text()
							gsList.push({hashPath:hashPath,imgUrl:imgUrl,gsName:gsName})
						})
						_this.pTitle=oDiv.find(".page-title").text()
						_this.gsList=gsList
						_this.$store.commit('hideLoading')
					}
				})
			}
		}
	}
</script>

