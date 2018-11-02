<template>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
</template>
<script>
import { gebHandler } from "vue-geb"

  export default {
    data () {
      return {
        mode: '',
        timeout: 5000,
          snackbar: false,
      text: "",
      color: null
      }
    },
    created(){
    this.sub = this.$geb.getBus().subscribe(message => {
                if (message.type == "alert") {
         this.color =  message.data.color
        this.text = message.data.text
        this.snackbar = true
       
      }
    })
    // var message = {
    //     color: "red",
    //     text: "asdf",
    //     snackbar: true
    // }
    //  gebHandler.emit({

    //     data: message,
    //     type: "alert"
    //   })
}
  }
</script>