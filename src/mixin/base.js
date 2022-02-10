/*
 * @Author: CasualMing
 * @Date: 2021-11-24 10:06:56
 * @LastEditTime: 2021-12-10 14:52:55
 * @Description: 基本的数据接收及方法
 * @FilePath: \sinosun-operation-ui\components\Tabulation\mixin\base.js
 */
export default {
    props: {
        /**
         * @description 表头数据及配置
         */
        columns: {
            type: Array,
            required: true
        },
        /**
         * @description 表格加载配置
         */
        loadingOptions: {
            type: Object,
            default: null
        },
        /**
         * @description 表格配置
         */
        options: {
            type: Object,
            default: () => {}
        },
    },
    methods: {
        /**
         * @description 单元格 hover 进入时触发的事件
         */
        handleCellMouseEnter(row, column, cell, event) {
            this.$emit('cell-mouse-enter', row, column, cell, event)
        },
        /**
         * @description 单元格 hover 退出时触发的事件
         */
        handleCellMouseLeave(row, column, cell, event) {
            this.$emit('cell-mouse-leave', row, column, cell, event)
        },
        /**
         * @description 单元格点击时触发的事件
         */
        handleCellClick(row, column, cell, event) {
            this.$emit('cell-click', row, column, cell, event)
        },
        /**
         * @description 单元格双击时触发的事件
         */
        handleCellDblclick(row, column, cell, event) {
            this.$emit('cell-dblclick', row, column, cell, event)
        },
        /**
         * @description 行点击时触发的事件
         */
        handleRowClick(row, event, column) {
            this.$emit('row-click', row, event, column)
        },
        /**
         * @description 行右键点击时触发的事件
         */
        handleRowContextmenu(row, event) {
            this.$emit('row-contextmenu', row, event)
        },
        /**
         * @description 行双击时触发的事件
         */
        handleRowDblclick(row, event) {
            this.$emit('row-dblclick', row, event)
        },
        /**
         * @description 表头点击时触发的事件
         */
        handleHeaderClick(column, event) {
            this.$emit('header-click', column, event)
        },
        /**
         * @description 表头右键点击时触发的事件
         */
        handleHeaderContextmenu(column, event) {
            this.$emit('header-contextmenu', column, event)
        },

        /**
         * @description table 表格内容区域局部滚动
         */
        initTableBodyScroll() {
            this.$nextTick(() => {
                const { $el: El } = this;
                if (!El) return false;
                // 观察器的配置（需要观察什么变动）
                const config = {
                    attributes: true, // 开启监听属性
                    childList: true, // 开启监听子节点
                    subtree: true, // 开启监听子节点下面的所有节点
                };
                // 当观察到变动时执行的回调函数
                const callback = (mutationsList) => {
                    for (let mutation of mutationsList) {
                        const { type, target, attributeName } = mutation;
                        if (type === 'attributes') {
                            if (!target[attributeName] || !target[attributeName].length) return false;
                            const attribute = target[attributeName][0];
                            const changeAttr = getComputedStyle(target)[attribute];
                            if (typeof attribute === 'string' && attribute.toLowerCase() === 'max-height') {
                                this.$refs.elTable && this.$refs.elTable.layout.setMaxHeight(changeAttr);
                            }
                        }
                    }
                };
                // 创建一个观察器实例并传入回调函数
                const observer = new MutationObserver(callback);
                // 以上述配置开始观察目标节点
                observer.observe(El, config);
            })
        }
    },
    mounted() {
        const { options, handleAttribute } = this;
        if (handleAttribute(options.bodyScroll, false)) {
            this.initTableBodyScroll();
        }
        window.onresize = () => {
            if (handleAttribute(options.bodyScroll, false)) {
                this.initTableBodyScroll();
            }
        }
    },
    watch: {
        options: {
            handler: function(v) {
                if (v && v.bodyScroll) {
                    this.initTableBodyScroll();
                }
            },
            immediate: true
        }
    }
}