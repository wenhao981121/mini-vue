export default {
    _buffer: [],
    _pending: false,
    _nextTickCbs: [],
    collect(data) {
        if (Array.isArray(data)) {
            this._buffer = this._buffer.concat(data)
        } else {
            this._buffer.push(data)
        }
        if (!this._pending) {
            this._pending = true
            Promise.resolve().then(() => {
                this.release()
                this._pending = false
            })
        }

    },
    release() {
        this._buffer = [...new Set(this._buffer)]
        console.log(this._buffer);

        while (this._buffer.length > 0) {

            this._buffer.shift().update()
        }

        while (this._nextTickCbs.length > 0) {
            this._nextTickCbs.shift()()
        }
    },
    nextTick(cb) {
        this._nextTickCbs.push(cb)
    }
}