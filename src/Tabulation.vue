<!--
 * @Author: CasualMing
 * @Date: 2021-11-24 09:29:43
 * @LastEditTime: 2022-02-10 08:35:33
 * @Description: 基于element的table 表格进行的二次封装
 * @FilePath: \tabulation\src\Tabulation.vue
-->
<template>
    <div
        class="tabulation"
        v-loading.body.fullscreen.lock="loadingOptions? handleAttribute(loadingOptions.loading, false): false"
        :element-loading-text="loadingOptions ? handleAttribute(loadingOptions.text, '拼命加载中') : null"
        :element-loading-spinner="loadingOptions ? handleAttribute(loadingOptions.spinner, 'el-icon-loading') : null"
        :element-loading-background="loadingOptions ? handleAttribute(loadingOptions.background, 'rgba(255, 255, 255, 0.5)') : null"
    >
        <el-table
            :class="isEmpty(options)? handleAttribute(options.bodyScoll,false) && 'tabeleScollClass' : '' "
            ref="elTable"
            :data="crudTableData"
            v-bind="options"
            :stripe="isEmpty(options)? handleAttribute(options.stripe,true):true"
            @select="handleSelect"
            @select-all="handleSelectAll"
            @selection-change="handleSelectionChange"
            @sort-change="handleSortChange"
            @cell-mouse-enter="handleCellMouseEnter"
            @cell-mouse-leave="handleCellMouseLeave"
            @cell-click="handleCellClick"
            @cell-dblclick="handleCellDblclick"
            @row-click="handleRowClick"
            @row-contextmenu="handleRowContextmenu"
            @row-dblclick="handleRowDblclick"
            @header-click="handleHeaderClick"
            @header-contextmenu="handleHeaderContextmenu"
            v-scroll-to-end="loadMore"
        >
            <template #empty>
                <slot name="empty">
                    <LoadingTips
                        :isLoading="!crudTableDataLength && (loadingOptions? handleAttribute(loadingOptions.loading, false):false)"
                        :isTipsImg="isEmpty(options)? handleAttribute(options.isTipsImg,true):true"
                        :isTipsText="isEmpty(options)? handleAttribute(options.isTipsText,true):true"
                        :tipsTop="isEmpty(options)? handleAttribute(options.tipsTop,'20px'):'20px'"
                        :tipsText="isEmpty(options)? handleAttribute(options.tipsText,'暂无数据'):'暂无数据'"
                        :height="isEmpty(options)? handleAttribute(options.loadingHeight,null):null"
                    >
                    </LoadingTips>
                </slot>
            </template>
            <!-- 普通列 暂不使用tabulation-column递归组件，有bug -->
            <!-- 多选 -->
            <el-table-column
                v-if="isEmpty(selectionRowCopy) || selectionRowCopy === ''"
                :label="handleAttribute(selectionRowCopy.title, '')"
                v-bind="selectionRowCopy"
            >
                <div
                    slot="header"
                    slot-scope="scope"
                >
                    <slot
                        name="selectionHeader"
                        :data="scope"
                    >
                        <el-tooltip
                            class="selection-tootip"
                            effect="dark"
                            placement="top"
                            :content="handleAttribute(selectionRowCopy.title, '')"
                            v-if="handleAttribute(selectionRowCopy.title, '')"
                        >
                            <span class="selection-checkbox">
                                <el-checkbox
                                    :indeterminate="selectionRowCopy.isSemi"
                                    v-model="selectionRowCopy.isAllActived"
                                    @change="handleSelectAll"
                                ></el-checkbox>
                            </span>
                        </el-tooltip>
                        <el-checkbox
                            v-else
                            :indeterminate="selectionRowCopy.isSemi"
                            v-model="selectionRowCopy.isAllActived"
                            @change="handleSelectAll"
                        ></el-checkbox>
                    </slot>
                </div>
                <div
                    slot="default"
                    slot-scope="scope"
                >
                    <slot
                        name="selection"
                        :data="scope"
                    >
                        <el-checkbox
                            v-model="scope.row.itemActived"
                            @change="handleSelect(scope.row)"
                        >
                        </el-checkbox>
                    </slot>
                </div>
            </el-table-column>
            <!-- 单选 -->
            <el-table-column
                v-if="isEmpty(indexRowCopy) || indexRowCopy === ''"
                :label="handleAttribute(indexRowCopy.title, '')"
                v-bind="indexRowCopy"
            >
                <div
                    slot="default"
                    slot-scope="scope"
                >
                    <slot
                        name="index"
                        :data="scope"
                    >
                        <el-radio
                            v-model="indexRowCopy.selection"
                            @change="selectIndex($event, scope)"
                            :label="scope.row[indexRowCopy.idKey]"
                        >
                        </el-radio>
                    </slot>
                </div>
            </el-table-column>
            <template v-for="(item, index) in columns">
                <el-table-column
                    :key="index"
                    :label="handleAttribute(item.title, '')"
                    :prop="handleAttribute(item.key, null)"
                    v-bind="item"
                    v-if="handleShow(item.show, index, item)"
                >
                    <template slot-scope="scope">
                        <el-input
                            v-if="item.component && item.component.name === 'el-input'"
                            v-show="handleShow(item.component.show, index, scope.row)"
                            :disabled="handleDisabled(item.component.disabled, scope.$index, scope.row)"
                            v-model="scope.row[item.key]"
                            v-bind="item.component"
                            @change="cellDataChange(scope,item)"
                        >
                        </el-input>
                        <el-input-number
                            v-else-if="item.component && item.component.name === 'el-input-number'"
                            v-show="handleShow(item.component.show, index, scope.row)"
                            :disabled="handleDisabled(item.component.disabled, scope.$index, scope.row)"
                            v-model="scope.row[item.key]"
                            v-bind="item.component"
                            @change="cellDataChange(scope,item)"
                        >
                        </el-input-number>
                        <el-radio-group
                            v-else-if="item.component && item.component.name === 'el-radio'"
                            v-show="handleShow(item.component.show, index, scope.row)"
                            :disabled="handleDisabled(item.component.disabled, scope.$index, scope.row)"
                            v-model="scope.row[item.key]"
                            v-bind="item.component"
                            @change="cellDataChange(scope,item)"
                        >
                            <template v-if="item.component.buttonMode">
                                <el-radio-button
                                    v-for="option in item.component.options"
                                    :key="option.value"
                                    :label="option.value"
                                >
                                    {{option.label}}
                                </el-radio-button>
                            </template>
                            <template v-else>
                                <el-radio
                                    v-for="option in item.component.options"
                                    :key="option.value"
                                    :label="option.value"
                                >
                                    {{option.label}}
                                </el-radio>
                            </template>
                        </el-radio-group>
                        <el-checkbox-group
                            v-else-if="item.component && item.component.name === 'el-checkbox'"
                            v-show="handleShow(item.component.show, index, scope.row)"
                            :disabled="handleDisabled(item.component.disabled, scope.$index, scope.row)"
                            v-model="scope.row[item.key]"
                            v-bind="item.component"
                            @change="cellDataChange(scope,item)"
                        >
                            <template v-if="item.component.buttonMode">
                                <el-checkbox-button
                                    v-for="option in item.component.options"
                                    :key="option.value"
                                    :label="option.value"
                                >
                                    {{option.label}}
                                </el-checkbox-button>
                            </template>
                            <template v-else>
                                <el-checkbox
                                    v-for="option in item.component.options"
                                    :key="option.value"
                                    :label="option.value"
                                >
                                    {{option.label}}
                                </el-checkbox>
                            </template>
                        </el-checkbox-group>
                        <el-select
                            v-else-if="item.component && item.component.name === 'el-select'"
                            v-show="handleShow(item.component.show, index, scope.row)"
                            :disabled="handleDisabled(item.component.disabled, scope.$index, scope.row)"
                            v-model="scope.row[item.key]"
                            v-bind="item.component"
                            @change="cellDataChange(scope,item)"
                        >
                            <el-option
                                v-for="option in item.component.options"
                                :key="option.value"
                                v-bind="option"
                            >
                            </el-option>
                        </el-select>
                        <el-cascader
                            v-else-if="item.component && item.component.name === 'el-cascader'"
                            v-show="handleShow(item.component.show, index, scope.row)"
                            :disabled="handleDisabled(item.component.disabled, scope.$index, scope.row)"
                            v-model="scope.row[item.key]"
                            v-bind="item.component"
                            @change="cellDataChange(scope,item)"
                        >
                        </el-cascader>
                        <el-switch
                            v-else-if="item.component && item.component.name === 'el-switch'"
                            v-show="handleShow(item.component.show, index, scope.row)"
                            :disabled="handleDisabled(item.component.disabled, scope.$index, scope.row)"
                            v-model="scope.row[item.key]"
                            v-bind="item.component"
                            @change="cellDataChange(scope,item)"
                        >
                        </el-switch>
                        <el-slider
                            v-else-if="item.component && item.component.name === 'el-slider'"
                            v-show="handleShow(item.component.show, index, scope.row)"
                            :disabled="handleDisabled(item.component.disabled, scope.$index, scope.row)"
                            v-model="scope.row[item.key]"
                            v-bind="item.component"
                            @change="cellDataChange(scope,item)"
                        >
                        </el-slider>
                        <el-time-select
                            v-else-if="item.component && item.component.name === 'el-time-select'"
                            v-show="handleShow(item.component.show, index, scope.row)"
                            :disabled="handleDisabled(item.component.disabled, scope.$index, scope.row)"
                            v-model="scope.row[item.key]"
                            v-bind="item.component"
                            @change="cellDataChange(scope,item)"
                        >
                        </el-time-select>
                        <el-time-picker
                            v-else-if="item.component && item.component.name === 'el-time-picker'"
                            v-show="handleShow(item.component.show, index, scope.row)"
                            :disabled="handleDisabled(item.component.disabled, scope.$index, scope.row)"
                            v-model="scope.row[item.key]"
                            v-bind="item.component"
                            @change="cellDataChange(scope,item)"
                        >
                        </el-time-picker>
                        <el-date-picker
                            v-else-if="item.component && item.component.name === 'el-date-picker'"
                            v-show="handleShow(item.component.show, index, scope.row)"
                            :disabled="handleDisabled(item.component.disabled, scope.$index, scope.row)"
                            v-model="scope.row[item.key]"
                            v-bind="item.component"
                            @change="cellDataChange(scope,item)"
                        >
                        </el-date-picker>
                        <el-rate
                            v-else-if="item.component && item.component.name === 'el-rate'"
                            v-show="handleShow(item.component.show, index, scope.row)"
                            :disabled="handleDisabled(item.component.disabled, scope.$index, scope.row)"
                            v-model="scope.row[item.key]"
                            v-bind="item.component"
                            @change="cellDataChange(scope,item)"
                        >
                        </el-rate>
                        <el-color-picker
                            v-else-if="item.component && item.component.name === 'el-color-picker'"
                            v-show="handleShow(item.component.show, index, scope.row)"
                            :disabled="handleDisabled(item.component.disabled, scope.$index, scope.row)"
                            v-model="scope.row[item.key]"
                            v-bind="item.component"
                            @change="cellDataChange(scope,item)"
                        >
                        </el-color-picker>
                        <render-custom-component
                            v-else-if="item.component && item.component.name"
                            v-show="handleShow(item.component.show, index, scope.row)"
                            :disabled="handleDisabled(item.component.disabled, scope.$index, scope.row)"
                            v-model="scope.row[item.key]"
                            :component-name="item.component.name"
                            :props="item.component.props ? item.component.props : null"
                            :scope="scope"
                        >
                        </render-custom-component>
                        <render-component
                            v-else-if="item.component && item.component.render"
                            v-show="handleShow(item.component.show, index, scope.row)"
                            :disabled="handleDisabled(item.component.disabled, scope.$index, scope.row)"
                            :render-function="item.component.render"
                            :scope="scope"
                        >
                        </render-component>
                        <template v-else>{{item.formatter ? item.formatter(scope.row, scope.column, _get(scope.row, item.key), scope.$index) : _get(scope.row, item.key)}}</template>
                    </template>
                    <template v-if="item.children">
                        <template v-for="(item2, index2) in item.children">
                            <el-table-column
                                :key="index2"
                                :label="handleAttribute(item2.title, '')"
                                :prop="handleAttribute(item2.key, null)"
                                v-bind="item2"
                                v-if="handleShow(item2.show, index2, item2)"
                            >
                                <template slot-scope="scope">
                                    <el-input
                                        v-if="item2.component && item2.component.name === 'el-input'"
                                        v-show="handleShow(item2.component.show, index2, scope.row)"
                                        :disabled="handleDisabled(item2.component.disabled, scope.$index, scope.row)"
                                        v-model="scope.row[item2.key]"
                                        v-bind="item2.component"
                                        @change="cellDataChange(scope,item2)"
                                    >
                                    </el-input>
                                    <el-input-number
                                        v-else-if="item2.component && item2.component.name === 'el-input-number'"
                                        v-show="handleShow(item2.component.show, index2, scope.row)"
                                        :disabled="handleDisabled(item2.component.disabled, scope.$index, scope.row)"
                                        v-model="scope.row[item2.key]"
                                        v-bind="item2.component"
                                        @change="cellDataChange(scope,item2)"
                                    >
                                    </el-input-number>
                                    <el-radio-group
                                        v-else-if="item2.component && item2.component.name === 'el-radio'"
                                        v-show="handleShow(item2.component.show, index2, scope.row)"
                                        :disabled="handleDisabled(item2.component.disabled, scope.$index, scope.row)"
                                        v-model="scope.row[item2.key]"
                                        v-bind="item2.component"
                                        @change="cellDataChange(scope,item2)"
                                    >
                                        <template v-if="item2.component.buttonMode">
                                            <el-radio-button
                                                v-for="option in item2.component.options"
                                                :key="option.value"
                                                :label="option.value"
                                            >
                                                {{option.label}}
                                            </el-radio-button>
                                        </template>
                                        <template v-else>
                                            <el-radio
                                                v-for="option in item2.component.options"
                                                :key="option.value"
                                                :label="option.value"
                                            >
                                                {{option.label}}
                                            </el-radio>
                                        </template>
                                    </el-radio-group>
                                    <el-checkbox-group
                                        v-else-if="item2.component && item2.component.name === 'el-checkbox'"
                                        v-show="handleShow(item2.component.show, index2, scope.row)"
                                        :disabled="handleDisabled(item2.component.disabled, scope.$index, scope.row)"
                                        v-model="scope.row[item2.key]"
                                        v-bind="item2.component"
                                        @change="cellDataChange(scope,item2)"
                                    >
                                        <template v-if="item2.component.buttonMode">
                                            <el-checkbox-button
                                                v-for="option in item2.component.options"
                                                :key="option.value"
                                                :label="option.value"
                                            >
                                                {{option.label}}
                                            </el-checkbox-button>
                                        </template>
                                        <template v-else>
                                            <el-checkbox
                                                v-for="option in item2.component.options"
                                                :key="option.value"
                                                :label="option.value"
                                            >
                                                {{option.label}}
                                            </el-checkbox>
                                        </template>
                                    </el-checkbox-group>
                                    <el-select
                                        v-else-if="item2.component && item2.component.name === 'el-select'"
                                        v-show="handleShow(item2.component.show, index2, scope.row)"
                                        :disabled="handleDisabled(item2.component.disabled, scope.$index, scope.row)"
                                        v-model="scope.row[item2.key]"
                                        v-bind="item2.component"
                                        @change="cellDataChange(scope,item2)"
                                    >
                                        <el-option
                                            v-for="option in item2.component.options"
                                            :key="option.value"
                                            v-bind="option"
                                        >
                                        </el-option>
                                    </el-select>
                                    <el-cascader
                                        v-else-if="item2.component && item2.component.name === 'el-cascader'"
                                        v-show="handleShow(item2.component.show, index2, scope.row)"
                                        :disabled="handleDisabled(item2.component.disabled, scope.$index, scope.row)"
                                        v-model="scope.row[item2.key]"
                                        v-bind="item2.component"
                                        @change="cellDataChange(scope,item2)"
                                    >
                                    </el-cascader>
                                    <el-switch
                                        v-else-if="item2.component && item2.component.name === 'el-switch'"
                                        v-show="handleShow(item2.component.show, index2, scope.row)"
                                        :disabled="handleDisabled(item2.component.disabled, scope.$index, scope.row)"
                                        v-model="scope.row[item2.key]"
                                        v-bind="item2.component"
                                        @change="cellDataChange(scope,item2)"
                                    >
                                    </el-switch>
                                    <el-slider
                                        v-else-if="item2.component && item2.component.name === 'el-slider'"
                                        v-show="handleShow(item2.component.show, index2, scope.row)"
                                        :disabled="handleDisabled(item2.component.disabled, scope.$index, scope.row)"
                                        v-model="scope.row[item2.key]"
                                        v-bind="item2.component"
                                        @change="cellDataChange(scope,item2)"
                                    >
                                    </el-slider>
                                    <el-time-select
                                        v-else-if="item2.component && item2.component.name === 'el-time-select'"
                                        v-show="handleShow(item2.component.show, index2, scope.row)"
                                        :disabled="handleDisabled(item2.component.disabled, scope.$index, scope.row)"
                                        v-model="scope.row[item2.key]"
                                        v-bind="item2.component"
                                        @change="cellDataChange(scope,item2)"
                                    >
                                    </el-time-select>
                                    <el-time-picker
                                        v-else-if="item2.component && item2.component.name === 'el-time-picker'"
                                        v-show="handleShow(item2.component.show, index2, scope.row)"
                                        :disabled="handleDisabled(item2.component.disabled, scope.$index, scope.row)"
                                        v-model="scope.row[item2.key]"
                                        v-bind="item2.component"
                                        @change="cellDataChange(scope,item2)"
                                    >
                                    </el-time-picker>
                                    <el-date-picker
                                        v-else-if="item2.component && item2.component.name === 'el-date-picker'"
                                        v-show="handleShow(item2.component.show, index2, scope.row)"
                                        :disabled="handleDisabled(item2.component.disabled, scope.$index, scope.row)"
                                        v-model="scope.row[item2.key]"
                                        v-bind="item2.component"
                                        @change="cellDataChange(scope,item2)"
                                    >
                                    </el-date-picker>
                                    <el-rate
                                        v-else-if="item2.component && item2.component.name === 'el-rate'"
                                        v-show="handleShow(item2.component.show, index2, scope.row)"
                                        :disabled="handleDisabled(item2.component.disabled, scope.$index, scope.row)"
                                        v-model="scope.row[item2.key]"
                                        v-bind="item2.component"
                                        @change="cellDataChange(scope,item2)"
                                    >
                                    </el-rate>
                                    <el-color-picker
                                        v-else-if="item2.component && item2.component.name === 'el-color-picker'"
                                        v-show="handleShow(item2.component.show, index2, scope.row)"
                                        :disabled="handleDisabled(item2.component.disabled, scope.$index, scope.row)"
                                        v-model="scope.row[item2.key]"
                                        v-bind="item2.component"
                                        @change="cellDataChange(scope,item2)"
                                    >
                                    </el-color-picker>
                                    <render-custom-component
                                        v-else-if="item2.component && item2.component.name"
                                        v-show="handleShow(item2.component.show, index2, scope.row)"
                                        :disabled="handleDisabled(item2.component.disabled, scope.$index, scope.row)"
                                        v-model="scope.row[item2.key]"
                                        :component-name="item2.component.name"
                                        :props="item2.component.props ? item2.component.props : null"
                                        :scope="scope"
                                    >
                                    </render-custom-component>
                                    <render-component
                                        v-else-if="item2.component && item2.component.render"
                                        v-show="handleShow(item2.component.show, index2, scope.row)"
                                        :disabled="handleDisabled(item2.component.disabled, scope.$index, scope.row)"
                                        :render-function="item2.component.render"
                                        :scope="scope"
                                    >
                                    </render-component>
                                    <template v-else>{{item2.formatter ? item2.formatter(scope.row, scope.column, _get(scope.row, item2.key), scope.$index) : _get(scope.row, item2.key)}}</template>
                                </template>
                                <template v-if="item2.children">
                                    <template v-for="(item3, index3) in item2.children">
                                        <el-table-column
                                            :key="index3"
                                            :label="handleAttribute(item3.title, '')"
                                            :prop="handleAttribute(item3.key, null)"
                                            v-bind="item3"
                                            v-if="handleShow(item3.show, index3, item3)"
                                        >
                                            <template slot-scope="scope">
                                                <el-input
                                                    v-if="item3.component && item3.component.name === 'el-input'"
                                                    v-show="handleShow(item3.component.show, index3, scope.row)"
                                                    :disabled="handleDisabled(item3.component.disabled, scope.$index, scope.row)"
                                                    v-model="scope.row[item3.key]"
                                                    v-bind="item3.component"
                                                    @change="cellDataChange(scope,item3)"
                                                >
                                                </el-input>
                                                <el-input-number
                                                    v-else-if="item3.component && item3.component.name === 'el-input-number'"
                                                    v-show="handleShow(item3.component.show, index3, scope.row)"
                                                    :disabled="handleDisabled(item3.component.disabled, scope.$index, scope.row)"
                                                    v-model="scope.row[item3.key]"
                                                    v-bind="item3.component"
                                                    @change="cellDataChange(scope,item3)"
                                                >
                                                </el-input-number>
                                                <el-radio-group
                                                    v-else-if="item3.component && item3.component.name === 'el-radio'"
                                                    v-show="handleShow(item3.component.show, index3, scope.row)"
                                                    :disabled="handleDisabled(item3.component.disabled, scope.$index, scope.row)"
                                                    v-model="scope.row[item3.key]"
                                                    v-bind="item3.component"
                                                    @change="cellDataChange(scope,item3)"
                                                >
                                                    <template v-if="item3.component.buttonMode">
                                                        <el-radio-button
                                                            v-for="option in item3.component.options"
                                                            :key="option.value"
                                                            :label="option.value"
                                                        >
                                                            {{option.label}}
                                                        </el-radio-button>
                                                    </template>
                                                    <template v-else>
                                                        <el-radio
                                                            v-for="option in item3.component.options"
                                                            :key="option.value"
                                                            :label="option.value"
                                                        >
                                                            {{option.label}}
                                                        </el-radio>
                                                    </template>
                                                </el-radio-group>
                                                <el-checkbox-group
                                                    v-else-if="item3.component && item3.component.name === 'el-checkbox'"
                                                    v-show="handleShow(item3.component.show, index3, scope.row)"
                                                    :disabled="handleDisabled(item3.component.disabled, scope.$index, scope.row)"
                                                    v-model="scope.row[item3.key]"
                                                    v-bind="item3.component"
                                                    @change="cellDataChange(scope,item3)"
                                                >
                                                    <template v-if="item3.component.buttonMode">
                                                        <el-checkbox-button
                                                            v-for="option in item3.component.options"
                                                            :key="option.value"
                                                            :label="option.value"
                                                        >
                                                            {{option.label}}
                                                        </el-checkbox-button>
                                                    </template>
                                                    <template v-else>
                                                        <el-checkbox
                                                            v-for="option in item3.component.options"
                                                            :key="option.value"
                                                            :label="option.value"
                                                        >
                                                            {{option.label}}
                                                        </el-checkbox>
                                                    </template>
                                                </el-checkbox-group>
                                                <el-select
                                                    v-else-if="item3.component && item3.component.name === 'el-select'"
                                                    v-show="handleShow(item3.component.show, index3, scope.row)"
                                                    :disabled="handleDisabled(item3.component.disabled, scope.$index, scope.row)"
                                                    v-model="scope.row[item3.key]"
                                                    v-bind="item3.component"
                                                    @change="cellDataChange(scope,item3)"
                                                >
                                                    <el-option
                                                        v-for="option in item3.component.options"
                                                        :key="option.value"
                                                        v-bind="option"
                                                    >
                                                    </el-option>
                                                </el-select>
                                                <el-cascader
                                                    v-else-if="item3.component && item3.component.name === 'el-cascader'"
                                                    v-show="handleShow(item3.component.show, index3, scope.row)"
                                                    :disabled="handleDisabled(item3.component.disabled, scope.$index, scope.row)"
                                                    v-model="scope.row[item3.key]"
                                                    v-bind="item3.component"
                                                    @change="cellDataChange(scope,item3)"
                                                >
                                                </el-cascader>
                                                <el-switch
                                                    v-else-if="item3.component && item3.component.name === 'el-switch'"
                                                    v-show="handleShow(item3.component.show, index3, scope.row)"
                                                    :disabled="handleDisabled(item3.component.disabled, scope.$index, scope.row)"
                                                    v-model="scope.row[item3.key]"
                                                    v-bind="item3.component"
                                                    @change="cellDataChange(scope,item3)"
                                                >
                                                </el-switch>
                                                <el-slider
                                                    v-else-if="item3.component && item3.component.name === 'el-slider'"
                                                    v-show="handleShow(item3.component.show, index3, scope.row)"
                                                    :disabled="handleDisabled(item3.component.disabled, scope.$index, scope.row)"
                                                    v-model="scope.row[item3.key]"
                                                    v-bind="item3.component"
                                                    @change="cellDataChange(scope,item3)"
                                                >
                                                </el-slider>
                                                <el-time-select
                                                    v-else-if="item3.component && item3.component.name === 'el-time-select'"
                                                    v-show="handleShow(item3.component.show, index3, scope.row)"
                                                    :disabled="handleDisabled(item3.component.disabled, scope.$index, scope.row)"
                                                    v-model="scope.row[item3.key]"
                                                    v-bind="item3.component"
                                                    @change="cellDataChange(scope,item3)"
                                                >
                                                </el-time-select>
                                                <el-time-picker
                                                    v-else-if="item3.component && item3.component.name === 'el-time-picker'"
                                                    v-show="handleShow(item3.component.show, index3, scope.row)"
                                                    :disabled="handleDisabled(item3.component.disabled, scope.$index, scope.row)"
                                                    v-model="scope.row[item3.key]"
                                                    v-bind="item3.component"
                                                    @change="cellDataChange(scope,item3)"
                                                >
                                                </el-time-picker>
                                                <el-date-picker
                                                    v-else-if="item3.component && item3.component.name === 'el-date-picker'"
                                                    v-show="handleShow(item3.component.show, index3, scope.row)"
                                                    :disabled="handleDisabled(item3.component.disabled, scope.$index, scope.row)"
                                                    v-model="scope.row[item3.key]"
                                                    v-bind="item3.component"
                                                    @change="cellDataChange(scope,item3)"
                                                >
                                                </el-date-picker>
                                                <el-rate
                                                    v-else-if="item3.component && item3.component.name === 'el-rate'"
                                                    v-show="handleShow(item3.component.show, index3, scope.row)"
                                                    :disabled="handleDisabled(item3.component.disabled, scope.$index, scope.row)"
                                                    v-model="scope.row[item3.key]"
                                                    v-bind="item3.component"
                                                    @change="cellDataChange(scope,item3)"
                                                >
                                                </el-rate>
                                                <el-color-picker
                                                    v-else-if="item3.component && item3.component.name === 'el-color-picker'"
                                                    v-show="handleShow(item3.component.show, index3, scope.row)"
                                                    :disabled="handleDisabled(item3.component.disabled, scope.$index, scope.row)"
                                                    v-model="scope.row[item3.key]"
                                                    v-bind="item3.component"
                                                    @change="cellDataChange(scope,item3)"
                                                >
                                                </el-color-picker>
                                                <render-custom-component
                                                    v-else-if="item3.component && item3.component.name"
                                                    v-show="handleShow(item3.component.show, index3, scope.row)"
                                                    :disabled="handleDisabled(item3.component.disabled, scope.$index, scope.row)"
                                                    v-model="scope.row[item3.key]"
                                                    :component-name="item3.component.name"
                                                    :props="item3.component.props ? item3.component.props : null"
                                                    :scope="scope"
                                                >
                                                </render-custom-component>
                                                <render-component
                                                    v-else-if="item3.component && item3.component.render"
                                                    v-show="handleShow(item3.component.show, index3, scope.row)"
                                                    :disabled="handleDisabled(item3.component.disabled, scope.$index, scope.row)"
                                                    :render-function="item3.component.render"
                                                    :scope="scope"
                                                >
                                                </render-component>
                                                <template v-else>{{item3.formatter ? item3.formatter(scope.row, scope.column, _get(scope.row, item3.key), scope.$index) : _get(scope.row, item3.key)}}</template>
                                            </template>
                                            <!-- <tabulation-column v-if="item.children" :columns="item.children"></tabulation-column> -->
                                        </el-table-column>
                                    </template>
                                </template>
                                <!-- <tabulation-column v-if="item.children" :columns="item.children"></tabulation-column> -->
                            </el-table-column>
                        </template>
                    </template>
                    <!-- <tabulation-column v-if="item.children" :columns="item.children"></tabulation-column> -->
                </el-table-column>
            </template>
            <!-- 操作列 -->
            <el-table-column
                v-if="rowHandle"
                :label="handleAttribute(rowHandle.columnHeader, '操作')"
                v-bind="rowHandle"
            >
                <template slot-scope="scope">
                    <template v-for="(item, index) in handleAttribute(rowHandle.custom, [])">
                        <el-button
                            :key="index"
                            v-if="handleShow(item.show, scope.$index, scope.row) && handleAttribute(item.name,'') === 'el-button' "
                            :disabled="handleDisabled(item.disabled, scope.$index, scope.row)"
                            v-bind="item"
                            @click="$emit(item.emit, {index: scope.$index, row: scope.row,item})"
                        >
                            <template>
                                {{ item.formatter ? item.formatter(scope.row, scope.column, item.text, scope.$index) : item.text }}
                            </template>
                        </el-button>
                        <el-switch
                            :key="index"
                            v-if="handleShow(item.show, scope.$index, scope.row) && handleAttribute(item.name,'') === 'el-switch' "
                            :disabled="handleDisabled(item.disabled, scope.$index, scope.row)"
                            v-model="item.key"
                            v-bind="item"
                            @change="$emit(item.emit, {index: scope.$index, row: scope.row,item})"
                        >
                            <template>
                                {{ item.formatter ? item.formatter(scope.row, scope.column, item.text, scope.$index) : item.text }}
                            </template>
                        </el-switch>
                        <render-custom-component
                            :key="index"
                            v-else-if="item.component && item.component.name"
                            v-model="scope.row[item.key]"
                            :component-name="item.component.name"
                            :props="item.component.props ? item.component.props : null"
                            :scope="scope"
                        >
                        </render-custom-component>
                        <render-component
                            :key="index"
                            v-else-if="item.component && item.component.render"
                            :render-function="item.component.render"
                            :scope="scope"
                        >
                        </render-component>
                    </template>
                </template>
            </el-table-column>

            <!-- 滚动加载加载更多 -->
            <template #append>
                <slot name="append">
                    <div
                        class="tabulation-more"
                        :class="loadMoreOptions && handleAttribute(loadMoreOptions.loadClass,'')"
                        ref="tabulationMore"
                        v-if="isEmpty(loadMoreOptions)"
                    >
                        <p
                            class="tabulation-more-load"
                            v-if="handleAttribute(loadMoreOptions.loadShow,false)"
                        >
                            <i
                                :class="[handleAttribute(loadMoreOptions.loadShowIcon,'el-icon-loading'),'tabulation-more-load-icon']"
                                v-if="handleAttribute(loadMoreOptions.loadShowIcon,'el-icon-loading') && isEleIcon(loadMoreOptions.loadShowIcon)"
                            ></i>
                            <img
                                v-else
                                :src="loadMoreOptions.loadShowIcon"
                                class="tabulation-more-load-img"
                            >
                            {{ handleAttribute(loadMoreOptions.loadShowText,'正在加载中')}}
                        </p>

                        <p
                            class="tabulation-no-more"
                            v-if="handleAttribute(loadMoreOptions.loadNoMoreText,'')"
                        >
                            {{handleAttribute(loadMoreOptions.loadNoMoreText,'')}}
                        </p>
                    </div>
                </slot>
            </template>
        </el-table>
        <!-- 分页 -->
        <div
            class="tabulation-pagination"
            v-if="pagination && !!crudTableDataLength"
        >
            <el-pagination
                v-if="handleShow(pagination.show)"
                :layout="handleAttribute(pagination.layout,'total, sizes, prev, pager, next, jumper')"
                :background="handleAttribute(pagination.background,true)"
                v-bind="pagination"
                @size-change="handlePaginationSizeChange"
                @current-change="handlePaginationCurrentChange"
                @prev-click="handlePaginationPrevClick"
                @next-click="handlePaginationNextClick"
            >
                <slot name="pageSlot"></slot>
            </el-pagination>
        </div>
    </div>
</template>
<script>
/* 所需要用到的组件，来源element-ui@2+ */
const ElTable = () => import("element-ui/lib/table");
const ElTableColumn = () => import("element-ui/lib/table-column");
const ElButton = () => import("element-ui/lib/button");
const ElInput = () => import("element-ui/lib/input");
const ElInputNumber = () => import("element-ui/lib/input-number");
const ElRadio = () => import("element-ui/lib/radio");
const ElRadioButton = () => import("element-ui/lib/radio-button");
const ElRadioGroup = () => import("element-ui/lib/radio-group");
const ElCheckbox = () => import("element-ui/lib/checkbox");
const ElCheckboxGroup = () => import("element-ui/lib/checkbox-group");
const ElOption = () => import("element-ui/lib/option");
const ElSelect = () => import("element-ui/lib/select");
const ElCascader = () => import("element-ui/lib/cascader");
const ElSwitch = () => import("element-ui/lib/switch");
const ElSlider = () => import("element-ui/lib/slider");
const ElTimeSelect = () => import("element-ui/lib/time-select");
const ElTimePicker = () => import("element-ui/lib/time-picker");
const ElDateSelect = () => import("element-ui/lib/date-picker");
const ElRate = () => import("element-ui/lib/rate");
const ElColorPicker = () => import("element-ui/lib/color-picker");
const ELTooltip = () => import("element-ui/lib/tooltip");

import ElLoading from "element-ui/lib/loading";

import Vue from "vue";
Vue.use(ElLoading.directive);

/* 渲染自定义的组件及渲染外部传入的render函数 */
const renderComponent = () => import("./components/renderComponent.vue");
const renderCustomComponent = () =>
    import("./components/renderCustomComponent.vue");
const LoadingTips = () => import("../LoadingTips");

/* 表格需要的方法 */
import Base from "./mixin/base";
import Data from "./mixin/data";
import Utils from "./mixin/utils";
import HandleRow from "./mixin/handleRow";
import selectionIndex from "./mixin/handleSelect";
import Pagination from "./mixin/pagination";
import Scroll from "./mixin/scroll";

export default {
    name: "Tabulation",
    mixins: [Base, Data, Utils, HandleRow, selectionIndex, Pagination, Scroll],
    components: {
        ElTable,
        ElTableColumn,
        ElInput,
        ElButton,
        ElInputNumber,
        ElRadio,
        ElRadioButton,
        ElRadioGroup,
        ElCheckbox,
        ElCheckboxGroup,
        ElOption,
        ElSelect,
        ElCascader,
        ElSwitch,
        ElSlider,
        ElTimeSelect,
        ElTimePicker,
        ElDateSelect,
        ElRate,
        ElColorPicker,
        renderComponent,
        renderCustomComponent,
        LoadingTips,
        ELTooltip,
    },
};
</script>
<style lang="less">
@import url("./Tabulation.less");
</style>