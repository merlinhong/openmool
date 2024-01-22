<template>
    <div class="container">
        <van-header title="Form 表单"></van-header>
        <div class="van-content">
            <h4 class="cell-title">基础用法</h4>
            <van-form @submit="onSubmit">
                <van-field
                    v-model="username"
                    name="用户名"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                <div style="margin: 16px">
                    <van-button round block type="info" native-type="submit">提交</van-button>
                </div>
            </van-form>

            <h4 class="cell-title">校验规则</h4>
            <van-form validate-first @failed="onFailed">
                <!-- 通过 pattern 进行正则校验 -->
                <van-field
                    v-model="value1"
                    label="文本"
                    name="pattern"
                    placeholder="正则校验"
                    :rules="[{ pattern, message: '请输入六位数字' }]"
                />
                <!-- 通过 validator 进行函数校验 -->
                <van-field
                    v-model="value2"
                    label="文本"
                    name="validator"
                    placeholder="函数校验"
                    :rules="[{ validator, message: '请输入以1开头的11位数字' }]"
                />
                <!-- 通过 validator 进行异步函数校验 -->
                <van-field
                    v-model="value3"
                    label="文本"
                    name="asyncValidator"
                    placeholder="异步函数校验"
                    :rules="[{ validator: asyncValidator, message: '请输入六位数字' }]"
                />
                <div style="margin: 16px">
                    <van-button round block type="info" native-type="submit">提交</van-button>
                </div>
            </van-form>

            <h4 class="cell-title">表单项类型</h4>
            <van-form>
                <van-field name="switch" label="开关">
                    <template #input>
                        <van-switch v-model="switchChecked" size="20" />
                    </template>
                </van-field>
                <van-field name="checkbox" label="复选框">
                    <template #input>
                        <van-checkbox v-model="checkbox" shape="square" />
                    </template>
                </van-field>
                <van-field name="checkboxGroup" label="复选框组">
                    <template #input>
                        <van-checkbox-group v-model="checkboxGroup" direction="horizontal">
                            <van-checkbox name="1" shape="square">复选框 1</van-checkbox>
                            <van-checkbox name="2" shape="square">复选框 2</van-checkbox>
                        </van-checkbox-group>
                    </template>
                </van-field>
                <van-field name="radio" label="单选框">
                    <template #input>
                        <van-radio-group v-model="radio" direction="horizontal">
                            <van-radio name="1">单选框 1</van-radio>
                            <van-radio name="2">单选框 2</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field name="stepper" label="步进器">
                    <template #input>
                        <van-stepper v-model="stepper" />
                    </template>
                </van-field>
                <van-field name="rate" label="评分">
                    <template #input>
                        <van-rate v-model="rate" />
                    </template>
                </van-field>
                <van-field name="slider" label="滑块">
                    <template #input>
                        <van-slider v-model="slider" />
                    </template>
                </van-field>
                <van-field name="uploader" label="文件上传">
                    <template #input>
                        <van-uploader v-model="uploader" />
                    </template>
                </van-field>
                <van-field
                    readonly
                    clickable
                    name="picker"
                    :value="value"
                    label="选择器"
                    placeholder="点击选择城市"
                    @click="showPicker = true"
                />
                <van-field
                    readonly
                    clickable
                    name="datetimePicker"
                    :value="value4"
                    label="时间选择"
                    placeholder="点击选择时间"
                    @click="showPicker2 = true"
                />
                <van-field
                    readonly
                    clickable
                    name="area"
                    :value="value5"
                    label="地区选择"
                    placeholder="点击选择省市区"
                    @click="showArea = true"
                />
                <van-field
                    readonly
                    clickable
                    name="calendar"
                    v-model="value6"
                    label="日历"
                    placeholder="点击选择日期"
                    @click="showCalendar = true"
                />

                <div style="margin: 16px">
                    <van-button round block type="info" native-type="submit">提交</van-button>
                </div>
            </van-form>
            <van-picker
                v-model="showPicker"
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                @cancel="showPicker = false"
            />
            <van-date-picker v-model="showPicker2" type="time" @confirm="onConfirm2" @cancel="showPicker2 = false" />
            <van-area v-model="showArea" :area-list="areaList" @confirm="onConfirmArea" @cancel="showArea = false" />
            <van-calendar v-model="showCalendar" @confirm="onConfirmCalendar" />
        </div>
    </div>
</template>

<script>
import vanHeader from '@components/header';
import vanForm from '@components/form';
import vanField from '@components/field';
import vanButton from '@components/button';
import vanPicker from '@components/picker';
import vanDatePicker from '@components/datepicker';
import vanArea from '@components/area';
import vanSwitch from '@components/switch';
import vanCheckbox from '@components/checkbox';
import vanCheckboxGroup from '@components/checkboxgroup';
import vanRadio from '@components/radio';
import vanRadioGroup from '@components/radiogroup';
import vanStepper from '@components/stepper';
import vanRate from '@components/rate';
import vanSlider from '@components/slider';
import vanUploader from '@components/uploader';
import vanCalendar from '@components/calendar';
import Toast from '@components/toast';

export default {
    name: 'Field',
    components: {
        vanHeader,
        vanForm,
        vanField,
        vanButton,
        vanPicker,
        vanDatePicker,
        vanArea,
        vanSwitch,
        vanCheckbox,
        vanCheckboxGroup,
        vanRadio,
        vanRadioGroup,
        vanStepper,
        vanRate,
        vanSlider,
        vanUploader,
        vanCalendar
    },
    data() {
        return {
            checkbox: false,
            username: '',
            password: '',
            switchChecked: false,
            checkboxGroup: [],
            radio: '1',
            stepper: 1,
            value1: '',
            value2: '',
            value3: '',
            pattern: /\d{6}/,
            rate: 3,
            slider: 50,
            uploader: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],
            value: '',
            columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
            showPicker: false,
            value4: '',
            showPicker2: false,
            value5: '',
            showArea: false,
            areaList: {
                // eslint-disable-next-line camelcase
                province_list: {
                    110000: '北京市',
                    120000: '天津市'
                },
                // eslint-disable-next-line camelcase
                city_list: {
                    110100: '北京市',
                    110200: '县',
                    120100: '天津市',
                    120200: '县'
                },
                // eslint-disable-next-line camelcase
                county_list: {
                    110101: '东城区',
                    110102: '西城区',
                    110105: '朝阳区',
                    110106: '丰台区',
                    120101: '和平区',
                    120102: '河东区',
                    120103: '河西区',
                    120104: '南开区',
                    120105: '河北区'
                }
            },
            value6: '',
            showCalendar: false
        };
    },
    methods: {
        onSubmit(values) {
            console.log('submit', values);
        },
        // 校验函数返回 true 表示校验通过，false 表示不通过
        validator(val) {
            return /1\d{10}/.test(val);
        },
        // 异步校验函数返回 Promise
        asyncValidator(val) {
            return new Promise((resolve) => {
                Toast.loading('验证中...');

                setTimeout(() => {
                    Toast.clear();
                    resolve(/\d{6}/.test(val));
                }, 1000);
            });
        },
        onFailed(errorInfo) {
            console.log('failed', errorInfo);
        },
        onConfirm(value) {
            this.value = value;
            this.showPicker = false;
        },
        onConfirm2(time) {
            this.value4 = time;
            this.showPicker2 = false;
        },
        onConfirmArea(values) {
            this.value5 = values.map((item) => item.name).join('/');
            this.showArea = false;
        },
        onConfirmCalendar(date) {
            this.value6 = `${date.getMonth() + 1}/${date.getDate()}`;
            this.showCalendar = false;
        }
    }
};
</script>

<style scoped>
.van-content {
    background-color: #f7f8fa;
}
</style>
