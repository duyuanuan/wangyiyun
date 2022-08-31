<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">
                <p>发现好歌单</p>
            </div>
            <div class="more">
                <p>查看更多</p>
            </div>
        </div>
        <div class="musicContent">
            <van-swipe :loop="false" :width="100" class="my-swipe" :show-indicators='false'>
                <van-swipe-item v-for="item in state.musicList" :key="item">
                    <router-link :to="{ path: '/playList', query: { id: item.id } }">
                        <img :src="item.picUrl" class="musicPic">
                        <div class="playCount">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-yinlechangpian"></use>
                            </svg>
                            <p class="playCountNum">{{ changeCount(item.playCount) }}</p>
                        </div>
                        <div class="name">{{ item.name }}</div>
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>
<script>
import { onMounted, reactive } from 'vue'
import { getMusicList } from '../../request/api/home'
export default {
    setup() {
        const state = reactive({
            musicList: [],
        });
        onMounted(async () => {
            let res = await getMusicList();
            state.musicList = res.data.result;
            // console.log(state.musicList);
        })
        return { state };
    },
    methods: {
        changeCount(num) {
            if (num >= 100000000) {
                return (num / 100000000).toFixed(1) + '亿'
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万'
            }
        }
    }
};
</script>
<style lang="less" scoped>
.musicList {
    width: 100%;
    height: 2.5rem;
    padding: 0.2rem;

    .musicTop {
        width: 100%;
        height: 2rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;

        .title {
            margin-left: 0.2rem;
            font-size: 1.3rem;
            font-weight: 900;
        }

        .more {
            margin-right: 0.2rem;
            font-size: 0.8rem;
            border: 2px solid #ccc;
            text-align: center;
            line-height: 1.6rem;
            padding: 0.05rem 0.4rem;
            border-radius: 0.7rem;
        }
    }

    .musicContent {
        width: 100%;
        height: 10rem;

        .my-swipe {
            height: 100%;
            position: relative;

            .musicPic {
                width: 100%;
                padding: 0.2rem;
                border-radius: 1rem;
            }

            .playCount {
                position: absolute;
                top: 0.2rem;
                right: 0.6rem;
                height: 10%;
                display: flex;
                text-align: center;
                justify-content: space-evenly;

                .icon {
                    margin-top: 00.1rem;
                    fill: white;
                    height: 100%;
                }

                .playCountNum {
                    color: white;
                    font-size: 0.8rem;
                }
            }

            .name {
                font-size: 0.6rem;
                word-wrap: break-word;
                margin-left: 0.1rem;
                margin-right: 0.1rem;
            }
        }
    }
}
</style>