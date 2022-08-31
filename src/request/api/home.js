import service from "..";
// 获得轮播图图片
export function getBanner() {
    return service({
        method: 'get',
        url: '/banner?type=2'
    })
}
// 获得推荐歌单
export function getMusicList() {
    return service({
        method: 'get',
        url: '/personalized?limit=10'
    })
}
// 获取搜索结果
export function getResearchResult(data) {
    return service({
        method: 'get',
        url: `/cloudsearch?keywords=${data}`
    })
}
// 获取电话登录信息
export function getPhoneLoginResult(data) {
    return service({
        method: 'get',
        url: `/login/cellphone?phone=${data.account}&password=${data.passwork}`
    })
}
// 获取用户信息
export function getUserInf(data) {
    return service({
        method: 'get',
        url: `/user/detail?uid=${data}`
    })
}