<template>
  <div  class="dialog">
    <div class="dialog-content">
      <!-- body của dialog  -->
      <div  class="dialog-body">
        <!-- icon của dialog  -->
        <div class="dialog-body__icon"></div>
        <!-- nội dung thông báo của dialog  -->
        <div class="dialog-body__text" v-html="content"></div>
      </div>
      <!-- footer của dialog  -->
      <div class="dialog-footer">
        <!-- nút đóng của dialog  -->
        <MButton ref="mButton"
        @btnAddOnClickBtn = "addOnClickBtn"
        class="btn-dialog btn--default"
        :label="btnLabel"></MButton>
        <!-- <button ref="mButton" @click="this.$emit('onClose')" class="btn-dialog btn--default">
          Đóng
        </button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MDialogNotify",
  props: {
    content: {
      type: String,
      default: ""
    },
    link: {
      type: String,
      default: ""
    },
    tooltip: {
      type: String,
      default: ""
    },
    btnLabel: {
      type: String,
      default: ""
    }
  },
  components: {},
  mounted() {
    this.setFocus();
  },
  created() {
    this.setFocus();
  },
  methods: {
    /**
    * Hàm set focus vào button đóng
    * @author LTVIET (05/03/2023)
    */
    setFocus() {
      this.$nextTick(function() {
          this.$refs["mButton"].setFocus();
      })
    }, 
    addOnClickBtn(){
      
      this.$emit('onClose');
    }
  },
};
</script>

<style scoped>
@import url(./dialog.css);
</style>
