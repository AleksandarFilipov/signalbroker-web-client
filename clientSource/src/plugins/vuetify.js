import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
Vue.use(Vuetify, {
    theme: {
        primary: '#5581c5',
        secondary: '#a19675',
        accent: '#f9ead1',
        error: '#f44336',
        warning: '#ff5722',
        info: '#2196f3',
        success: '#4caf50',
    },
    iconfont: 'md',
})
