import Dep from "./Dep.js";
export default class Watcher {
    constructor(target, prop, cb, options) {
        this.target = target;
        this.prop = prop;
        this.cb = cb;
        this.op = options
        if (!this.op || !this.op.computed)
            this.value = this.target[this.prop] // 不是计算属性的时候，才需要value
        this.invoke()

    }
    update() {
        if (this.op && this.op.computed) {

            this.target[this.prop] = this.cb() // 计算属性直接更新
        }
        else {
            const newVal = this.target[this.prop] // 获取新值
            this.cb(newVal, this.value)
            this.value = newVal //  然后让旧值更新
        }
    }

    invoke() {
        Dep.target = this;
        let temp = ''

        if (this.op && this.op.computed) {
            const res = this.cb()
            temp = res
        } else {
            this.target[this.prop]
        }
        Dep.target = null

        if (this.op && this.op.computed) { // 如果是计算属性就在他依赖收集后赋值一下,不能在上面直接赋值，因为 this.target[this.prop]  这个会被依赖收集
            this.target[this.prop] = temp
        }
    }
}
