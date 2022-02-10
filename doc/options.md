<!--
 * @Author: CasualMing
 * @Date: 2021-11-24 15:49:37
 * @LastEditTime: 2022-01-06 13:23:31
 * @Description: 表格配置
 * @FilePath: \sinosun-operation-ui\components\Tabulation\doc\options.md
-->
# 配置: options

## height

* 说明: 表格的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 String 类型，则这个高度会设置为表格的 style.height 的值，表格的高度会受控于外部样式。
* 类型: String / Number
* 可选值: 无
* 默认值: 无

## maxHeight

* 说明: 表格的最大高度
* 类型: String / Number
* 可选值: 无
* 默认值: 无

## stripe

* 说明: 是否为斑马纹模式
* 类型: Boolean
* 可选值: 无
* 默认值: true

## border

* 说明: 是否带有纵向边框
* 类型: Boolean
* 可选值: 无
* 默认值: false

## size

* 说明: 表格的尺寸
* 类型: String
* 可选值: medium / small / mini
* 默认值: 无

## fit

* 说明: 列的宽度是否自撑开
* 类型: Boolean
* 可选值: 无
* 默认值: true

## showHeader

* 说明: 是否显示表头
* 类型: Boolean
* 可选值: 无
* 默认值: true

## highlightCurrentRow

* 说明: 是否要高亮当前行
* 类型: Boolean
* 可选值: 无
* 默认值: false

## currentRowKey

* 说明: 当前行的 key，只写属性
* 类型: String / Number
* 可选值: 无
* 默认值: 无

## rowClassName

* 说明: 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
* 类型: Function ({row, rowIndex}) / String
* 可选值: 无
* 默认值: 无

## rowStyle

* 说明: 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
* 类型: Function ({row, rowIndex}) / Object
* 可选值: 无
* 默认值: 无

## cellClassName

* 说明: 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。
* 类型: Function ({row, column, rowIndex, columnIndex}) / String
* 可选值: 无
* 默认值: 无

## cellStyle

* 说明: 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
* 类型: Function ({row, column, rowIndex, columnIndex}) / Object
* 可选值: 无
* 默认值: 无

## headerRowClassName

* 说明: 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
* 类型: Function ({row, rowIndex}) / String
* 可选值: 无
* 默认值: 无

## headerRowStyle

* 说明: 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。
* 类型: Function ({row, rowIndex}) / Object
* 可选值: 无
* 默认值: 无

## headerCellClassName

* 说明: 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。
* 类型: Function ({row, column, rowIndex, columnIndex}) / String
* 可选值: 无
* 默认值: 无

## headerCellStyle

* 说明: 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
* 类型: Function ({row, column, rowIndex, columnIndex}) / Object
* 可选值: 无
* 默认值: 无

## rowKey

* 说明: 行数据的 Key，用来优化表格的渲染；在使用 reserveSelection 功能的情况下，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 function。
* 类型: Function (row) / String
* 可选值: 无
* 默认值: 无

## emptyText

* 说明: 空数据时显示的文本内容
* 类型: String
* 可选值: 无
* 默认值: 无

## defaultSort

* 说明: 默认的排序列的 prop 和顺序。它的prop属性指定默认的排序的列，order指定默认排序的顺序
* 类型: Object
* 可选值: order: ascending / descending
* 默认值: 如果只指定了 prop, 没有指定order, 则默认顺序是 ascending

## tooltipEffect

* 说明: tooltip effect 属性
* 类型: String
* 可选值: dark / light
* 默认值: 无

## showSummary

* 说明: 是否在表尾显示合计行
* 类型: Boolean
* 可选值: 无
* 默认值: false

## sumText

* 说明: 合计行第一列的文本
* 类型: String
* 可选值: 无
* 默认值: 合计

## summaryMethod

* 说明: 自定义的合计计算方法
* 类型: Function ({ columns, data })
* 可选值: 无
* 默认值: 无

## spanMethod

* 说明: 合并行或列的计算方法
* 类型: Function ({ row, column, rowIndex, columnIndex })
* 可选值: 无
* 默认值: 无

## selectOnIndeterminate

* 说明: 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行
* 类型: Boolean
* 可选值: 无
* 默认值: true

## bodyScroll

* 说明: table 表格是否允许表格内容区域进行局部滚动（局部滚动的时候，需要设置 table-body 的最大高度）
* 类型: Boolean
* 可选值: 无
* 默认值: false

## isTipsImg

* 说明: `table` 表格没有数据时是否展示缺省图片 
* 类型: Boolean
* 可选值: 无
* 默认值: true

## isTipsText

* 说明: `table` 表格没有数据时是否展示文案提示
* 类型: Boolean
* 可选值: 无
* 默认值: true

## tipsTop

* 说明: `table` 表格没有数据时缺省提示距离顶部的距离
* 类型: String
* 可选值: 无
* 默认值: 20px

## tipsText

* 说明: `table` 表格没有数据时缺省提示的文案
* 类型: String
* 可选值: 无
* 默认值: 暂无数据

## loadingHeight

* 说明: `table` 表格没有数据时缺省提示的容器高度
* 类型: String
* 可选值: 无
* 默认值: 100%

## scrollToTop

* 说明: `table` 表格数据改变时，要不要进行自动滚动到页面顶部
* 类型: Boolean
* 可选值: true / false
* 默认值: true

## scrollToTopMargin

* 说明: `table` 表格数据改变时，滚动到距离顶部多少px
* 类型: Number
* 可选值: 无
* 默认值: 0