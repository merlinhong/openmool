<template>
    <div class="container">
        <van-header title="Image 图片"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-row>
                <van-col span="24">
                    <van-image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                </van-col>
            </van-row>
            <h4 class="cell-title">填充模式</h4>
            <van-row class="img-wrapper">
                <van-col span="8">
                    <van-image width="100%" height="27vw" fit="contain" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <p>contain</p>
                </van-col>
                <van-col span="8">
                    <van-image width="100%" height="27vw" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <p>cover</p>
                </van-col>
                <van-col span="8">
                    <van-image width="100%" height="27vw" fit="fill" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <p>fill</p>
                </van-col>
                <van-col span="8">
                    <van-image width="100%" height="27vw" fit="none" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <p>none</p>
                </van-col>
                <van-col span="8">
                    <van-image width="100%" height="27vw" fit="scale-down" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <p>scale-down</p>
                </van-col>
            </van-row>
            <h4 class="cell-title">圆形图片</h4>
            <van-row class="img-wrapper">
                <van-col span="8">
                    <van-image
                        round
                        width="100%"
                        height="27vw"
                        fit="contain"
                        src="https://img.yzcdn.cn/vant/cat.jpeg"
                    />
                    <p>contain</p>
                </van-col>
                <van-col span="8">
                    <van-image round width="100%" height="27vw" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <p>cover</p>
                </van-col>
                <van-col span="8">
                    <van-image round width="100%" height="27vw" fit="fill" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <p>fill</p>
                </van-col>
                <van-col span="8">
                    <van-image round width="100%" height="27vw" fit="none" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <p>none</p>
                </van-col>
                <van-col span="8">
                    <van-image
                        round
                        width="100%"
                        height="27vw"
                        fit="scale-down"
                        src="https://img.yzcdn.cn/vant/cat.jpeg"
                    />
                    <p>scale-down</p>
                </van-col>
            </van-row>
            <h4 class="cell-title">加载中提示</h4>
            <van-row class="img-wrapper">
                <van-col span="8">
                    <van-image width="100%" height="27vw"></van-image>
                    <p>默认提示</p>
                </van-col>
                <van-col span="8">
                    <van-image width="100%" height="27vw">
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                    <p>自定义提示</p>
                </van-col>
            </van-row>
            <h4 class="cell-title">加载失败提示</h4>
            <van-row class="img-wrapper">
                <van-col span="8">
                    <van-image width="100%" height="27vw" src="https://img.yzcdn.cn/vant/cat1.jpeg"></van-image>
                    <p>默认提示</p>
                </van-col>
                <van-col span="8">
                    <van-image width="100%" height="27vw" src="https://img.yzcdn.cn/vant/cat1.jpeg">
                        <template v-slot:error>加载失败</template>
                    </van-image>
                    <p>自定义提示</p>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanImage from '@components/image';
import vanRow from '@components/row';
import vanCol from '@components/col';
import vanLoading from '@components/loading';

export default {
    name: 'ImgShow',
    components: {
        vanHeader,
        vanImage,
        vanRow,
        vanCol,
        vanLoading
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

.img-wrapper .van-col {
    padding-right: 13px;
    margin-bottom: 15px;
}

.img-wrapper .van-col p {
    margin-top: 5px;
    color: #646566;
    font-size: 14px;
    text-align: center;
}
</style>
