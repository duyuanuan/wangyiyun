<template>
    <div class="topNav">
        <div class="topNavLeft" @click="$router.go(-1)">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiangzuojiantou"></use>
            </svg>
        </div>
        <div class="topNavCenter">
            <input type="text" placeholder="弦子" @keydown.enter="enterKey" v-model="searchWord">
        </div>
        <div class="topNavRight" @click="enterKey">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
    </div>
    <div class="searchHistory">
        <div class="searchHistoryNav">
            <p>搜索历史</p>
            <svg class="icon" aria-hidden="true" @click="delAllKeyWord">
                <use xlink:href="#icon-shanchu"></use>
            </svg>
        </div>
        <div class="workDiv">
            <span v-for="(item, index) in keyWordList" :key="index" class="keyWord">
                <p @click="changeKeyWord(item)">{{ item }}</p>
                <svg class="icon" aria-hidden="true" @click="delKeyWord(index)">
                    <use xlink:href="#icon-shanchu"></use>
                </svg>
            </span>
        </div>
    </div>
    <showMusicList :songs="searchResult.songs" />
</template>
<script>
import { getResearchResult } from '../request/api/home.js'
import showMusicList from '../components/showMusicList.vue';
export default {
    data() {
        return {
            keyWordList: [],
            searchWord: '',
            searchResult: [],
        }
    },
    mounted() {
        this.keyWordList = JSON.parse(localStorage.getItem('keyWordList')) || [];
    },
    methods: {
        async enterKey() {
            if (this.searchWord.trim() != "") {
                await this.searchWordAction(this.searchWord.trim());
            } else if (this.searchWord == "") {
                await this.searchWordAction("弦子");
            }
        },
        delKeyWord(index) {
            this.keyWordList.splice(index, 1);
            localStorage.setItem("keyWordList", JSON.stringify(this.keyWordList));
        },
        delAllKeyWord() {
            this.keyWordList = "";
            localStorage.setItem("keyWordList", JSON.stringify(this.keyWordList));
        },
        async changeKeyWord(data) {
            this.searchWord = data;
            await this.searchWordAction(data)
        },
        async searchWordAction(data) {
            this.searchWord = data;
            let res = await getResearchResult(data);
            this.searchResult = res.data.result;
            this.keyWordList.unshift(data);
            // 去重
            this.keyWordList = [...new Set(this.keyWordList)];
            if (this.keyWordList.length > 10) {
                this.keyWordList.splice(this.keyWordList.length - 1, 1);
            }
            localStorage.setItem("keyWordList", JSON.stringify(this.keyWordList));
        }
    },
    components: {
        showMusicList,
    }
}
</script>
<style lang="less" scoped>
.topNav {
    margin: 0.5rem;
    width: 95%;
    height: 2.3rem;
    padding: .2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .topNavCenter {
        width: 79%;
        height: 100%;

        input {
            width: 100%;
            margin-top: 0.25rem;
            border: none;
            border-bottom: 1px solid #999;
        }
    }
}

.searchHistory {
    width: 100%;
    padding: .4rem;

    .searchHistoryNav {
        font-size: 1.2rem;
        width: 96%;
        height: 1.5rem;
        display: flex;
        margin-left: 0.5rem;
        justify-content: space-between;
    }

    .workDiv {
        width: 100%;
        height: auto;
        overflow: hidden;
        margin-top: 0.7rem;

        .keyWord {
            display: flex;
            align-items: center;
            float: left;
            background-color: rgb(212, 211, 211);
            padding: 0.1rem 0.3rem;
            border-radius: 0.7rem;
            margin: 0.2rem 0.5rem;

            p {
                font-size: 0.9rem;
            }

            .icon {
                width: 0.7rem;
                height: 0.7rem;
                // top: 0.17rem;
                position: relative;
            }
        }
    }
}
</style>