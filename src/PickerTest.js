import Vue from "vue"
import Picker from "./Picker.vue"
const App = new Vue({    
    template:require("./PickerTest.html"),
    data(){
        return {
            list:[
                {
                    value:"1",
                    label:"1",
                },
                {
                    value:"2",
                    label:"2",
                },
                {
                    value:"3",
                    label:"3",
                }
            ],
            value:"2"
        }
    },
    components:{
        picker:Picker
    },
    methods:{
        updateValue(a){
            console.log("updateValue",a)
        }
    }
})
App.$mount("#app")
window.app = App
