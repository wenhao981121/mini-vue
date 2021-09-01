import MVVM from './MVVM.js'

new MVVM({
    el: '#app',
    data: {
        name: 1,
        age: 0
    },
    mounted() {
        this.count()
    },
    methods: {
        count() {
            setInterval(() => {
                this.age++
            }, 1000);
        },
        ageInput(e) {
            this.age = e.target.value
        }
    }

})