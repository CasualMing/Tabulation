# 配置: selection-row

## title

* 说明: selectionRow列名
* 类型: String
* 可选值: 无
* 默认值: 无

## width

* 说明: selectionRow宽度
* 类型: String
* 可选值: 无
* 默认值: 无

## minWidth

* 说明: selectionRow 最小宽度，与 width 的区别是 width 是固定的，minWidth 会把剩余宽度按比例分配给设置了 minWidth 的列
* 类型: String
* 可选值: 无
* 默认值: 无

## fixed

* 说明: selectionRow 是否固定在左侧或者右侧，true 表示固定在左侧
* 类型: String / Boolean
* 可选值: true / left / right
* 默认值: 无

## renderHeader

* 说明: selectionRow 标题 Label 区域渲染使用的 Function
* 类型: Function (h, { column, $index })
* 可选值: 无
* 默认值: 无

## resizable

* 说明: selectionRow 是否可以通过拖动改变宽度（需要在 options 中设置 border 属性为 true
* 类型: Boolean
* 可选值: 无
* 默认值: true

## align

* 说明: 对齐方式
* 类型: String
* 可选值: left / center / right
* 默认值: left

## headerAlign

* 说明: 表头对齐方式，若不设置该项，则使用表格的对齐方式
* 类型: String
* 可选值: left / center / right
* 默认值: 无

## className

* 说明: selectionRow 的 className
* 类型: String
* 可选值: 无
* 默认值: 无

## labelClassName

* 说明: selectionRow 标题的自定义类名
* 类型: String
* 可选值: 无
* 默认值: 无
## allListData

* 说明: selectionRow 表格已加载的所有列表的数据（单选模式下，必传）
* 是否必须: 是
* 类型: Array
* 可选值: 无
* 默认值: 无
## selectionList

* 说明: 外部传入被选中的数据
* 类型: Array
* 可选值: 无
* 默认值: 无

## idKey

* 说明: 每条数据的唯一标识对应的字段名（用于多选筛选）
* 类型: String
* 可选值: 无
* 默认值: id

## isAllActived

* 说明: 表格表头多选按钮是否全选
* 类型: Boolean
* 可选值: true / false
* 默认值: false
* 必传 （需要外部传入初始值）

## isSemi

* 说明: 表格表头多选按钮是否半选
* 类型: Boolean
* 可选值: true / false
* 默认值: false
* 必传 （需要外部传入初始值）