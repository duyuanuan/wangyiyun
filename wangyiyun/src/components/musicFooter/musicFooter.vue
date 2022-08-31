<template>
    <div class="MusicFooter">
        <div class="leftMid" @click="updatePlayPageShow">
            <div class="left">
                <img :src="curPlayList[curIndex].al?.picUrl" class="alImg">
            </div>
            <div class="mid">
                <p class="musicName">{{ curPlayList[curIndex].name }}</p>
                <p class="authorName">横滑可以切换上下首哦</p>
            </div>
        </div>

        <div class="right">
            <div class="iconItem" @click="play">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang" v-if="isPlaying == false"></use>
                    <use xlink:href="#icon-zanting" v-if="isPlaying"></use>
                </svg>
            </div>
            <div class="iconItem" @click="playNextSong">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiayigexiayishou"></use>
                </svg>
            </div>
            <div class="iconItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liebiao"></use>
                </svg>
            </div>
        </div>

        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${curMusicId}.mp3`"
            @timeupdate="updateCurTime(this.$refs.audio.currentTime)" @ended="playNextSong()"></audio>
        <van-popup v-model:show="playPageShow" position="right" :style="{ height: '100%', width: '100%' }">
            <playPage :musicInf="curPlayList[curIndex]" :play="play" :isPlaying="isPlaying"
                :updatePlayPageShow="updatePlayPageShow" :playNextSong="playNextSong" :playLastSong="playLastSong"
                :curTime="curTime" :addDuration="addDuration" :duration="duration" :lyric="lyric" />
        </van-popup>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import playPage from "../playPage/playPage.vue";
export default {
    data() {
        return {
            interVal: 0,
        }
    },
    computed: {
        ...mapState(['curPlayList', 'curIndex', 'curMusicId', 'isPlaying', 'playPageShow', 'lyric', 'curTime', 'duration'])
    },
    setup() {

    },
    mounted() {
        this.$store.dispatch("getLyric", this.curMusicId);
        this.addDuration();
    },
    updated() {
        // this.$store.dispatch("getLyric", this.curMusicId);
        // this.dealLyric();
    },
    methods: {
        play() {
            if (this.$refs.audio.paused) {
                this.$refs.audio.play();
                this.updateIsPlaying(true);
            } else {
                this.$refs.audio.pause();
                this.updateIsPlaying(false);
                clearInterval(this.interVal);   // 暂停便清楚定时器
            }
        },
        playNextSong() {
            this.nextSong();
            this.updateIsPlaying(true);
            this.$refs.audio.play();
        },
        playLastSong() {
            this.lastSong();
            this.updateIsPlaying(true);
            this.$refs.audio.play();
        },
        addDuration() {
            // console.log("give duration" + this.$refs.audio.duration);
            this.updateDuration(this.$refs.audio.duration);
        },
        ...mapMutations(['updateIsPlaying', 'nextSong', 'updatePlayPageShow', "lastSong", "updateCurTime", "updateDuration"]),
    },
    watch: {
        curMusicId: function (newVal, oldVal) {
            this.$refs.audio.autoplay = true;
            this.updateIsPlaying(true);
            this.addDuration();
            this.$store.dispatch("getLyric", newVal);
        },
    },
    components: {
        playPage,
    }
}
</script>
<style lang="less" scoped>
.MusicFooter {
    width: 100%;
    height: 3.2rem;
    background-color: white;
    position: fixed;
    bottom: 0;
    border-top: 1px solid gray;
    vertical-align: bottom;
    display: flex;

    .leftMid {
        width: 70%;
        height: 100%;
        display: flex;

        .left {
            width: 20%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .alImg {
                height: 80%;
                border-radius: 100%;
            }
        }

        .mid {
            width: 80%;
            height: 100%;

            .musicName {
                margin-top: 0.4rem;
                height: 40%;
                font-size: 1rem;
                font-weight: bold;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: clip,
            }

            .authorName {
                // margin-bottom: 0.6rem;
                height: 35%;
                font-size: 0.8rem;
                color: gray;
                display: flex;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis,
            }
        }
    }

    .right {
        width: 30%;
        height: 100%;
        display: flex;

        .iconItem {
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .icon {
                fill: gray;
            }
        }
    }
}
</style>