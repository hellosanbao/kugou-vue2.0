<template>
  <div id="app">
    <loading v-if="showLoading"></loading>
    <header-comp></header-comp>
    <nav-comp v-if="navState"></nav-comp>
    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
    <player v-show='playerState'></player>
  </div>
</template>

<script>
  import headerComp from './components/headeComp.vue'
  import navComp from './components/navComp.vue' 
  import player from './components/player.vue'
  import loading from './components/loading.vue'
  import { mapGetters } from 'vuex'
  export default {
    name: 'app',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    computed:mapGetters(['showLoading','hasCheckSong','playerState','navState']),
    mounted(){
      this.manageNav(this.$route.path)
    },
    watch:{
      $route(loca){
        this.manageNav(loca.path)
      }
    },
    components:{
      headerComp,
      navComp,
      player,
      loading
    },
    methods:{
      manageNav(loca){
        // if(loca.indexOf('/heji')>=0 || loca.indexOf('/gsxq')>=0 ||loca.indexOf('/gdxq')>=0){
        if(this.$route.params.id || loca.indexOf('/songPage')>=0||loca.indexOf('/search')>=0){
          this.$store.dispatch('hideNav')
        }else{
          this.$store.dispatch('showNav')
        }
        if(loca.indexOf('/songPage')>=0){
          this.$store.dispatch('hidePlayer')
        }else{
          if(this.hasCheckSong){
            this.$store.dispatch('showPlayer')
          }
        }
      }
    }
  }
</script>

<style>
 @import './assets/css/reset.css';
 @import './assets/css/style.css';
 @import './assets/css/swiper.css';
</style>
