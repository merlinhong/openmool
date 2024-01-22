<template>
    <div class="container">
        <van-header title="NoticeBar 通告栏"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-notice-bar
                left-icon="volume-o"
                text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
            ></van-notice-bar>

            <h4 class="cell-title">滚动播放</h4>
            <!-- 文字较短时，通过设置 scrollable 属性开启滚动播放 -->
            <van-notice-bar scrollable text="技术是开发它的人的共同灵魂。" />
            <!-- 文字较长时，通过禁用 scrollable 属性关闭滚动播放 -->
            <van-notice-bar
                :scrollable="false"
                text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
            />

            <h4 class="cell-title">多行展示</h4>
            <van-notice-bar
                wrapable
                :scrollable="false"
                text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
            />

            <h4 class="cell-title">通知栏模式</h4>
            <!-- closeable 模式，在右侧显示关闭按钮 -->
            <van-notice-bar mode="closeable">技术是开发它的人的共同灵魂。</van-notice-bar>

            <!-- link 模式，在右侧显示链接箭头 -->
            <van-notice-bar mode="link">技术是开发它的人的共同灵魂。</van-notice-bar>

            <h4 class="cell-title">自定义样式</h4>
            <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
                技术是开发它的人的共同灵魂。
            </van-notice-bar>

            <h4 class="cell-title">垂直滚动</h4>
            <van-notice-bar left-icon="volume-o" :scrollable="false">
                <van-gallery
                    :data="['内容1', '内容2', '内容3']"
                    :autoplay="3000"
                    :show-indicators="false"
                    vertical
                    class="notice-swipe"
                ></van-gallery>
            </van-notice-bar>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanNoticeBar from '@components/noticebar';
import vanGallery from '@components/gallery';

export default {
    name: 'NoticeBar',
    components: {
        vanHeader,
        vanNoticeBar,
        vanGallery
    }
};
</script>
<style>
.van-content {
    padding-bottom: 20px;
}
.notice-swipe {
    height: 40px;
    line-height: 40px;
}
</style>
