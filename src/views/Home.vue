<template>
    <div>
        <TopNav />
        <Swpier />
        <IconList />
        <MusicList />
    </div>
</template>

<script>
import TopNav from '../components/home/TopNav.vue'
import Swpier from '../components/home/Swpier.vue'
import IconList from '../components/home/IconList.vue'
import MusicList from '../components/home/MusicList.vue'
export default {
    name: 'Home',
    components: {
        TopNav,
        Swpier,
        IconList,
        MusicList,
    },
}
</script>