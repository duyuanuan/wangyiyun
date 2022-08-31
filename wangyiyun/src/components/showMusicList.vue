<template>
    <div class="songs" v-if="songs != null">
        <div v-for="(item, index_songs) in songs" :key="index_songs" class="music">
            <div class="index">{{ index_songs + 1 }}</div>
            <div class="nameAut" @click="selectCurrentSong(index_songs)">
                <div class="musicName">{{ item.name }}</div>
                <div class="authorName">
                    <span v-for="(author, index_ar) in item.ar" :key="index_ar">
                        {{ author.name }}
                        <span v-if="item.ar.length > 1 && index_ar != (item.ar.length - 1)">、</span>
                    </span>
                </div>
            </div>
            <div class="iconList">
                <div class="iconItem">
                    <svg class="icon" aria-hidden="true" v-if="item.mv != 0">
                        <use xlink:href="#icon-shipin"></use>
                    </svg>
                </div>
                <div class="iconItem">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-liebiao"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
    <div class="restSpace"></div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
    props: ['songs'],
    methods: {
        ...mapMutations(['updateCurPlayList', 'updateCurIndexID']),
        selectCurrentSong(data) {
            this.updateCurPlayList(this.songs);
            this.updateCurIndexID(data);
        }
    }
}
</script>
<style lang="less" scoped>
.songs {
    .music {
        height: 3rem;
        display: flex;
        margin-top: 0.8rem;

        .index {
            width: 10%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .nameAut {
            height: 100%;
            width: 60%;

            .musicName {
                margin-top: 0.3rem;
                height: 1.2rem;
                font-size: 1rem;
                font-weight: bold;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: clip,
            }

            .authorName {
                margin-top: 0.1rem;
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

        .iconList {
            height: 100%;
            width: 30%;
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
}

.restSpace {
    width: 100%;
    height: 3.2rem;
}
</style>