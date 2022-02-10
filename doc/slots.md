<!--
 * @Author: CasualMing
 * @Date: 2021-11-26 08:46:30
 * @LastEditTime: 2021-12-13 15:22:06
 * @Description: 表格需要的插槽
 * @FilePath: \sinosun-operation-ui\components\Tabulation\doc\slots.md
-->
# 插槽

## empty

* 说明: 表格无数据时的插槽
* 默认: 无

## append

* 说明: 插入至表格最后一行之后的内容，如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。若表格有合计行，该 slot 会位于合计行之上。
* 默认: 暂可通过 `loadMoreOptions` 配置滚动加载时的列表样式 

## pageSlot

* 说明: 表格分页 slot的插槽
* 默认: 无

## index

* 说明: 单选状态下的插槽
* 默认: radio

## selectionHeader

* 说明: 多选状态下的标头插槽
* 默认: checkbox

## selection

* 说明: 多选状态下的每个单元格插槽
* 默认: checkbox