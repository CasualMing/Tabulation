/*
 * @Author: CasualMing
 * @Date: 2021-11-24 10:25:43
 * @LastEditTime: 2021-12-10 09:20:31
 * @Description: 表格分页处理
 * @FilePath: \sinosun-operation-ui\components\Tabulation\mixin\pagination.js
 */
export default {
    props: {
        /**
         * @description 表格数据
         */
        pagination: {
            type: Object,
            default: () => null
        }
    },
    methods: {
        /**
         * @description 每页条数改变
         */
        handlePaginationSizeChange(pageSize) {
            this.$emit('size-change', pageSize)
        },
        /**
         * @description 当前页码改变
         */
        handlePaginationCurrentChange(currentPage) {
            this.$emit('current-change', currentPage)
        },
        /**
         * @description 上一页
         */
        handlePaginationPrevClick(currentPage) {
            this.$emit('prev-click', currentPage)
        },
        /**
         * @description 下一页
         */
        handlePaginationNextClick(currentPage) {
            this.$emit('next-click', currentPage)
        },
    },
    watch: {
        pagination: {
            handler: function(v) {
                return v;
            },
            deep: true,
        }
    }
}