<!--
 * @Author: 程明锐
 * @Date: 2022-01-10 10:01:41
 * @LastEditTime: 2022-02-11 08:47:28
 * @Description: 吸顶表头
-->
<template>
    <div class="stick-affix">
        <div :style="style">
            <div
                :class="['stick-affix-box', fixed ? `stick-affix-fixed` : null]"
                :style="style"
            >
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
import Utils from "../Utils/mixins";
import { getScrollTop, getElementTop, getScroller } from "../Utils/dom/scroll";
import { on, off } from "../Utils/dom/event";
export default {
    name: "StickAffix",
    mixins: [Utils],
    props: {
        zIndex: [Number, String],
        offsetTop: [Number, String],
        offsetBottom: [Number, String],
    },
    data() {
        return {
            fixed: false,
            height: 0,
        };
    },

    computed: {
        style() {
            if (!this.fixed) {
                return;
            }

            const style = {
                width: this.fixed ? `${this.width}px` : null,
                height: this.fixed ? `${this.height}px` : null,
                zIndex: 9999
            };

            if (this.zIndex || this.zIndex === 0) {
                style.zIndex = this.zIndex;
            }

            if (this.offsetTop >= 0 && this.fixed) {
                style.top = `${this.offsetTop}px`;
            } else {
                style.top = 0;
            }

            if (this.offsetBottom >= 0 && this.fixed) {
                style.top = null;
                style.bottom = `${this.offsetBottom}px`;
            } else {
                style.bottom = null;
            }

            return style;
        },
    },

    mounted() {
        const scrollContainer = getScroller(this.$el);
        if (scrollContainer) {
            on(scrollContainer, "scroll", this.onScroll);
        }
        on(window, "resize", this.handleScroll);

        this.handleScroll();
        // 添加dom变化监听
        this.handleMutationObserver();
    },
    activated() {
        const scrollContainer = getScroller(this.$el);
        if (scrollContainer) {
            on(scrollContainer, "scroll", this.onScroll);
        }
        on(window, "resize", this.handleScroll);
        this.handleScroll();

        // 添加dom变化监听
        this.handleMutationObserver();
    },

    deactivated() {
        const scrollContainer = getScroller(this.$el);
        if (scrollContainer) {
            off(scrollContainer, "scroll", this.onScroll);
        }
        off(window, "resize", this.handleScroll);

        if (MutationObserver) {
            // 停止观察
            this.bodyMO.disconnect();
        }
    },

    beforeDestroy() {
        const scrollContainer = getScroller(this.$el);
        if (scrollContainer) {
            off(scrollContainer, "scroll", this.onScroll);
        }
        off(window, "resize", this.handleScroll);

        if (MutationObserver) {
            // 停止观察
            this.bodyMO.disconnect();
        }
    },

    methods: {
        onScroll() {
            this.width = this.$el.offsetWidth;
            this.height = this.$el.offsetHeight;

            const offsetTop = +this.offsetTop || 0;
            const scrollTop = getScrollTop(window);
            const topToPageTop = getElementTop(this.$el);
            const bottomToPageBottom = this.$el.getBoundingClientRect().bottom;

            const emitScrollEvent = () => {
                this.$emit("scroll", {
                    scrollTop,
                    isFixed: this.fixed,
                });
            };
            if (scrollTop + offsetTop > topToPageTop) {
                this.fixed = true;
            } else if (
                this.offsetBottom >= 0 &&
                bottomToPageBottom > window.innerHeight
            ) {
                this.fixed = true;
            } else {
                this.fixed = false;
            }

            emitScrollEvent();
        },

        handleScroll() {
            this.fixed = false;

            this.$nextTick(() => {
                this.onScroll();
            });
        },

        handleMutationObserver() {
            if (MutationObserver) {
                // 添加观察器
                this.bodyMO = new MutationObserver((mutationList) => {
                    for (let mutation of mutationList) {
                        if (mutation.type === "childList") {
                            this.handleScroll();
                        }
                    }
                });
                const option = {
                    childList: true,
                    attributes: true,
                    subtree: true,
                    attributefilter: ["style"],
                };

                this.bodyMO.observe(document.body, option);
            }
        },
    },
};
</script>
<style lang="less" src='./index.less'></style>