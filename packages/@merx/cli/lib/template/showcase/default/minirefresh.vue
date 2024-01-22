<!-- html部分 -->
<template>
    <div class="container">
        <minirefresh
            ref="minirefresh"
            :url="url"
            :initPageIndex="initPageIndex"
            :pageSize="pageSize"
            :dataRequest="dataRequest"
            :dataChange="dataChange"
        >
            <template v-slot:default="slotProps">
                <van-cell
                    v-for="(item, index) in slotProps.listData"
                    :key="index"
                    :title="item.title"
                    :label="item.data"
                    :value="item.attention_degree"
                    @click="itemClick(item)"
                />
            </template>
        </minirefresh>
    </div>
</template>

<!-- js部分 -->
<script>
import minirefresh from '@components/minirefresh';
import vanCell from '@components/cell';

export default {
    components: {
        minirefresh,
        vanCell
    },
    // 定义用到的数据，在template中使用{{ }}包裹，自动实现绑定
    data() {
        return {
            // 请求的url
            url: `${Config.serverUrl}/rest/mock/list`,
            // 接口请求的初始页面
            initPageIndex: 0,
            // 每次请求的分页大小
            pageSize: 15,
            keyWord: ''
        };
    },
    methods: {
        // 请求参数函数
        dataRequest(currPage, pageSize) {
            var data = {
                // keyword: this.keyWord,
                // 当前搜索的第几页，数字类型
                currentpageindex: currPage,
                // 每页显示记录条数，数字类型
                pagesize: pageSize
            };
            var requestData = {
                params: JSON.stringify(data)
            };

            return requestData;
        },
        // 修改数据返回参数
        dataChange(res) {
            let data;

            if (res.status.code === 1) {
                data = res.custom.infolist;
            } else {
                console.error('接口返回参数错误');
            }

            return data;
        },
        itemClick(e) {
            ejs.ui.toast(e.title);
            // ejs.page.open({
            //     pageUrl: './helloworld',
            //     pageStyle: 1,
            //     orientation: 1,
            //     data: {
            //         id: e.value
            //     },
            //     success: function(result) {}
            // });
        }
    },
    watch: {
        keyWord() {
            this.$refs.minirefresh.refresh();
        }
    },
    created() {}
};
</script>

<!-- css部分 -->
<style scoped></style>
