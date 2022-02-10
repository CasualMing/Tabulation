/*
 * @Author: CasualMing
 * @Date: 2021-11-24 16:35:07
 * @LastEditTime: 2022-02-10 08:31:31
 * @Description: 
 * @FilePath: \tabulation\src\mixin\data.js
 */
import { deepCopy, removedDuplicate, formatJsonObj } from "../utils/lib";
import _get from 'lodash.get'
import _set from 'lodash.set'

export default {
    props: {
        /**
         * @description 表格数据 当页列表需要渲染的数据
         */
        data: {
            type: Array,
            default: () => { return [] },
            required: true
        },
    },
    data() {
        return {

            /**
             * @description 表格内部数据
             */
            crudTableData: [],
            /**
             * @description 拷贝的单选配置数据
             */
            indexRowCopy: null,
            /**
             * @description 拷贝的多选配置数据
             */
            selectionRowCopy: null
        }
    },
    computed: {
        crudTableDataLength() {
            return this.crudTableData.length
        }
    },
    mounted() {
        this.handleDataChange()
    },
    methods: {
        /**
         * @description lodash.get
         */
        _get,
        /**
         * @description lodash.set
         */
        _set,
        /**
         * @description 同步外部表格数据到crudTableData内部
         */
        handleDataChange() {
            const { selectionRowCopy, indexRowCopy, options, handleAttribute } = this;

            const scrollToTopMargin = handleAttribute(options.scrollToTopMargin, 0);
            const isScrollToTop = handleAttribute(options.scrollToTop, true);
            const scrollDom = this.$root.$el && this.$root.$el.querySelector && this.$root.$el.querySelector('.view-wrapper');
            if (scrollDom && isScrollToTop) {
                this.$nextTick(() => {
                    this.scrollToTop(scrollDom, 1000, scrollToTopMargin);
                })
            }
            let list = this.data ? deepCopy(this.data) : [];
            list = list.map(t => {
                return {
                    ...formatJsonObj(t),
                    itemActived: false,
                }
            })
            this.crudTableData = selectionRowCopy ?
                removedDuplicate(list, selectionRowCopy.idKey) :
                indexRowCopy ?
                removedDuplicate(list, indexRowCopy.idKey) :
                list;
        },
        /**
         * @description 排序状态
         */
        handleSortChange({ column, prop, order }) {
            const elTable = this.$refs.elTable || null;
            this.$emit('sort-change', { column, prop, order, ref: elTable })
        },

        /**
         * @description 表格数据进行改变时，进行向上传递事件
         * @param {any} scope 表格
         * @param {any} item
         */
        cellDataChange(scope, item) {
            const { $index, row } = scope;
            const { key } = item;
            this.$emit("cell-data-change", {
                rowIndex: $index,
                key,
                value: row[key],
                row,
            });
        },
    },
    watch: {
        data: {
            handler: function() {
                this.handleDataChange();
            },
            immediate: true,
            deep: true,
        }
    }
}