import queue from "./queue.js"
export default class Dep { // 观察者模式

    constructor() {
        this.subs = []

    }
    depend() {

        if (Dep.target && !this.subs.includes(Dep.target)) {
            this.subs.push(Dep.target)
        }
    }
    notify() {
        queue.collect(this.subs)
    }
}

