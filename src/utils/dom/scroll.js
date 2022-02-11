// 获取最近的滚动容器
const overflowScrollReg = /scroll|auto/i;
export function getScroller(el, root = window) {
	let node = el;

	while (
		node &&
		node.tagName !== "HTML" &&
		node.nodeType === 1 &&
		node !== root
	) {
		const { overflowY } = window.getComputedStyle(node);

		if (overflowScrollReg.test(overflowY)) {
			if (node.tagName !== "BODY") {
				return node;
			}

			const { overflowY: htmlOverflowY } = window.getComputedStyle(
				node.parentNode
			);

			if (overflowScrollReg.test(htmlOverflowY)) {
				return node;
			}
		}
		node = node.parentNode;
	}

	return root;
}

// 获取元素在当前容器中滚动距离
export function getScrollTop(element) {
	return "scrollTop" in element ? element.scrollTop : element.pageYOffset;
}

export function getRootScrollTop() {
	return (
		window.pageYOffset ||
		document.documentElement.scrollTop ||
		document.body.scrollTop ||
		0
	);
}

export function getElementTop(element) {
	return (
		(element === window ? 0 : element.getBoundingClientRect().top) +
		getRootScrollTop()
	);
}
