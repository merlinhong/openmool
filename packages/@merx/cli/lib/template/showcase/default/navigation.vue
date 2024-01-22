<template>
    <div class="container">
        <p class="component-title">轻量、可靠的移动端 Vue 组件库</p>
        <van-cell title="内置样式" class="" to="./inlinestyle"></van-cell>
        <van-collapse v-model="activeNames">
            <van-collapse-item v-for="(v, i) in menu" :title="v.title" :name="i + 1" :key="i">
                <van-cell v-for="(_v, _i) in v.children" :key="_i" :title="_v.title" :to="_v.to"></van-cell>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
import { Collapse, CollapseItem } from 'vant';
import vanCell from '@components/cell';

export default {
    name: 'Navigation',
    components: {
        'van-collapse': Collapse,
        'van-collapse-item': CollapseItem,
        vanCell
    },
    data() {
        return {
            activeNames: [1, 2, 3, 4, 5, 6],
            menu: [
                {
                    title: '基础组件',
                    children: [
                        {
                            title: 'Button 按钮',
                            to: '/button'
                        },
                        {
                            title: 'Cell 单元格',
                            to: '/cell'
                        },
                        {
                            title: 'Icon 图标',
                            to: '/icon'
                        },
                        {
                            title: 'Image 图片',
                            to: '/image'
                        },
                        {
                            title: 'Layout 布局',
                            to: '/layout'
                        },
                        {
                            title: 'Popup 弹出层',
                            to: '/popup'
                        },
                        {
                            title: 'Toast 轻提示',
                            to: '/toast'
                        }
                    ]
                },
                {
                    title: '表单组件',
                    children: [
                        {
                            title: 'Calendar 日历',
                            to: '/calendar'
                        },
                        {
                            title: 'Checkbox 复选框',
                            to: '/checkbox'
                        },
                        {
                            title: 'DatePicker 时间选择',
                            to: '/datepicker'
                        },
                        {
                            title: 'Field 输入框',
                            to: '/field'
                        },
                        {
                            title: 'Form 表单',
                            to: '/form'
                        },
                        {
                            title: 'NumberKeyboard 数字键盘',
                            to: '/numberkeyboard'
                        },
                        {
                            title: 'PasswordInput 密码输入框',
                            to: '/passwordinput'
                        },
                        {
                            title: 'Picker 选择器',
                            to: '/picker'
                        },
                        {
                            title: 'Radio 单选框',
                            to: '/radio'
                        },
                        {
                            title: 'Rate 评分',
                            to: '/rate'
                        },
                        {
                            title: 'Search 搜索',
                            to: '/search'
                        },
                        {
                            title: 'Slider 滑块',
                            to: '/slider'
                        },
                        {
                            title: 'Stepper 步进器',
                            to: '/stepper'
                        },
                        {
                            title: 'Switch 开关',
                            to: '/switch'
                        },
                        {
                            title: 'SwitchCell 开关单元格',
                            to: '/switchcell'
                        },
                        {
                            title: 'Uploader 图片上传',
                            to: '/uploader'
                        }
                    ]
                },
                {
                    title: '反馈组件',
                    children: [
                        {
                            title: 'Actionsheet 上拉菜单',
                            to: '/actionsheet'
                        },
                        {
                            title: 'Dialog 弹出框',
                            to: '/dialog'
                        },
                        {
                            title: 'DropdownMenu 下拉菜单',
                            to: '/dropdownMenu'
                        },
                        {
                            title: 'Loading 加载',
                            to: '/loading'
                        },
                        {
                            title: 'Notify 消息通知',
                            to: '/notify'
                        },
                        {
                            title: 'Overlay 遮罩层',
                            to: '/overlay'
                        },
                        // {
                        //     title: 'PullDown 下拉刷新',
                        //     to: '/pulldown'
                        // },
                        // {
                        //     title: 'Pulltorefresh 下拉刷新上拉加载',
                        //     to: '/pulltorefresh'
                        // },
                        // {
                        //     title: 'PullUp 上拉加载',
                        //     to: '/pullup'
                        // },
                        {
                            title: 'Minirefresh 下拉刷新上拉加载',
                            to: '/minirefresh'
                        },
                        {
                            title: 'ShareSheet 分享面板',
                            to: '/sharesheet'
                        },
                        {
                            title: 'SwipeCell 滑动单元格',
                            to: '/swipecell'
                        }
                    ]
                },
                {
                    title: '展示组件',
                    children: [
                        {
                            title: 'Circle 环形进度条',
                            to: '/circle'
                        },
                        {
                            title: 'Collapse 折叠面板',
                            to: '/collapse'
                        },
                        {
                            title: 'CountDown 倒计时',
                            to: '/countdown'
                        },
                        {
                            title: 'Divider 分割线',
                            to: '/divider'
                        },
                        {
                            title: 'Empty 空状态',
                            to: '/empty'
                        },
                        {
                            title: 'ImagePreview 图片预览',
                            to: '/imagepreview'
                        },
                        {
                            title: 'LazyLoad 图片懒加载',
                            to: '/lazyload'
                        },
                        {
                            title: 'NoticeBar 通告栏',
                            to: '/noticebar'
                        },
                        {
                            title: 'Panel 面板',
                            to: '/panel'
                        },
                        {
                            title: 'Progress 进度条',
                            to: '/progress'
                        },
                        {
                            title: 'Skeleton 骨架屏',
                            to: '/skeleton'
                        },
                        {
                            title: 'Steps 步骤条',
                            to: '/steps'
                        },
                        {
                            title: 'Sticky 粘性布局',
                            to: '/sticky'
                        },
                        {
                            title: 'Gallery 轮播',
                            to: '/gallery'
                        },
                        {
                            title: 'Tag 标记',
                            to: '/tag'
                        },
                        {
                            title: 'Amap 地图组件',
                            to: '/amap'
                        }
                    ]
                },
                {
                    title: '功能组件',
                    children: [
                        {
                            title: 'FileInput 选择文件',
                            to: '/fileinput'
                        },
                        {
                            title: 'VerifyCode 验证码',
                            to: '/verifycode'
                        },
                        {
                            title: 'GridUnlock 网格解锁',
                            to: '/gridunlock'
                        },
                        {
                            title: 'EasyCalendar 简易日历',
                            to: '/easycalendar'
                        }
                    ]
                },
                {
                    title: '导航组件',
                    children: [
                        {
                            title: 'Grid 宫格',
                            to: '/grid'
                        },
                        {
                            title: 'IndexBar 索引栏',
                            to: '/indexbar'
                        },
                        {
                            title: 'Badge 徽章',
                            to: '/badge'
                        },
                        {
                            title: 'Header 导航栏',
                            to: '/header'
                        },
                        {
                            title: 'Pagination 分页',
                            to: '/pagination'
                        },
                        {
                            title: 'Sidebar 侧边导航',
                            to: '/sidebar'
                        },
                        {
                            title: 'Tab 标签页',
                            to: '/tab'
                        },
                        {
                            title: 'Tabbar 标签页',
                            to: '/tabbar'
                        },
                        {
                            title: 'TreeSelect 分类选择',
                            to: '/treeselect'
                        }
                    ]
                },
                {
                    title: '业务组件',
                    children: [
                        {
                            title: 'AddressEdit 地址编辑',
                            to: '/addressedit'
                        },
                        {
                            title: 'AddressList 地址列表',
                            to: '/addresslist'
                        },
                        {
                            title: 'Area 省市区选择',
                            to: '/area'
                        },
                        {
                            title: 'Card 商品卡片',
                            to: '/card'
                        },
                        {
                            title: 'GoodsAction 商品导航',
                            to: '/goodsaction'
                        },
                        {
                            title: 'SubmitBar 提交订单栏',
                            to: '/submitbar'
                        }
                    ]
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped>
.container {
    padding: 10px;

    .component-title {
        text-align: center;
        margin-top: 10px;
        margin-bottom: 20px;
        color: #455a64;
    }

    .van-collapse-item {
        margin-bottom: 20px;
    }

    .van-collapse-item__content {
        padding: 0;
    }

    .van-collapse-item__title {
        padding-top: 18px;
        padding-bottom: 18px;
    }

    /deep/ .van-cell__title {
        white-space: nowrap;
        font-size: 14px;
    }

    .van-collapse-item__title > .van-cell__title > span {
        font-size: 16px;
    }
}
</style>
