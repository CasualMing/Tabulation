/*
 * @Author: CasualMing
 * @Date: 2021-11-24 11:20:20
 * @LastEditTime: 2021-12-08 11:16:34
 * @Description: 列表是否含有操作项
 * @FilePath: \sinosun-operation-ui\components\Tabulation\mixin\handleRow.js
 */
export default {
    props: {
        /**
         * @description 操作项
         */
        rowHandle: {
            type: Object,
            default: () => null
        }
    },
    methods: {
        /**
         * @description 控制操作列 show 的方法
         */
        handleShow(show = true, index, row) {
            if (typeof show === 'boolean') {
                return show
            } else if (typeof show === 'function') {
                return show(index, row)
            }
            return Boolean(show)
        },
        /**
         * @description 控制操作列 disabled 的方法
         */
        handleDisabled(disabled = false, index, row) {
            if (typeof disabled === 'boolean') {
                return disabled
            } else if (typeof disabled === 'function') {
                return disabled(index, row)
            }
            return Boolean(disabled)
        }
    },
    watch: {
        rowHandle: {
            handler: function(v) {
                return v;
            },
            immediate: true,
            deep: true
        }
    }
}