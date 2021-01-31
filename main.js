const div = dom.create('<div>newDiv</div>')
console.log(div);

dom.after(test, div);

const div3 = dom.create('<div id = "parent">236</div>')
dom.wrap(test, div3)


let nodes = dom.empty(window.empty);
console.log(nodes);

dom.attr(test, 'title', 'hi')
let title = dom.attr(test, 'title');
console.log(`title: ${title}`);

dom.text(test, "内容")

dom.style(test, { border: '1px solid red', color: 'red' });

dom.class.add(test, 'myclass');
dom.class.remove(test, 'myclass');

dom.on(test, 'click', () => {
    console.log('点击');
})

let testDiv = dom.find('#test')[0]
console.log(testDiv);
const test2 = dom.find('#test2')[0]
console.log(dom.find('.red', test2)[0]);

let s2 = dom.find('#s2')[0]
console.log(s2);
dom.each(dom.children(s2), (n) => dom.style(n, 'color', 'red'))