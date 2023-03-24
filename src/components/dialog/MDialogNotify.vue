<template>
  <div class="dialog">
    <div class="dialog-content">
      <!-- body của dialog  -->
      <div class="dialog-body">
        <!-- icon của dialog  -->
        <div class="dialog-body__icon"></div>
        <!-- nội dung thông báo của dialog  -->
        <div class="dialog-body__text">{{ content }}</div>
      </div>
      <!-- footer của dialog  -->
      <div class="dialog-footer">
        <!-- nút đóng của dialog  -->
        <button @click="this.$emit('onClose')" class="btn-dialog btn--default">
          Đóng
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MDialogNotify",
  props: ["content"],
  components: {},
};
</script>

<style scoped>
@import url(./dialog.css);
</style>
