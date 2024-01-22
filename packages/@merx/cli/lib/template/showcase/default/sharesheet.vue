<template>
    <div class="container">
        <van-header title="ShareSheet 分享面板"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-cell is-link title="显示分享面板" @click="show = true" />
            <van-share-sheet v-model="show" title="立即分享给好友" :options="options" @select="onSelect" />

            <h4 class="cell-title">展示多行选项</h4>
            <van-cell is-link title="显示分享面板" @click="show2 = true" />
            <van-share-sheet v-model="show2" title="立即分享给好友" :options="options2" @select="onSelect" />

            <h4 class="cell-title">自定义图标</h4>
            <van-cell is-link title="显示分享面板" @click="show3 = true" />
            <van-share-sheet v-model="show3" title="立即分享给好友" :options="options3" @select="onSelect" />

            <h4 class="cell-title">展示描述信息</h4>
            <van-cell is-link title="显示分享面板" @click="show4 = true" />
            <van-share-sheet
                v-model="show4"
                title="立即分享给好友"
                :options="options4"
                description="描述信息"
                @select="onSelect"
            />
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanShareSheet from '@components/sharesheet';
import vanCell from '@components/cell';
import Toast from '@components/toast';

export default {
    name: 'ShareSheet',
    components: {
        vanHeader,
        vanShareSheet,
        vanCell
    },
    data() {
        return {
            show: false,
            options: [
                { name: '微信', icon: 'wechat' },
                { name: '微博', icon: 'weibo' },
                { name: '复制链接', icon: 'link' },
                { name: '分享海报', icon: 'poster' },
                { name: '二维码', icon: 'qrcode' }
            ],
            show2: false,
            options2: [
                [
                    { name: '微信', icon: 'wechat' },
                    { name: '微博', icon: 'weibo' },
                    { name: 'QQ', icon: 'qq' }
                ],
                [
                    { name: '复制链接', icon: 'link' },
                    { name: '分享海报', icon: 'poster' },
                    { name: '二维码', icon: 'qrcode' }
                ]
            ],
            show3: false,
            options3: [
                {
                    name: '名称',
                    icon: 'https://img.yzcdn.cn/vant/custom-icon-fire.png'
                },
                {
                    name: '名称',
                    icon: 'https://img.yzcdn.cn/vant/custom-icon-light.png'
                },
                {
                    name: '名称',
                    icon: 'https://img.yzcdn.cn/vant/custom-icon-water.png'
                }
            ],
            show4: false,
            options4: [
                { name: '微信', icon: 'wechat' },
                { name: '微博', icon: 'weibo' },
                { name: '复制链接', icon: 'link', description: '描述信息' },
                { name: '分享海报', icon: 'poster' },
                { name: '二维码', icon: 'qrcode' }
            ]
        };
    },
    methods: {
        onSelect(option) {
            Toast(option.name);
            this.show = false;
            this.show2 = false;
            this.show3 = false;
            this.show4 = false;
        }
    }
};
</script>

<style scoped>
.van-content {
    padding-left: 10px;
    padding-right: 10px;
    background-color: #f7f8fa;
    height: calc(100vh - 46px);
}
</style>
