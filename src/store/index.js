import vue from 'vue'
import vuex from 'vuex'
import apiPath from '../config.js'

vue.use(vuex)

const state = {
    showNav: true,
    showHead: true,
    showPlayer: false,
    playe: false,
    songList: [],
    currentData: {
        songData: {},
        songIndex: 0,
    },
    isPlay: false,
    searchKey: '',
    searchResult: [],
    showLoading: false,
    isReadyPlay: false,
    hasCheckSong: false,
    canMove: false,
}

const mutations = {
    showNav(state) {
        state.showNav = true
    },
    hideNav(state) {
        state.showNav = false
    },
    showHead(state) {
        state.showHead = true
    },
    hideHead(state) {
        state.showHead = false
    },
    showPlayer(state) {
        state.showPlayer = true
    },
    hidePlayer(state) {
        state.showPlayer = false
    },
    statrPlay(state) {
        state.play = true
    },
    stopPlay(state) {
        state.play = false
    },
    showLoading(state) {
        state.showLoading = true
    },
    hideLoading(state) {
        state.showLoading = false
    },
    canMove(state) {
        state.canMove = true
    },
    unMove(state) {
        state.canMove = false
    },
    playSong(state, { audio, index }) {
        state.isReadyPlay = false
        state.currentData.songData = audio
        state.currentData.songIndex = index
        state.isPlay = true
    },
    getSongList(state, data) {
        state.songList = data
    },
    togglePlay(state) {
        state.isPlay = !state.isPlay
    },
    checkWord(state, key) {
        state.showLoading = true
        state.searchKey = key
        var keyword = key
        if (!keyword) window.location.hash = "/search"
        $.ajax({
            type: 'get',
            url: 'http://mobilecdn.kugou.com/api/v3/search/song?format=jsonp&pagesize=300&showtype=1&callback=?',
            data: { keyword },
            dataType: "jsonp",
            success: function(data) {
                state.showLoading = false
                state.searchResult = data.data.info
            }
        })
    },
    isReadyPlay(state) {
        state.isReadyPlay = true
    },
    unReadPlay(state) {
        state.isReadyPlay = false
    },
    getCurrentTime(state, time) {
        var second = time % 60 >= 10 ? parseInt(time % 60) : 0 + "" + parseInt(time % 60)
        var min = parseInt(time / 60) >= 10 ? parseInt(time / 60) : 0 + "" + parseInt(time / 60)
        state.currentData.songData.currentLength = time;
        state.currentData.songData.fomartCurrentLength = min + ":" + second;
    },
    getLyrc(state,hash) {
        $.ajax({
            type: "get",
            url: apiPath.apilyrc,
            data: { hash },
            dataType: 'json',
            error(e) {
                var str = (e.responseText).replace(/\[+/g, "").replace(/\]+/g, "")
                var lyrcStr = str.split("\r\n")
                state.currentData.songData.lyrc=lyrcStr
            }
        })
    }
}

const actions = {
    showHead({ commit }) {
        commit('showHead')
    },
    hideHead({ commit }) {
        commit('hideHead')
    },
    showNav({ commit }) {
        commit('showNav')
    },
    hideNav({ commit }) {
        commit('hideNav')
    },
    showPlayer({ commit }) {
        commit('showPlayer')
    },
    hidePlayer({ commit }) {
        commit('hidePlayer')
    },
    getSongData({ commit }, data) {
        state.hasCheckSong = true;
        var hash = data.hash,
            index = data.index
        $.ajax({
            type: "get",
            url: apiPath.delegateUrl + apiPath.apiSongs,
            data: { hash: data.hash },
            success(data) {
                // commit('showPlayer')
                var imgUrl = data.imgUrl.split('{size}').join('200'),
                    title = data.songName,
                    songUrl = data.url,
                    hash = data.hash,
                    singer = data.choricSinger,
                    songLength = data.timeLength,
                    fomartCurrentLength = 0,
                    currentLength = 0;
                var second = songLength % 60 >= 10 ? parseInt(songLength % 60) : 0 + "" + parseInt(songLength % 60)
                var min = parseInt(songLength / 60) >= 10 ? parseInt(songLength / 60) : 0 + "" + parseInt(songLength / 60)
                var fomartSongLength = min + ":" + second
                var audio = { songUrl, imgUrl, title, singer, hash, songLength, fomartSongLength, currentLength, fomartCurrentLength };
                commit('playSong', { audio, index })
                commit('getLyrc',data.hash)
            }
        })
    },
    next({ dispatch, state }) {
        var list = state.mutations.songList;
        if (state.mutations.currentData.songIndex == list.length - 1) {
            state.mutations.currentData.songIndex = 0
        } else {
            state.mutations.currentData.songIndex++
        }
        var hash = list[state.mutations.currentData.songIndex].hash,
            index = state.mutations.currentData.songIndex
        dispatch('getSongData', { hash, index })

    },
    prev({ dispatch, state }) {
        var list = state.mutations.songList;
        if (state.mutations.currentData.songIndex == 0) {
            state.mutations.currentData.songIndex = list.length - 1
        } else {
            state.mutations.currentData.songIndex--
        }
        var hash = list[state.mutations.currentData.songIndex].hash,
            index = state.mutations.currentData.songIndex
        dispatch('getSongData', { hash, index })
    }
}

const getters = {
    headState(state) {
        return state.showHead
    },
    navState(state) {
        return state.showNav
    },
    playerState(state) {
        return state.showPlayer
    },
    played(state) {
        return state.playe
    },
    songList(state) {
        return state.songList
    },
    currentData(state) {
        return state.currentData
    },
    isPlay(state) {
        return state.isPlay
    },
    checkWord(state) {
        return state.searchKey
    },
    searchResult(state) {
        return state.searchResult
    },
    showLoading(state) {
        return state.showLoading
    },
    isReadyPlay(state) {
        return state.isReadyPlay
    },
    hasCheckSong(state) {
        return state.hasCheckSong
    },
    canMove(state) {
        return state.canMove
    }
}

export default new vuex.Store({
    modules: {
        mutations: {
            state,
            mutations,
            getters
        }
    },
    actions
})
