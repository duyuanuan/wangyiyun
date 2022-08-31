import { get } from "vant/lib/utils";
import service from "..";
// 获取歌单信息内容
export function getMusicListContent(data) {
    return service({
        method: 'get',
        url: `/playlist/detail?id=${data}`
    })
}
// 获取歌单具体内容
export function getMusicListDetail(data) {
    return service({
        method: 'get',
        url: `/playlist/track/all?id=${data}`
    })
}
// 获取歌曲信息
export function getMusicContent(data) {
    return service({
        method: 'get',
        url: `/song/url?id=${data}`
    })
}
// 获取歌词
export function getMusicLyric(data) {
    return service({
        method: 'get',
        url: `/lyric?id=${data}`
    })
}