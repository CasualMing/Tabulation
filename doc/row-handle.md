<!--
 * @Author: CasualMing
 * @Date: 2021-12-01 14:16:54
 * @LastEditTime: 2021-12-01 16:50:14
 * @Description: 表格操作列配置
 * @FilePath: \sinosun-operation-ui\components\Tabulation\doc\row-handle.md
-->
# 配置: row-handle
## columnHeader

* 说明: 操作列表头文字
* 类型: String
* 可选值: 无
* 默认值: 操作

## width

* 说明: 操作列宽度
* 类型: String
* 可选值: 无
* 默认值: 无

## minWidth

* 说明: 操作列最小宽度
* 类型: String
* 可选值: 无
* 默认值: 无

## fixed

* 说明: 操作列固定列
* 类型: String / Boolean
* 可选值: true / left / right
* 默认值: 无

## align

* 说明: 操作列对齐方式
* 类型: String
* 可选值: left / center / right
* 默认值: left

## renderHeader

* 说明: 操作列 Label 区域渲染使用的 Function
* 类型: Function (h, { column, $index })
* 可选值: 无
* 默认值: 无

## custom

* 说明: 自定义按钮
* 类型: Array
* 可选值: 无
* 默认值: 无

    ----
    ### name

    * 说明: 操作列的组件名称
    * 类型: String
    * 可选值: el-button / el-switch
    * 默认值: 无

    ### emit

    * 说明: 自定义按钮监听的事件
    * 类型: String
    * 可选值: 无
    * 默认值: 无

    ### text

    * 说明: 自定义按钮文字
    * 类型: String
    * 可选值: 无
    * 默认值: 无

    ### size

    * 说明: 自定义按钮尺寸
    * 类型: String
    * 可选值: medium / small / mini
    * 默认值: 无

    ### type

    * 说明: 自定义按钮类型
    * 类型: String
    * 可选值: primary / success / warning / danger / info / text
    * 默认值: 无

    ### icon

    * 说明: 自定义按钮图标类名
    * 类型: String
    * 可选值: 无
    * 默认值: 无

    ### show

    * 说明: 控制是否显示自定义按钮，类型为 `Function` 时，返回值只能为 `true` 或 `false`
    * 类型: Boolean / Function (index, row)
    * 可选值: 无
    * 默认值: true

    ### disabled

    * 说明: 控制是否禁用自定义按钮，类型为 `Function` 时，返回值只能为 `true` 或 `false`
    * 类型: Boolean / Function (index, row)
    * 可选值: 无
    * 默认值: false

    ### component

    * 说明: 操作列的自定义组件
    * 类型: Object
    * 可选值: 无
    * 默认值: 无
        
        ---
        #### name

        * 说明: 自定义组件的组件名称
        * 类型: String
        * 可选值: 无
        * 默认值: 无
        
        #### key

        * 说明: 自定义组件的组件在 data 中绑定值的属性名
        * 类型: String
        * 可选值: 无
        * 默认值: 无

        #### props

        * 说明: 自定义组件传参对象
        * 类型: Object
        * 可选值: 无
        * 默认值: 无

        #### render

        * 说明: 自定义渲染组件方法
        * 类型: Function(h, scope.row, scope.column, scope.$index)
        * 可选值: 无
        * 默认值: 无