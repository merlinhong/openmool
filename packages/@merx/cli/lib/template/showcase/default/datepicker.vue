<template>
    <div class="container">
        <van-header title="datePicker 日期选择"></van-header>
        <div class="van-content">
            <h4 class="cell-title">用法示例</h4>
            <van-cell-group>
                <van-cell is-link @click="showTop = true" :value="dateTop" title="选择年月日" />
                <van-cell is-link @click="showBottom = true" :value="text" title="选择年月" />
                <van-cell is-link @click="showLeft = true" :value="dateLeft" title="选择月日" />
                <van-cell is-link @click="showClose = true" :value="dateClose" title="选择时间" />
                <van-cell is-link @click="showZdy = true" :value="text2" title="选择完整时间" />
                <van-cell is-link @click="showRight = true" :value="dateRight" title="选择年月日小时" />
                <van-cell is-link @click="showIconP = true" :value="dateIconP" title="选项过滤器" />
                <van-cell is-link @click="showRound = true" :value="dateRound" title="自定义列排序" />
            </van-cell-group>
            <van-date-picker
                v-model="showTop"
                :current-date="currentDate"
                type="date"
                title="选择年月日"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="onConfirmTop"
            />
            <van-date-picker
                v-model="showBottom"
                :current-date="currentDate"
                type="year-month"
                title="选择年月"
                :min-date="minDate"
                :max-date="maxDate"
                :formatter="formatter"
                @confirm="onConfirmBottom"
            />
            <van-date-picker
                v-model="showLeft"
                :current-date="currentDate"
                type="month-day"
                title="选择月日"
                :min-date="minDate"
                :max-date="maxDate"
                :formatter="formatter2"
                @confirm="onConfirmLeft"
            />
            <van-date-picker
                v-model="showClose"
                :current-date="currentTime"
                type="time"
                title="选择时间"
                :min-hour="10"
                :max-hour="20"
                @confirm="onConfirmClose"
            />
            <van-date-picker
                v-model="showZdy"
                :current-date="currentDate"
                type="datetime"
                title="选择完整时间"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="onConfirmZdy"
            />
            <van-date-picker
                v-model="showRight"
                :current-date="currentDate"
                type="datehour"
                title="选择年月日小时"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="onConfirmRight"
            />
            <van-date-picker
                v-model="showIconP"
                :current-date="currentDate"
                type="time"
                :filter="filter"
                @confirm="onConfirmIconP"
            />
            <van-date-picker
                v-model="showRound"
                :current-date="currentDate"
                type="date"
                title="自定义列排序"
                :columns-order="['month', 'day', 'year']"
                :formatter="formatter3"
                @confirm="onConfirmRound"
            />
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanCellGroup from '@components/cellgroup';
import vanCell from '@components/cell';
import vanDatePicker from '@components/datepicker';

export default {
    name: 'date-picker',
    components: {
        vanDatePicker,
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
            dateTop: '',
            text: '',
            dateLeft: '',
            dateClose: '',
            dateZdy: '',
            text2: '',
            dateRight: '',
            dateIconP: '',
            dateRound: '',
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2025, 10, 1),
            currentDate: new Date(),
            currentTime: '12:00'
        };
    },
    methods: {
        onConfirmTop(date) {
            this.dateTop = date;
        },
        onConfirmBottom(date) {
            this.text = date;
        },
        onConfirmLeft(date) {
            this.dateLeft = date;
        },
        onConfirmClose(date) {
            this.dateClose = date;
        },
        onConfirmZdy(date) {
            this.text2 = date;
        },
        onConfirmRight(date) {
            this.dateRight = date;
        },
        onConfirmIconP(date) {
            this.dateIconP = date;
        },
        onConfirmRound(date) {
            this.dateRound = date;
        },
        formatter(type, val) {
            if (type === 'year') {
                return `${val}年`;
            } else if (type === 'month') {
                return `${val}月`;
            }

            return val;
        },
        formatter2(type, val) {
            if (type === 'month') {
                return `${val}月`;
            } else if (type === 'day') {
                return `${val}日`;
            }

            return val;
        },
        filter(type, options) {
            if (type === 'minute') {
                return options.filter((option) => option % 5 === 0);
            }

            return options;
        },
        formatter3(type, val) {
            if (type === 'year') {
                return val + '年';
            }
            if (type === 'month') {
                return val + '月';
            }
            if (type === 'day') {
                return val + '日';
            }

            return val;
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
