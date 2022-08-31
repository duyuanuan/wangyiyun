<template>
    <div v-if="state.playlist != null && state.songs != null">
        <playListTop :playlist="state.playlist" :changeCount="changeCount" />
        <playListBtm :playlist="state.playlist" :songs="state.songs" :changeCount="changeCount" />
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { getMusicListContent, getMusicListDetail } from '../request/api/playList'
import playListTop from '../components/playList/playListTop.vue'
import playListBtm from '../components/playList/playListBtm.vue'
export default {
    setup() {
        const state = reactive({
            playlist: {},
            songs: {},
        });
        onMounted(async () => {
            let id = useRoute().query.id;
            let con = await getMusicListContent(id);
            let det = await getMusicListDetail(id);
            state.playlist = con.data.playlist;
            state.songs = det.data.songs;
        });
        return { state }
    },
    components: {
        playListTop,
        playListBtm,
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
}
</script>
