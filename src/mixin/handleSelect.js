/*
 * @Author: CasualMing
 * @Date: 2021-11-29 16:17:47
 * @LastEditTime: 2022-02-10 08:33:19
 * @Description: 单选多选操作相关逻辑
 * @FilePath: \tabulation\src\mixin\handleSelect.js
 */
import { deepCopy, removedDuplicate } from "../utils/lib";
export default {
    props: {

        /**
         * @description 索引
         */
        indexRow: {
            type: Object,
            default: () => {}
        },
        /**
         * @description 多选
         */
        selectionRow: {
            type: Object,
            default: () => {}
        },
    },
    methods: {

        /**
         * @description 勾选数据时触发的事件
         */
        handleSelect(row) {
            const { selectionRowCopy: { idKey } } = this;
            let { selectionRowCopy: { selectionList } } = this;
            if (row.itemActived) {
                selectionList && selectionList.push(row);
            } else {
                selectionList = selectionList ? selectionList.filter(
                    (ele) => ele[idKey] != row[idKey]
                ) : [];
            }
            selectionList = selectionList ? removedDuplicate(selectionList, idKey) : [];

            this.initSemi();
            this.initAllStatus();

            this.$emit('select', row.itemActived, row, selectionList);

            this.handleSelectionChange(selectionList)
        },
        /**
         * @description 勾选全选时触发的事件
         */
        handleSelectAll(selection) {
            const { crudTableData, selectionRowCopy: { selectionList, idKey } } = this;
            let list = []
            if (selection) {
                list = deepCopy(selectionList).concat(crudTableData);
                list = removedDuplicate(list, idKey);
                crudTableData.forEach((ele) => {
                    ele.itemActived = true;
                });
            } else {
                list = selectionList.length ? selectionList
                    .map((ele) => {
                        crudTableData.forEach((item) => {
                            item.itemActived = false;
                            if (item[idKey] === ele[idKey]) {
                                ele.itemActived = false;
                            }
                        });
                        return ele;
                    })
                    .filter((ele) => ele.itemActived) : [];
            }

            this.$emit('select-all', selection, list);
            this.handleSelectionChange(list);

            this.initSemi(false);

            this.initAllStatus(selection);
        },

        /**
         * @description 复选框选择项发生变化时触发的事件
         */
        handleSelectionChange(selection) {
            this.$emit('selection-change', selection)
        },

        /**
         * @description 单选模式下，单选框发生变化回调
         */
        selectIndex(selection, scope) {
            const { $index: index, row } = scope;
            this.$emit('selection-index', selection, index, row);
        },
        /**
         * @description 多选模式下选中数据配合表格回显
         */
        initTableSelectionActived() {
            const { crudTableData, selectionRowCopy } = this;
            const { selectionList, idKey } = selectionRowCopy || {};
            if (crudTableData && crudTableData.length) {
                crudTableData.forEach((item) => {
                    item.itemActived = false;
                    selectionList && selectionList.length ? selectionList.forEach((ele) => {
                        if (ele[idKey] == item[idKey]) {
                            item.itemActived = true;
                        }
                    }) : item.itemActived = false;;
                });
                this.initSemi();
                this.initAllStatus();
            }
        },
        /**
         *  @description 初始化全选按钮是否展示半选状态
         */
        initSemi() {
            const { getActivedNum, crudTableDataLength } = this;
            const isSemi = arguments.length ?
                !!arguments[0] :
                !!getActivedNum && (getActivedNum < crudTableDataLength);
            this.$set(this.selectionRowCopy, 'isSemi', isSemi);
        },

        /**
         *  @description 初始化全选按钮是否全选
         */
        initAllStatus() {
            const { getActivedNum, crudTableDataLength } = this;
            const isAllActived = arguments.length ? !!arguments[0] :
                !!crudTableDataLength && (crudTableDataLength === getActivedNum);
            this.$set(this.selectionRowCopy, 'isAllActived', isAllActived);
        },
    },
    computed: {

        /**
         * @description 获取当前页选中数量
         */
        getActivedNum() {
            const { crudTableData } = this
            return (
                crudTableData &&
                crudTableData.filter((ele) => ele.itemActived).length
            );
        },
    },
    watch: {
        indexRow: {
            handler: function(newV, oldV) {
                if (newV !== oldV) {
                    this.indexRowCopy = newV;
                }
            },
            immediate: true,
            deep: true,
        },
        selectionRow: {
            handler: function(newV, oldV) {
                if (newV !== oldV) {
                    this.selectionRowCopy = newV;
                    this.initTableSelectionActived();
                }
            },
            immediate: true,
            deep: true,
        },
    }
}