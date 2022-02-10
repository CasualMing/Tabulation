/*
 * @Author: CasualMing
 * @Date: 2021-11-25 10:21:25
 * @LastEditTime: 2022-02-10 08:33:56
 * @Description: 表格滚动相关方法及配置
 * @FilePath: \tabulation\src\mixin\scroll.js
 */
import { backTop } from '../utils/lib'
export default {
    props: {
        /**
         * @description 表格进行加载更多时的配置
         */
        loadMoreOptions: {
            type: Object,
            default: null,
        }
    },
    methods: {
        loadMore() {
            const { loadMoreOptions, handleAttribute } = this;
            const isScroll = handleAttribute(loadMoreOptions.isScroll, false);
            if (isScroll) {
                this.$emit("load-more");
            }
        },
        /**
         * @description 滚动表格内容区域到距离顶部指定的距离
         * @param {any} distance
         */
        tableScrollTop(distance, top = 0) {
            this.$nextTick(() => {
                if (this.$refs.elTable) {
                    const { bodyWrapper } = this.$refs.elTable || {};
                    if (bodyWrapper._isVue) {
                        backTop(bodyWrapper.$el, distance, top);
                    } else {
                        backTop(bodyWrapper, distance, top)
                    }
                }
            })
        },
        /**
         * @description 滚动到距离指定元素父元素的指定高度
         * @param {any} distance 每次滚动多少
         * @param {any} top 距离顶部多少px
         */
        scrollToTop(taget, distance = 50, top) {
            this.$nextTick(() => {
                if (!taget) return false;
                if (taget._isVue) {
                    backTop(taget.$el, distance, top);
                } else {
                    backTop(taget, distance, top)
                }
            })
        },
    },

    directives: {
        // 滚动到列表底部
        scrollToEnd: {
            bind(el, binding, vnode) {
                let isOpen = true;

                const scrollEle = el.querySelector(".el-table__body-wrapper"); // 表格滚动元素
                const that = vnode.context;
                that.scrollEle = scrollEle;
                scrollEle.addEventListener("scroll", function() {
                    if (!isOpen) return;
                    isOpen = false;
                    setTimeout(() => {
                        isOpen = true;
                        const { scrollTop, scrollHeight, clientHeight } = this;
                        const isScrollToEnd = scrollTop && scrollHeight - scrollTop - clientHeight <= 50;
                        if (isScrollToEnd) {
                            binding.value();
                        }
                    }, 700);
                });
            },
        },
    },

    computed: {
        tabeleScollClass() {
            return `
                el-table--scrollable-y
                el-table--fluid-height 
                el-table--fit 
                el-table--enable-row-hover 
                el-table--enable-row-transition`;
        },
    }
}