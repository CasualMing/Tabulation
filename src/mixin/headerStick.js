/*
 * @Author: CasualMing
 * @Date: 2022-01-13 10:50:21
 * @LastEditTime: 2022-02-11 09:10:39
 * @Description: 由于element-ui 的table 限制，所以只能动态设置表头的行内样式
 * @FilePath: \tabulation\src\mixin\headerStick.js
 */
import { getScrollTop, getElementTop, getScroller } from "../utils/dom/scroll";
import { on, off } from "../utils/dom/event";
import { getClass } from "../utils/lib";
export default {
    data() {
        return {
            fixed: false,
            width: 0,
            height: 0,
        }
    },
    mounted() {
        if (this.headerIsSticky) {
            const scrollContainer = getScroller(this.$el);
            if (scrollContainer) {
                on(scrollContainer, "scroll", this.onScroll);
                on(window, "resize", this.handleScroll);
            }

            this.handleScroll();
            // 添加dom变化监听
            this.handleMutationObserver();
        }
    },
    activated() {
        if (this.headerIsSticky) {
            const scrollContainer = getScroller(this.$el);
            if (scrollContainer) {
                on(scrollContainer, "scroll", this.onScroll);
                on(window, "resize", this.handleScroll);
            }
            this.handleScroll();

            // 添加dom变化监听
            this.handleMutationObserver();
        }
    },
    methods: {
        headerRowClassName() {
            const { isEmpty, headerIsSticky, options, fixed } = this;
            return isEmpty(options) ? fixed && headerIsSticky ? 'tabeleHeaderStick' : '' : ''
        },
        headerRowStyle() {
            return this.style;
        },
        headerCellStyle({ row, column, rowIndex, columnIndex }) {
            return {
                width: column.realWidth + 'px'
            }
        },
        onScroll() {
            const HEADER_CLASS_NAME = 'el-table__header-wrapper';
            const elHeader = document.getElementsByClassName(HEADER_CLASS_NAME)[0];
            if (elHeader) {
                const El = elHeader.children[0];
                const scrollContainer = getScroller(this.$el);
                if (!El) return false;
                this.width = El.offsetWidth;
                this.height = El.offsetHeight;

                const offsetTop = +this.offsetTop || 0;
                const offsetBottom = +this.offsetBottom || 0;
                const scrollTop = getScrollTop(scrollContainer) - this.height - 32;
                const topToPageTop = getElementTop(El);
                const bottomToPageBottom = El.getBoundingClientRect().bottom;

                if (scrollTop + offsetTop > topToPageTop) {
                    this.fixed = true;
                } else if (
                    offsetBottom >= 0 &&
                    bottomToPageBottom > window.innerHeight
                ) {
                    this.fixed = true;
                } else {
                    this.fixed = false;
                }

                this.$emit("header-sticky", {
                    scrollTop,
                    isFixed: this.fixed,
                });
            }
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

                this.bodyMO.observe(this.$el, option);
            }
        },
    },
    beforeDestroy() {
        if (this.headerIsSticky) {
            off(window, "scroll", this.onScroll);
            off(window, "resize", this.handleScroll);
            if (MutationObserver) {
                // 停止观察
                this.bodyMO.disconnect();
            }
        }
    },
    beforeDestroy() {
        if (this.headerIsSticky) {
            off(window, "scroll", this.onScroll);
            off(window, "resize", this.handleScroll);

            if (MutationObserver) {
                // 停止观察
                this.bodyMO.disconnect();
            }
        }
    },
    computed: {
        style() {
            const { headerStickyOptions } = this;
            if (!this.fixed) {
                return;
            }

            const style = {
                width: this.fixed ? `${this.width}px` : null,
                height: this.fixed ? `${this.height}px` : null,
                zIndex: 9999
            };

            if (headerStickyOptions.zIndex || headerStickyOptions.zIndex === 0) {
                style.zIndex = headerStickyOptions.zIndex;
            }

            if (headerStickyOptions.offsetTop >= 0 && this.fixed) {
                style.top = `${headerStickyOptions.offsetTop}px`;
            } else {
                style.top = 0;
            }

            if (headerStickyOptions.offsetBottom >= 0 && this.fixed) {
                style.top = null;
                style.bottom = `${headerStickyOptions.offsetBottom}px`;
            } else {
                style.bottom = null;
            }

            return style;
        },

        /**
         * 判断表头是否需要进行吸顶处理
         * @date 2022-01-14
         * @returns {Boolean}
         */
        headerIsSticky() {
            const { options } = this;
            return this.judgeSticky(options, 'headerSticky');
        },

        /**
         * 表头吸顶处理配置，不传则用默认配置
         * @date 2022-01-14
         * @returns {any}
         */
        headerStickyOptions() {
            const { options, isEmpty, handleAttribute } = this;
            const defalutConfig = {
                offsetTop: 0
            };
            return isEmpty(options) ?
                getClass(options.headerSticky) === 'Object' ?
                handleAttribute(options.headerSticky) :
                defalutConfig :
                defalutConfig
        }
    },
}