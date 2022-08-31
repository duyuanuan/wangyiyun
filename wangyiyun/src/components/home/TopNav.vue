<template>
    <div class="topNav">
        <div class="topLeft">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao"></use>
            </svg>
        </div>

        <div class="topCenter">
            <span :class="{ active: (showpage == 'my') }" @click="showpage = 'my'; $router.push('/userInf')">我的</span>
            <span :class="{ active: (showpage == 'find') }" @click="showpage = 'find'">发现</span>
            <span :class="{ active: (showpage == 'cloud') }" @click="showpage = 'cloud'">云村</span>
            <span :class="{ active: (showpage == 'video') }" @click="showpage = 'video'">视频</span>
        </div>

        <div class="topRight" @click="$router.push('/search')">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>

    </div>

</template>
<script>
export default {
    data() {
        return {
            showpage: 'find',
        }
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

    .topCenter {
        width: 70%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        // align-items: center;
        font-size: 1.1rem;

        .active {
            font-weight: 900;
        }
    }

}
</style>