import homView from './routerView/home.vue'
import phView from './routerView/paihang.vue'
import gdView from './routerView/gedan.vue'
import gsView from './routerView/geshou.vue'
import hejiView from './routerView/heji.vue'
import xqView from './routerView/gsxq.vue'
import gdxqView from './routerView/gdxq.vue'
import gsxqView from './routerView/gsxq.vue'
import gsSongView from './routerView/gsSongList.vue'
import searchView from './routerView/search.vue'
import searInfoView from './routerView/searInfo.vue'
import searindexView from './routerView/searchIndex.vue'
import songPage from './routerView/songPage.vue'

export default [
    {path:'/home',component:homView},
    {path:'/paihang',component:phView},
    {path:'/gedan',component:gdView},
    {path:'/geshou',component:gsView},
    {path:'/heji/:id',component:hejiView},
    {path:'/gdxq/:id',component:gdxqView},
    {path:'/gsxq/:id',component:gsxqView},
    {path:'/gsSong/:id',component:gsSongView},
    {path:'/search',component:searchView,
    	children:[
    		{path:'info',component:searInfoView},
    		{path:'/',component:searindexView}
    	]
	},
    {path:'/songPage',component:songPage},
    {path:"/",redirect:"/home"}
]
