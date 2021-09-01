import Dep from "./Dep.js";

function defReactive(obj, key, val) {
    const dep = new Dep()
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            dep.depend();
            return val
        },
        set: function (newVal) {

            if (val != newVal) {
                val = newVal
                dep.notify()
            }
        }
    })
}

export default function observe(ob) {
    // 只是浅层的监听，实际会递归整个对象
    Object.keys(ob).forEach(n => {
        defReactive(ob, n, ob[n])
    })
}

