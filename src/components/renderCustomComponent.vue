<!--
 * @Author: CasualMing
 * @Date: 2021-11-24 14:23:10
 * @LastEditTime: 2022-02-11 09:06:15
 * @Description: 用于渲染自定义组件
 * @FilePath: \tabulation\src\components\renderCustomComponent.vue
-->
<script>
export default {
    name: "render-custom-component",
    props: {
        /**
         * @description v-model双向绑定的值
         */
        value: {
            required: true,
        },
        /**
         * @description 传入的组件名
         */
        componentName: {
            required: true,
        },
        /**
         * @description 传入的自定义参数
         */
        props: {
            default: null,
        },
        /**
         * @description 传入的行数据
         */
        scope: {
            default: null,
        },
    },
    render(h) {
        let self = this;
        return h(self.componentName, {
            props: {
                value: self.value,
                scope: self.scope,
                ...self.props,
            },
            on: {
                input: function (event) {
                    self.$emit("input", event);
                },
            },
        });
    },
};
</script>
