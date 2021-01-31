window.dom = {
    //增
    create(string) {
        //template为万能的 一个不显示在页面的
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },
    /* 插入节点(哥哥节点，弟弟节点)
     * param ：node 需要在那个节点插入
     * param ： node2 需要插入的节点
     * */
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling);
    },
    before(node, node2) {
        node.parentNode.insertBefore(node2, node);
    },
    /* 插入节点（子节点）
     * param ：parent 父节点
     * param ： child 子节点
     * */
    append(parent, child) {
        parent.appendChild(child);
    },
    /* 插入节点（父节点）
     * param ：node 需要成为parent的子节点
     * param ：parent 需要成为node的父节点
     * */
    wrap(node, parent) {
        dom.before(node, parent);
        dom.append(parent, node);
    },
    //删
    remove(node) {
        node.parentNode.removeChild(node);
        return node;
    },
    empty(node) {
        //这里表示定义一个节点数组 数组格式为 int const a[5]={1, 2, 3, 4, 5};
        const { childNodes } = node;
        const array = [];
        let x = node.firstChild;
        while (x) {
            array.push(dom.remove(node.firstChild));
            x = node.firstChild;
        }
        return array
    },
    //改
    attr(node, name, value) {
        if (arguments.length === 3) {
            node.setAttribute(name, value);
        } else if (arguments.length === 2) {
            return node.getAttribute(name);
        }
    },
    text(node, string) {
        if (arguments === 2) {
            if ('innerText' in node) {
                node.innerText = string;
            } else {
                node.textnode = string;
            }
        } else if (arguments === 1) {
            if ('innerText' in node) {
                return node.innerText = string;
            } else {
                return node.textnode = string;
            }
        }

    },
    html(node, string) {
        if (arguments === 2) {
            node.innerHTML = string;
        } else if (arguments === 1) {
            return node.innerHTML = string;
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {
            // dom.style(div, 'color', 'red')
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                // dom.style(div, 'color')
                return node.style[name]
            } else if (name instanceof Object) {
                // dom.style(div, {color: 'red'})
                const object = name
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }
        }
    },
    class: {
        add(node, className) {
            node.classList.add(className);
        },
        remove(node, className) {
            node.classList.remove(className);
        },
        contains(node, className) {
            return node.classList.contains(className);
        }
    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn);
    },
    off(node, eventName, fn) {
        node.reomveEventListener(eventName, fn);
    },
    //查
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector);
    },
    parent(node) {
        return node.parentNode;
    },
    children(node) {
        return node.children; //获取子元素集合
    },
    //后驱兄弟姐妹
    sibling(node) {
        //children是伪数组 要转化
        return Array.from(node.parentNode.children).filter(n => n !== node);
    },
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) { //3是文本 1是节点
            x = x.nextSibling
        }
        return x
    },
    //遍历
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }
};