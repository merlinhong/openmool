<template>
    <div class="container">
        <van-header title="ImagePreview 图片预览"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-button
                type="primary"
                @click="onShowImg(['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg'])"
            >
                预览图片
            </van-button>

            <h4 class="cell-title">指定初始位置</h4>
            <van-button
                type="primary"
                @click="
                    onShowImg({
                        images: ['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg'],
                        startPosition: 1,
                        onClose() {
                            // do something
                        }
                    })
                "
            >
                指定初始位置
            </van-button>

            <h4 class="cell-title">展示关闭按钮</h4>
            <van-button
                type="primary"
                @click="
                    onShowImg({
                        images: ['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg'],
                        closeable: true
                    })
                "
            >
                展示关闭按钮
            </van-button>

            <h4 class="cell-title">异步关闭</h4>
            <van-button
                type="primary"
                @click="
                    onShowImg2({
                        images: ['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg'],
                        asyncClose: true
                    })
                "
            >
                展示关闭按钮
            </van-button>

            <h4 class="cell-title">组件调用</h4>
            <van-button type="primary" @click="show = true">组件调用</van-button>

            <van-image-preview v-model="show" :images="images" @change="onChange">
                <template v-slot:index>第{{ index }}页</template>
            </van-image-preview>
        </div>
    </div>
</template>

<script>
import ImagePreview from '@components/imagepreview';
import vanHeader from '@components/header';
import vanButton from '@components/button';

export default {
    name: 'ImagePreview',
    components: {
        vanHeader,
        vanButton,
        [ImagePreview.Component.name]: ImagePreview.Component
    },
    data() {
        return {
            show: false,
            index: 0,
            images: ['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg']
        };
    },
    methods: {
        onShowImg(option) {
            ImagePreview(option);
        },
        onShowImg2(option) {
            const instance = ImagePreview(option);

            setTimeout(() => {
                instance.close();
            }, 1000);
        },
        onChange(index) {
            this.index = index;
        }
    }
};
</script>

<style scoped>
.van-content {
    padding-left: 10px;
    padding-right: 10px;
}

.van-content img {
    width: 100%;
    margin-bottom: 5px;
}
</style>
