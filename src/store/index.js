import { createStore } from 'vuex'
import { getMusicLyric } from '../request/api/playList'
import { getPhoneLoginResult } from '../request/api/home'

export default createStore({
    state: {
        curPlayList: [{ //当前播放歌曲列表
            name: "暖心",
            al: {
                id: 31328,
                name: "蓝短裤",
                pic: 109951163187403330,
                picUrl: "https://p2.music.126.net/2iQ9VRfQkH_iFnZ97ZECQA==/109951163187403335.jpg",
                pic_str: "109951163187403335"
            },
            id: 316167,
        }],
        curMusicId: 316167, //当前音乐的ID
        curIndex: 0,    //当前音乐在歌单中的索引
        isPlaying: false,   //是否正在播放
        playPageShow: false, // 播放页面
        lyric: {},   //歌词
        curTime: 0,  //当前时间
        duration: 0, //歌曲总时长
        isLogin: false, //登录状态
        isMusicFooterShow: true,//底部组件是否显示
        token: '',
    },
    mutations: {
        updateIsPlaying(state, value) {
            state.isPlaying = value;
        },
        updateCurPlayList(state, value) {
            state.curPlayList = value;
        },
        updateCurPlayListSong(state, value) {
            state.curPlayList = value;
            state.curIndex = 0;
            state.curMusicId = state.curPlayList[0].id;
        },
        nextSong(state) {
            if (state.curIndex + 1 < state.curPlayList.length) {
                state.curIndex = state.curIndex + 1;
            } else {
                state.curIndex = 0;
            }
            state.curMusicId = state.curPlayList[state.curIndex].id;
        },
        lastSong(state) {
            if (state.curIndex - 1 >= 0) {
                state.curIndex = state.curIndex - 1;
            } else {
                state.curIndex = 0;
            }
            state.curMusicId = state.curPlayList[state.curIndex].id;
        },
        updateCurIndexID(state, value) {
            state.curIndex = value;
            state.curMusicId = state.curPlayList[value].id;
        },
        updatePlayPageShow(state) {
            state.playPageShow = !(state.playPageShow);
        },
        updateLyric(state, value) {
            state.lyric = value;
        },
        updateCurTime(state, value) {
            state.curTime = value;
        },
        updateDuration(state, value) {
            state.duration = value;
        },
        updateIsLogin(state, value) {
            state.isLogin = value;
        },
        updateToken(state, value) {
            state.token = value;
            localStorage.setItem('token', state.token);
        }
    },
    actions: {
        async getDefaultMusicList(context, value) {

        },
        async getLyric(context, value) {
            let res = await getMusicLyric(value);
            // console.log("load lyric");
            context.commit("updateLyric", res.data.lrc);
        },
        async getLogin(context, value) {
            // let res = await getPhoneLoginResult(value);
            return { code: 200, token: '111111', id: '32953014' };
            // return res;
        }
    },
    modules: {

    }
})