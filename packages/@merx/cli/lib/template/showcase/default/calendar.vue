<template>
    <div class="container">
        <van-header title="calendar 日历"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-cell-group>
                <van-cell is-link @click="showTop = true" :value="dateTop" title="选择单个日期" />
                <van-cell is-link @click="showBottom = true" :value="text" title="选择多个日期" />
                <van-cell is-link @click="showLeft = true" :value="dateLeft" title="选择日期区间" />
            </van-cell-group>
            <van-calendar v-model="showTop" @confirm="onConfirmTop" />
            <van-calendar v-model="showBottom" type="multiple" @confirm="onConfirmBottom" />
            <van-calendar v-model="showLeft" type="range" @confirm="onConfirmLeft" />

            <h4 class="cell-title">快捷选择</h4>
            <van-cell-group>
                <van-cell is-link @click="showClose = true" :value="dateClose" title="选择单个日期" />
                <van-cell is-link @click="showZdy = true" :value="text2" title="选择日期区间" />
            </van-cell-group>
            <van-calendar v-model="showClose" :show-confirm="false" @confirm="onConfirmClose" />
            <van-calendar v-model="showZdy" :show-confirm="false" type="range" @confirm="onConfirmZdy" />
            <h4 class="cell-title">自定义日历</h4>
            <van-cell-group>
                <van-cell is-link @click="showRight = true" :value="dateRight" title="自定义颜色" />
                <van-cell is-link @click="showIconP = true" :value="dateIconP" title="自定义日期范围" />
                <van-cell is-link @click="showRound = true" :value="dateRound" title="自定义按钮文字" />
                <van-cell is-link @click="showBody = true" :value="dateBody" title="自定义日期文案" />
                <van-cell is-link @click="showPos = true" :value="datePos" title="自定义弹出位置" />
                <van-cell is-link @click="showMax = true" :value="dateMax" title="日期区间最大范围" />
                <van-cell is-link @click="showStart = true" :value="dateStart" title="自定义周起始日" />
            </van-cell-group>
            <van-calendar v-model="showRight" color="#07c160" @confirm="onConfirmRight" />
            <van-calendar v-model="showIconP" :min-date="minDate" :max-date="maxDate" @confirm="onConfirmIconP" />
            <van-calendar
                v-model="showRound"
                type="range"
                confirm-text="完成"
                confirm-disabled-text="请选择结束时间"
                @confirm="onConfirmRound"
            />
            <van-calendar v-model="showBody" type="range" :formatter="formatter" @confirm="onConfirmBody" />
            <van-calendar v-model="showPos" :round="false" position="right" @confirm="onConfirmPos" />
            <van-calendar
                v-model="showMax"
                type="range"
                :max-range="3"
                :style="{ height: '500px' }"
                @confirm="onConfirmMax"
            />
            <van-calendar v-model="showStart" first-day-of-week="1" @confirm="onConfirmStart" />

            <h4 class="cell-title">平铺展示</h4>
            <van-calendar title="日历" :poppable="false" :show-confirm="false" :style="{ height: '500px' }" />
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanCellGroup from '@components/cellgroup';
import vanCell from '@components/cell';
import vanCalendar from '@components/calendar';

export default {
    name: 'calendar',
    components: {
        vanCalendar,
        vanHeader,
        vanCellGroup,
        vanCell
    },
    data() {
        return {
            showTop: false,
            showBottom: false,
            showLeft: false,
            showRight: false,
            showClose: false,
            showZdy: false,
            showIconP: false,
            showRound: false,
            showBody: false,
            showPos: false,
            showMax: false,
            showStart: false,
            minDate: new Date(2010, 0, 1),
            maxDate: new Date(2010, 0, 31),
            dateTop: '',
            text: '',
            dateLeft: '',
            dateClose: '',
            dateZdy: '',
            text2: '',
            dateRight: '',
            dateIconP: '',
            dateRound: '',
            dateBody: '',
            datePos: '',
            dateMax: '',
            dateStart: ''
        };
    },
    methods: {
        onConfirmTop(date) {
            this.showTop = false;
            this.dateTop = this.formatDate(date);
        },
        onConfirmBottom(date) {
            this.showBottom = false;
            this.text = `选择了 ${date.length} 个日期`;
        },
        onConfirmLeft(date) {
            const [start, end] = date;

            this.showLeft = false;
            this.dateLeft = `${this.formatDate(start)} - ${this.formatDate(end)}`;
        },
        onConfirmClose(date) {
            this.showClose = false;
            this.dateClose = this.formatDate(date);
        },
        onConfirmZdy(date) {
            this.showZdy = false;
            this.text2 = `选择了 ${date.length} 个日期`;
        },
        onConfirmRight(date) {
            this.showRight = false;
            this.dateRight = this.formatDate(date);
        },
        onConfirmIconP(date) {
            this.showIconP = false;
            this.dateIconP = this.formatDate(date);
        },
        onConfirmRound(date) {
            const [start, end] = date;

            this.showRound = false;
            this.dateRound = `${this.formatDate(start)} - ${this.formatDate(end)}`;
        },
        onConfirmBody(date) {
            const [start, end] = date;

            this.showBody = false;
            this.dateBody = `${this.formatDate(start)} - ${this.formatDate(end)}`;
        },
        formatter(day) {
            const month = day.date.getMonth() + 1;
            const date = day.date.getDate();

            if (month === 5) {
                if (date === 1) {
                    day.topInfo = '劳动节';
                } else if (date === 4) {
                    day.topInfo = '青年节';
                } else if (date === 11) {
                    day.text = '今天';
                }
            }

            if (day.type === 'start') {
                day.bottomInfo = '入住';
            } else if (day.type === 'end') {
                day.bottomInfo = '离店';
            }

            return day;
        },
        onConfirmPos(date) {
            this.showPos = false;
            this.datePos = this.formatDate(date);
        },
        onConfirmMax(date) {
            const [start, end] = date;

            this.showMax = false;
            this.dateMax = `${this.formatDate(start)} - ${this.formatDate(end)}`;
        },
        onConfirmStart(date) {
            this.showStart = false;
            this.dateStart = this.formatDate(date);
        },
        formatDate(date) {
            return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        }
    }
};
</script>

<style scoped>
.van-content {
    padding-left: 10px;
    padding-right: 10px;
}
</style>
