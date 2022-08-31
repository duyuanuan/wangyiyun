<template>
    <div id="swiperTop">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in state.images" :key="image">
                <img :src="image.pic" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, reactive } from 'vue';
import { getBanner } from '../../request/api/home';
export default {
    setup() {
        const state = reactive({
            images: [
                'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
                'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
            ],
        });
        onMounted(async () => {
            // axios.get('http://localhost:3000/banner?type=2').then((res) => {
            //     // console.log(res);
            //     state.images = res.data.banners
            //     // console.log(state.images);
            // })
            let res = await getBanner();
            state.images = res.data.banners
            // console.log(res);
        })
        return { state };
    },
};
</script>

<style lang="less" scoped>
#swiperTop {

    .van-swipe {
        width: 100%;
        height: 10rem;
        // padding: 0.2rem;
        // margin: 0.5rem;
        // box-sizing: border-box;


        .van-swipe-item {
            pad: 0 0.5rem 0 0.5rem;

            img {
                width: 100%;
                height: 100%;
                padding: 0 0.5rem 0 0.5rem;
                border-radius: 1.2rem;
            }
        }

        .van-swipe__indicator--active {
            background-color: rgb(255, 0, 0);
        }
    }
}
</style>
