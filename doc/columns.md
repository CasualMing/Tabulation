<!--
 * @Author: CasualMing
 * @Date: 2021-11-24 15:48:05
 * @LastEditTime: 2021-12-13 15:46:57
 * @Description: 表头配置及例子
 * @FilePath: \sinosun-operation-ui\components\Tabulation\doc\columns.md
-->
# 配置: columns

## title

* 说明: 表格列名
* 类型: String
* 可选值: 无
* 默认值: 无

## key

* 说明: data 中对应列的键名（表格内需要通过 `component` 进行自定义渲染 `element-ui` 的组件的时候，用于进行双向数据绑定，改变的值来源 `data`）
* 类型: String
* 可选值: 无
* 默认值: 无

## width

* 说明: 对应列的宽度
* 类型: String
* 可选值: 无
* 默认值: 无

## minWidth

* 说明: 对应列的最小宽度，与 width 的区别是 width 是固定的，minWidth 会把剩余宽度按比例分配给设置了 minWidth 的列
* 类型: String
* 可选值: 无
* 默认值: 无

## fixed

* 说明: 列是否固定在左侧或者右侧，true 表示固定在左侧
* 类型: String / Boolean
* 可选值: true / left / right
* 默认值: 无

## renderHeader

* 说明: 列标题 Label 区域渲染使用的 Function
* 类型: Function (h, { column, $index })
* 可选值: 无
* 默认值: 无

## sortable

* 说明: 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
* 类型: Boolean / String
* 可选值: true, false, 'custom'
* 默认值: false

## sortMethod

* 说明: 对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效，需返回一个数字，和 Array.sort 表现一致
* 类型: Function (a, b)
* 可选值: 无
* 默认值: 无

## sortBy

* 说明: 指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推
* 类型: String / Array / Function (row, index)
* 可选值: 无
* 默认值: 无

## sortOrders

* 说明: 数据在排序时所使用排序策略的轮转顺序，仅当 sortable 为 true 时有效。需传入一个数组，随着用户点击表头，该列依次按照数组中元素的顺序进行排序
* 类型: array
* 可选值: 数组中的元素需为以下三者之一：ascending 表示升序，descending 表示降序，null 表示还原为原始顺序
* 默认值: ['ascending', 'descending', null]

## resizable

* 说明: 对应列是否可以通过拖动改变宽度（需要在 `options` 中设置 border 属性为 true
* 类型: Boolean
* 可选值: 无
* 默认值: true

## formatter

* 说明: 用来格式化内容
* 类型: Function (row, column, cellValue, index)
* 可选值: 无
* 默认值: 无

## showOverflowTooltip

* 说明: 当内容过长被隐藏时显示 tooltip
* 类型: Boolean
* 可选值: 无
* 默认值: false

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

* 说明: 列的 className
* 类型: String
* 可选值: 无
* 默认值: 无

## labelClassName

* 说明: 当前列标题的自定义类名
* 类型: String
* 可选值: 无
* 默认值: 无

## filters

* 说明: 数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。
* 类型: Function ({ text, value })
* 可选值: 无
* 默认值: 无

## filterPlacement

* 说明: 过滤弹出框的定位
* 类型: String
* 可选值: top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end
* 默认值: bottom

## filterMultiple

* 说明: 数据过滤的选项是否多选
* 类型: Boolean
* 可选值: 无
* 默认值: true

## filterMethod

* 说明: 数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。
* 类型: Function (value, row, column)
* 可选值: 无
* 默认值: 无

## filteredValue

* 说明: 选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性。
* 类型: Array
* 可选值: 无
* 默认值: 无
## show

* 说明: 控制是否显示自定义按钮，类型为 `Function` 时，返回值只能为 `true` 或 `false`
* 类型: Boolean / Function (index, row)
* 可选值: 无
* 默认值: true
## children

* 说明: 表格需要多级渲染的时候，可传入此参数，最高接收三层（数据同 `columns` ）
* 类型: JSONArray
* 可选值: 无
* 默认值: 无

## component

* 说明: 表格渲染的组件，组件请参考 [组件](http://element-cn.eleme.io/#/zh-CN/component)
* 类型: Object
* 可选属性: name / show / buttonMode / options / props / render / 其他需要绑定到组件上的属性
* 默认值: 无
    ### name 

    * 说明: 表格渲染的组件名，组件请参考 [组件](http://element-cn.eleme.io/#/zh-CN/component)
    * 类型: String
    * 可选值: el-input / el-input-number / el-radio / el-checkbox / el-select / el-cascader / el-switch / el-slider / el-time-select / el-time-picker / el-date-picker / el-rate / el-color-picker / 自定义组件
    * 默认值: 无

    ### show 

    * 说明: 表格渲染的组件是否展示
    * 类型: Boolean / Function
    * 可选值: 无
    * 默认值: true

    ### buttonMode

    * 说明: 当渲染的组件是 `checkbox` 类型的时候，用于控制是渲染 `el-checkbox-button` 还是  `el-checkbox` 
    * 类型: Boolean
    * 可选值: true / false
    * 默认值: false

    ### options

    * 说明: 当渲染的组件是 `el-radio、el-radio-button、el-checkbox-button、el-checkbox、el-select(el-option)` 这几种可以通过数组循环创建，可用于循环创建,此时通过循环配置的响应数据，经过传入的 `data` 通过 `columns` 中的 `key` 取到对应的值。
    * 类型: JSONArray
    * 可选值: 无
    * 默认值: 无

    ### props

    * 说明: 表格内进行自定义组件渲染的时候，传入自定义组件的参数
    * 类型: Object
    * 可选值: 无
    * 默认值: 无

    ### render

    * 说明: 表格内不想单独定义组件文件，但是现有的表格布局不满足需求，可使用 `render` 函数，具体使用方法可见[render](https://cn.vuejs.org/v2/api/#render)
    * 类型: Object
    * 可选值: 无
    * 默认值: 无
