<template>
	<div class="ph-items-list">
		<ul>
			<router-link :to="'/gdxq/'+gd.gid" class="gd-item border1px-bottom" v-for="gd in gdList">
				<a href="javascript:;" class="dp_block pr">
					<div class="ph-item-avat"><img :src="gd.imgUrl" alt=""></div>
					<div class="ph-item-text">
						<div class="gd-box">
							<div class="vt">
								<span class="gd-name" v-text="gd.gdName"></span>
								<span class=gd-host><i class="icon-ej"></i>{{gd.hit}}</span>
							</div>
						</div>
					</div>
					<div class="ph-r-ico"></div>
				</a>
			</router-link>
		</ul>
	</div>
</template>
<script>
	import apiPath from '../config.js'
	export default {
		data(){
			return{
				gdList:[]
			}
		},
		mounted(){
			this.$nextTick(function(){
				this.showList()
			})
		},
		methods:{
			showList(){
				this.$store.commit('showLoading')
				var _this=this
				var oDiv=$("<div></div>");
				var gdList=[];
				$.ajax({
					type:'get',
					url:apiPath.delegateUrl+apiPath.kugouRootPath+"/plist/index",
					success:function(data){
						oDiv.html(data);
						oDiv.find(".panel-img-list li").each(function(ind,ele){
							var imgUrl=$(ele).find(".panel-img-left img").attr("_src");
							var gdName=$(ele).find(".panel-img-content .panel-img-content-first").text();
							var hit=$(ele).find(".panel-img-content-sub").text()
							var gid=$(ele).find("a").attr("href")
							// gid.replace('http://m.kugou.com/rank/info/',"")
							gid=gid.replace(/\D+/g,"")
							gdList.push({imgUrl:imgUrl,gdName:gdName,hit:hit,gid:gid})

						})
						_this.gdList=gdList
						_this.$store.commit('hideLoading')
					}
				})	
			}
		}
	}
</script>