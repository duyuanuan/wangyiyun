<template>
    <div class="playlistBtm">
        <div class="playList">
            <div class="nav">
                <div class="navLeft">
                    <div class="playAll" @click="updateCurPlayListSong(songs)">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-bofang"></use>
                        </svg>
                        <p class="p1">播放全部</p>
                    </div>
                    <p class="p2">(共{{ songs.length }}首)</p>
                </div>
                <div class="navRight">
                    <button class="subscribedBtn">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jiahao"></use>
                        </svg>
                        收藏({{ changeCount(playlist.subscribedCount) }})
                    </button>
                </div>
            </div>
            <showMusicListVue :songs="songs" />
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
import showMusicListVue from '../showMusicList.vue';

export default {
    props: ['playlist', 'songs', 'changeCount'],
    setup(props) {
        // console.log(props);
    },
    methods: {
        ...mapMutations(['updateCurPlayListSong']),
    },
    components: {
        showMusicListVue,
    }
}
</script>
<style lang="less" scoped>
.playlistBtm {
    width: 100%;

    .playList {
        width: 100%;
        position: absolute;
        background-color: white;
        border-radius: 1rem 1rem 0rem 0rem;

        .nav {
            height: 3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .navLeft {
                margin-left: 0.5rem;
                display: flex;
                width: 40%;

                .playAll {
                    display: flex;

                    .icon {
                        height: 1.2rem;
                        width: 1.2rem;
                    }

                    .p1 {
                        margin-left: 0.3rem;
                        font-size: 0.9rem;
                    }
                }

                .p2 {
                    font-size: 0.6rem;
                    color: gray;
                    margin-top: 0.1rem;
                }
            }

            .navRight {
                width: 35%;
                margin-right: 0.5rem;

                .subscribedBtn {
                    background-color: red;
                    display: flex;
                    align-items: center;
                    justify-content: space-evenly;
                    width: 100%;
                    height: 2.5rem;
                    border-radius: 1.2rem;
                    border: 0;
                    color: white;
                    font-size: 0.9rem;

                    .icon {
                        margin-top: 0.1rem;
                        height: 1rem;
                        width: 1rem;
                        fill: white;
                    }
                }
            }
        }
    }
}
</style>