<template>
    <img :src="musicInf.al.picUrl" class="bgImg">
    <div class="top">
        <div class="topLeft" @click="updatePlayPageShow">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiangzuojiantou"></use>
            </svg>
        </div>
        <div class="topMid">
            <div class="musicName">
                <Vue3Marquee class="musicNameMarquee">{{ musicInf.name }}</Vue3Marquee>
            </div>
            <div class="authorName">
                <span v-for="(author, authorIndex) in musicInf.ar" key="authorIndex" class="authorNameSpan">
                    <p>{{ author.name }}</p>
                    <p v-if="musicInf.ar.length > 1 && authorIndex != musicInf.ar.length - 1">、</p>
                </span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiangyoujiantou"></use>
                </svg>
            </div>
        </div>
        <div class="topRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
        </div>
    </div>
    <div class="mid" @click="updateIsLyricShow">
        <div class="disk" v-show="!isLyricShow">
            <img src="../../assets/needle.png" class="imgNeedle" :class="{ imgNeedle_active: isPlaying }">
            <img src="../../assets/cd.png" class="imgCD">
            <img :src="musicInf.al.picUrl" class="imgMusic"
                :class="{ imgMusicRunning: isPlaying, imgMusicPaused: !isPlaying }">
        </div>
        <div class="lyric" v-show="isLyricShow" ref="lyric">
            <p class="lyricBox" v-for="(item, index) in dealLyric()" :key="index"
                :class="{ lyric_box_active: (curTime * 1000 >= item.timeMs && curTime * 1000 <= item.timeMsAf) }">
                {{ item.lrc }}<br>
            </p>
        </div>
    </div>
    <div class="btm">
        <div class="btmTop">
            <div class="iconItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-aixin"></use>
                </svg>
            </div>
            <div class="iconItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai"></use>
                </svg>
            </div>
            <div class="iconItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yinlechangpian"></use>
                </svg>
            </div>
            <div class="iconItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiaoxi"></use>
                </svg>
            </div>
            <div class="iconItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiahao"></use>
                </svg>
            </div>
        </div>
        <div class="btmMid">
            <input type="range" class="pregressBar" min="0" :max="duration" v-model="curTime">
        </div>
        <div class="btmBtm">
            <div class="iconItem4">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-24gl-repeat2"></use>
                </svg>
            </div>
            <div class="iconItem4">
                <svg class="icon" aria-hidden="true" @click="playLastSong">
                    <use xlink:href="#icon-shangyishoushangyige"></use>
                </svg>
            </div>
            <div class="iconItem1">
                <svg class="icon" aria-hidden="true" @click="play">
                    <use xlink:href="#icon-bofang" v-if="isPlaying == false"></use>
                    <use xlink:href="#icon-zanting" v-if="isPlaying"></use>
                </svg>
            </div>
            <div class="iconItem4">
                <svg class="icon" aria-hidden="true" @click="playNextSong">
                    <use xlink:href="#icon-xiayigexiayishou"></use>
                </svg>
            </div>
            <div class="iconItem4">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liebiao"></use>
                </svg>
            </div>
        </div>
    </div>
</template>
<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'

export default {
    data() {
        return {
            isLyricShow: true,
        }
    },
    computed: {

    },
    watch: {
        curTime: function () {
            if (document.querySelector("p.lyric_box_active") != null) {
                let p = document.querySelector("p.lyric_box_active")
                if (p.offsetTop > 200) {
                    this.$refs.lyric.scrollTop = p.offsetTop - 200;
                }
            }
        }
    },
    mounted() {
        this.addDuration();
    },
    updated() {

    },
    props: ['musicInf', 'play', 'isPlaying', 'updatePlayPageShow', 'playNextSong', 'playLastSong', 'curTime', 'addDuration', 'duration', 'lyric'],
    setup(props) {
        // console.log(props);
    },
    methods: {
        updateIsLyricShow() {
            this.isLyricShow = !this.isLyricShow;
        },
        dealLyric() {
            if (this.lyric.lyric) {
                let lyricArr = this.lyric.lyric.split(/[(\r\n)\r\n]+/).filter((item) => {
                    return item && item.trim()
                }).map((item, i) => {
                    let min = item.slice(1, 3);
                    let sec = item.slice(4, 6);
                    let ms = item.slice(7, item.toString().indexOf(']'));
                    let lrc = item.slice(item.toString().indexOf(']') + 1, item.length);
                    let timeMs = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(ms);
                    return { min, sec, ms, lrc, timeMs }
                });
                lyricArr.forEach((item, i) => {
                    if (i == lyricArr.length - 1 || isNaN(lyricArr[i + 1].timeMs)) {
                        item.timeMsAf = 100000000
                    } else {
                        item.timeMsAf = lyricArr[i + 1].timeMs
                    }
                })
                return lyricArr;
            }
        },
    },
    components: {
        Vue3Marquee,
    }
}
</script>
<style lang="less" scoped>
.bgImg {
    height: 100%;
    width: 100%;
    z-index: -1;
    filter: blur(20px);
    position: fixed;
}

.top {
    width: 100%;
    height: 2rem;
    display: flex;
    margin-top: 0.5rem;

    .topLeft,
    .topRight {
        width: 10%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        margin: 0 0.4rem;
        align-items: center;

        .icon {
            fill: white;
        }
    }

    .topMid {
        width: 80%;
        height: 100%;
        // justify-content: space-around;

        .musicName {
            width: 100%;
            height: 1rem;
            font-size: 0.9rem;
            display: flex;
            justify-content: center;
            color: white;

            .musicNameMarquee {
                width: 60%;
                height: 100%;
            }
        }

        .authorName {
            height: 1rem;
            font-size: 0.7rem;
            display: flex;
            margin-top: 0.2rem;
            justify-content: center;
            align-items: center;

            .authorNameSpan {
                display: flex;
            }

            .icon {
                margin-top: 0.1rem;
                width: 0.7rem;
                height: 0.7rem;
                fill: black;
            }
        }
    }
}

.mid {
    width: 100%;
    height: 66%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: 1rem;

    .disk {
        .imgNeedle {
            width: 25%;
            left: 45%;
            position: absolute;
            transform-origin: 0 0;
            transform: rotate(-15deg);
            transition: all 2s;
        }

        .imgNeedle_active {
            width: 25%;
            left: 45%;
            position: absolute;
            transform-origin: 0 0;
            transform: rotate(0.5deg);
            transition: all 2s;
        }

        .imgCD {
            width: 60%;
            position: absolute;
            left: 5rem;
            top: 6rem;
            z-index: -1;
        }

        .imgMusic {
            width: 38%;
            border-radius: 100%;
            position: absolute;
            left: 7.6rem;
            top: 8.7rem;
            animation: rotateImage 25s linear infinite;
        }

        .imgMusicRunning {
            animation-play-state: running;
        }

        .imgMusicPaused {
            animation-play-state: paused;
        }

        @keyframes rotateImage {
            0% {
                transform: rotateZ(0deg);
            }

            100% {
                transform: rotateZ(360deg);
            }
        }
    }

    .lyric {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: .6rem;
        overflow: scroll;

        .lyricBox {
            height: auto;
            width: 90%;
            margin-bottom: .6rem;
            text-align: center;
            color: rgb(182, 182, 182);
        }

        .lyric_box_active {
            // height: 3rem;
            color: white;
            font-size: 1.3rem;
        }
    }
}

.btm {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 25%;

    .btmTop {
        padding: 0.4rem 0.4rem 0rem 0.4rem;
        width: 100%;
        height: 40%;
        display: flex;

        .iconItem {
            height: 100%;
            width: 20%;
            display: flex;
            align-items: center;
            justify-content: center;

            .icon {
                fill: white;
            }
        }
    }

    .btmMid {
        width: 100%;
        height: 20%;

        .pregressBar {
            width: 100%;
            height: 0.1rem;
        }
    }

    .btmBtm {
        width: 100%;
        height: 40%;
        padding: 0em 0.4rem 0.4rem 0.4rem;
        display: flex;

        .icon {
            fill: white;
        }

        .iconItem4 {
            height: 100%;
            width: 18%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .iconItem1 {
            height: 100%;
            width: 28%;
            display: flex;
            align-items: center;
            justify-content: center;

            .icon {
                width: 3.5rem;
                height: 3.5rem;
            }
        }
    }
}
</style>