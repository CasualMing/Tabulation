import { isEmpty } from '../utils/lib';

export default {
    methods: {

        /**
         * @description 控制是否展示
         */
        handleShow(show = true, ...args) {
            if (typeof show === 'boolean') {
                return show
            } else if (typeof show === 'function') {
                return show(...args)
            }
            return Boolean(show)
        },
        /**
         * @description 控制是否disabled
         */
        handleDisabled(disabled = false, ...args) {
            if (typeof disabled === 'boolean') {
                return disabled
            } else if (typeof disabled === 'function') {
                return disabled(...args)
            }
            return Boolean(disabled)
        },

        /**
         * @description 组件属性默认值
         */
        handleAttribute(attribute, defaultValue) {
            if (attribute === false || attribute === 0 || attribute === '') {
                return attribute
            }
            return attribute || defaultValue
        },

        /**
         * @description 用于判断是否是空数组或者空对象
         */
        isEmpty,


        /**
         * @description 是否是element的内置icon
         */
        isEleIcon(str) {
            if (!str) return true;
            typeof str == 'string' ? str.includes("el-icon-") : false
        },
    }
}