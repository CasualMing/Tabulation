<!--
 * @Author: CasualMing
 * @Date: 2021-11-26 10:06:26
 * @LastEditTime: 2021-12-01 10:06:55
 * @Description: 表格可监听的事件
 * @FilePath: \sinosun-operation-ui\components\Tabulation\doc\events.md
-->

# 事件

## select

* 说明: （多选模式下）当用户手动勾选数据行的 Checkbox 时触发的事件
* 回调参数: selection, row, selectionList

## select-all

* 说明: （多选模式下）当用户手动勾选全选 Checkbox 时触发的事件
* 回调参数: selection, selectionList

## selection-change

* 说明: （多选模式下）当选择项发生变化时会触发该事件
* 回调参数: selection,selectionList

## selection-index

* 说明: （单选模式下）当选择项发生变化时会触发该事件
* 回调参数: selection , index, row
## current-change

* 说明: 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开 options 中的 highlight-current-row 属性
* 回调参数: currentRow, oldCurrentRow

## cell-mouse-enter

* 说明: 当单元格 hover 进入时会触发该事件
* 回调参数: row, column, cell, event

## cell-mouse-leave

* 说明: 当单元格 hover 退出时会触发该事件
* 回调参数: row, column, cell, event

## cell-click

* 说明: 当某个单元格被点击时会触发该事件
* 回调参数: row, column, cell, event

## cell-dblclick

* 说明: 当某个单元格被双击击时会触发该事件
* 回调参数: row, column, cell, event

## row-click

* 说明: 当某一行被点击时会触发该事件
* 回调参数: row, event, column

## row-contextmenu

* 说明: 当某一行被鼠标右键点击时会触发该事件
* 回调参数: row, event

## row-dblclick

* 说明: 当某一行被双击时会触发该事件
* 回调参数: row, event

## header-click

* 说明: 当某一列的表头被点击时会触发该事件
* 回调参数: column, event

## header-contextmenu

* 说明: 当某一列的表头被鼠标右键点击时触发该事件
* 回调参数: column, event

## sort-change

* 说明: 当表格的排序条件发生变化的时候会触发该事件
* 回调参数: { column, prop, order, ref }

## filter-change

* 说明: 当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。
* 回调参数: filters


## pagination-size-change

* 说明: 当分页 pageSize 改变时会触发
* 回调参数: pageSize

## pagination-current-change

* 说明: 当分页 currentPage 改变时会触发
* 回调参数: currentPage

## pagination-prev-click

* 说明: 当分页上一页按钮被用户点击改变当前页后触发
* 回调参数: currentPage

## pagination-next-click

* 说明: 当分页下一页按钮被用户点击改变当前页后触发
* 回调参数: currentPage

## cell-data-change

* 说明: 表格内编辑时单元格数据改变触发
* 回调参数: rowIndex,key,value,row

## load-more

* 说明: 表格支持滚动加载的时候，滚动到底部时触发事件
* 回调参数: 无