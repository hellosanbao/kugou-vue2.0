<template>
	<div class="nav-warp">
		<div class="top-nav">
			<ul>
				<!-- <li><a href="javascript:;" class="active">新歌</a></li>
				<li><a href="javascript:;">排行</a></li>
				<li><a href="javascript:;">歌单</a></li>
				<li><a href="javascript:;">歌手</a></li> -->
				<router-link to="/home" tag="li" active-class="active">
					<a href="javascript:;">新歌</a>
				</router-link>
				<router-link to="/paihang" tag="li" active-class="active">
					<a href="javascript:;">排行</a>
				</router-link>
				<router-link to="/gedan" tag="li" active-class="active">
					<a href="javascript:;">歌单</a>
				</router-link>
				<router-link to="/geshou" tag="li" active-class="active">
					<a href="javascript:;">歌手</a>
				</router-link>
			</ul>
		</div>
		<div class="clear-top-fix">
			<div class="clear-nav"></div>
		</div>
	</div>
</template>
