<template>
    <div class="playListTop">
        <img :src="playlist.coverImgUrl" class="bgimg">
        <div class="top">
            <div class="topLeft" @click="$router.go(-1)">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiangzuojiantou"></use>
                </svg>
                <span>歌单</span>
            </div>
            <div class="topRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liebiao"></use>
                </svg>
            </div>
        </div>

        <div class="mid">
            <div class="midLeft">
                <img :src="playlist.coverImgUrl" class="cvimg">
                <div class="playCount">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-yinlechangpian"></use>
                    </svg>
                    <p class="playCountNum">{{ changeCount(playlist.playCount) }}</p>
                </div>
            </div>
            <div class="midRight">
                <div class="name">
                    {{ playlist.name }}
                </div>
                <div class="creator" v-if="playlist.creator != null">
                    <img :src="playlist.creator.avatarUrl" class="creatorImg">
                    <p class="creatorId">{{ playlist.creator.nickname }}</p>
                    <svg class="icon-creator" aria-hidden="true">
                        <use xlink:href="#icon-xiangyoujiantou"></use>
                    </svg>
                </div>
                <div class="description">
                    {{ playlist.description }}
                </div>
            </div>
        </div>

        <div class="btm">
            <div class="iconitem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiaoxi"></use>
                </svg>
                <span class="iconNum">{{ playlist.commentCount }}</span>
            </div>

            <div class="iconitem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
                <span class="iconNum">{{ playlist.shareCount }}</span>
            </div>

            <div class="iconitem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai"></use>
                </svg>
                <span class="iconText">下载</span>
            </div>

            <div class="iconitem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-duoxuan"></use>
                </svg>
                <span class="iconText">多选</span>
            </div>

        </div>
    </div>

</template>
<script>

export default {
    props: {
        playlist: Object,
        changeCount: Function,
    },
    setup(props) {

    },
}
</script>
<style lang="less" scoped>
.playListTop {
    width: 100%;
    // position: fixed;

    .bgimg {
        width: 100%;
        height: 17rem;
        position: fixed;
        z-index: -1;
        filter: blur(30px);
    }

    .icon {
        fill: white;
    }

    .top {
        width: 100%;
        height: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // padding: .2rem;
        margin-top: 0.5rem;
        position: relative;

        .topLeft,
        .topRight {
            width: 25%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            margin: 0 0.4rem;
            align-items: center;

            span {
                font-size: 1.2rem;
                font-weight: bold;
                color: white;
            }
        }
    }

    .mid {
        width: 95%;
        height: 8rem;
        margin: 1rem 0rem 0rem 0.6rem;
        position: relative;
        justify-content: space-between;
        display: flex;

        .midLeft {
            width: 8rem;
            height: 100%;
            position: relative;

            .cvimg {
                width: 8rem;
                height: 8rem;
                border-radius: 1rem;
            }

            .playCount {
                display: flex;
                height: 1.15rem;
                position: absolute;
                top: 0.2rem;
                right: 0.6rem;

                .icon {
                    margin-top: 0.1rem;
                    height: 1rem
                }

                .playCountNum {
                    font-size: 0.8rem;
                    color: white;
                }
            }

        }

        .midRight {
            width: 13.4rem;
            height: 100%;

            .name {
                font-size: 0.9rem;
                height: 1.2rem;
                color: white;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis,
            }

            .creator {
                margin-top: 0.7rem;
                height: 2rem;
                display: flex;
                text-align: center;

                .creatorImg {
                    height: 100%;
                    border-radius: 100%;
                }

                .creatorId {
                    margin-top: 0.2rem;
                    margin-left: 0.4rem;
                    color: rgb(209, 209, 209);
                }

                .icon-creator {
                    margin-left: 0.2rem;
                    margin-top: 0.1rem;
                    width: 1rem;
                    height: 80%;
                    fill: grey;
                }
            }

            .description {
                margin-top: 0.8rem;
                font-size: 0.8rem;
                height: 3.2rem;
                color: rgba(255, 255, 255, 0.86);
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis,
            }
        }
    }

    .btm {
        margin-top: 1rem;
        width: 100%;
        height: 4rem;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .iconitem {
            width: 25%;
            height: 4rem;
            display: flex;
            align-items: center;
            flex-direction: column;

            .icon {
                width: 1.8rem;
                height: 1.8rem;
            }

            .iconNum {
                margin-top: 0.35rem;
                font-size: 0.85rem;
                color: white;
                display: flex;
            }

            .iconText {
                margin-top: 0.3rem;
                font-size: 0.8rem;
                color: white;
                display: flex;
            }
        }

    }
}
</style>