import Watcher from "./Watcher.js"
import observe from "./observe.js"
import queue from "./queue.js"
export default class MVVM {
    constructor({ el, data, mounted, methods, watch, computed }) {
        this.el = document.querySelector(el)
        this._data = data
        this.methods = methods
        this._watch = watch
        this._computed = computed
        this.$initData(this._data)
        this.$compile(this.el)
        this.$handleWatch()
        this.$handleComputed()

        this.__proto__.__proto__ = this._data

        Object.assign(this, this.methods)
        mounted && mounted.call(this)
    }
    $initData(data) {
        observe(data) // 数据劫持
    }
    $compile(el) { // 模板编译
        if (el) {
            if (el.tagName == 'DATA') {
                new Watcher(this._data, el.textContent.trim(), (newVal, oldVal) => {
                    el.textContent = newVal
                }).update()
                return
            }
            const attrs = el.getAttributeNames && el.getAttributeNames()

            if (attrs && attrs.includes(':value')) {
                new Watcher(this._data, el.getAttribute(':value'), (newVal, oldVal) => { // 在数据劫持的基础上，加入回调

                    el.value = newVal
                }).update()

            }
            if (attrs && attrs.includes('@input')) {
                console.log(el);

                const prop = el.getAttribute('@input')

                el.addEventListener('input', this.methods[prop].bind(this))
            }
            if (el.nodeType === 1 && el.tagName !== 'DATA') {

                el.childNodes.forEach(element => {
                    this.$compile(element)
                });
            }
        }

    }
    $handleWatch() {
        if (this._watch)
            Object.keys(this._watch).forEach(n => {
                new Watcher(this._data, n, this._watch[n].bind(this._data))
            })
    }
    $handleComputed() {
        if (this._computed)
            Object.keys(this._computed).forEach(n => {
                new Watcher(this._data, n, this._computed[n].bind(this._data), {
                    computed: true
                })
            })
    }
    $nextTick(cb) {
        queue.nextTick(cb.bind(this))
    }
}