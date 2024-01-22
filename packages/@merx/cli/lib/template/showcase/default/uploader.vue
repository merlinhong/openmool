<template>
    <div class="container">
        <van-header title="Uploader 图片上传"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-uploader :after-read="afterRead" />

            <h4 class="cell-title">文件预览</h4>
            <van-uploader v-model="fileList" multiple />

            <h4 class="cell-title">上传状态</h4>
            <van-uploader v-model="fileList2" :after-read="afterRead2" />

            <h4 class="cell-title">限制上传数量</h4>
            <van-uploader v-model="fileList3" multiple :max-count="2" />

            <h4 class="cell-title">限制上传大小</h4>
            <van-uploader multiple :max-size="14 * 1024" @oversize="onOversize" />

            <h4 class="cell-title">自定义上传样式</h4>
            <van-uploader>
                <van-button icon="plus" type="primary">上传文件</van-button>
            </van-uploader>

            <h4 class="cell-title">自定义预览样式</h4>
            <van-uploader v-model="fileList4" :after-read="afterRead">
                <template #preview-cover="{ file }">
                    <div class="preview-cover van-ellipsis">{{ file.name }}</div>
                </template>
            </van-uploader>

            <h4 class="cell-title">上传前置处理</h4>
            <van-uploader :before-read="beforeRead" />

            <h4 class="cell-title">禁用文件上传</h4>
            <van-uploader disabled />
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanUploader from '@components/uploader';
import vanButton from '@components/button';
import Toast from '@components/toast';

export default {
    name: 'Uploader',
    components: {
        vanHeader,
        vanUploader,
        vanButton
    },
    data() {
        return {
            fileList: [
                { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
                // Uploader 根据文件后缀来判断是否为图片文件
                // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
                { url: 'https://cloud-image', isImage: true }
            ],
            fileList2: [
                {
                    url: 'https://img.yzcdn.cn/vant/leaf.jpg',
                    status: 'uploading',
                    message: '上传中...'
                },
                {
                    url: 'https://img.yzcdn.cn/vant/tree.jpg',
                    status: 'failed',
                    message: '上传失败'
                }
            ],
            fileList3: [],
            fileList4: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg', name: '图片名称' }]
        };
    },
    methods: {
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            // console.log(this.fileList4);
            // console.log(file);
        },
        afterRead2(file) {
            file.status = 'uploading';
            file.message = '上传中...';

            setTimeout(() => {
                file.status = 'failed';
                file.message = '上传失败';
            }, 1000);
        },
        onOversize(file) {
            // console.log(file);
            Toast('文件大小不能超过 14kb');
        },
        beforeRead(file) {
            if (file.type !== 'image/jpeg') {
                Toast('请上传 jpg 格式图片');

                return false;
            }

            return true;
        },
        // 返回 Promise
        asyncBeforeRead(file) {
            return new Promise((resolve, reject) => {
                if (file.type !== 'image/jpeg') {
                    Toast('请上传 jpg 格式图片');
                    reject(new Error('请上传 jpg 格式图片'));
                } else {
                    let img = new File(['foo'], 'bar.jpg', {
                        type: 'image/jpeg'
                    });

                    resolve(img);
                }
            });
        }
    }
};
</script>

<style scoped>
.van-uploader {
    padding-left: 10px;
}
.preview-cover {
    position: absolute;
    box-sizing: border-box;
    bottom: 0;
    width: 100%;
    height: 30%;
    padding: 4px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
}
</style>
