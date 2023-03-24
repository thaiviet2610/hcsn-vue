<template>
  <div class="table">
    <table class="content__table">
      <!-- phần title của table  -->
      <thead>
        <tr>
          <th class="column1 text-align-center">
            <input
              ref="mCheckboxAll"
              type="checkbox"
              class="checkbox"
              :checked="checkboxAll"
              @keydown="addOnEventKeyDown($event, 0)"
              @click="addOnClick"
              @change="markCheckboxAll"
            />
          </th>
          <th class="column2 text-align-center">STT</th>
          <th class="column3 text-align-left">Mã tài sản</th>
          <th class="column4 text-align-left">Tên tài sản</th>
          <th class="column5 text-align-left">Loại tài sản</th>
          <th class="column6 text-align-left">Bộ phận sử dụng</th>
          <th class="column7 text-align-right">Số lượng</th>
          <th class="column8 text-align-right">Nguyên giá</th>
          <th
            class="column9 text-align-right"
            :data_tooltip_bottom="toolTipDepreciation"
          >
            HM/KH lũy kế
          </th>
          <th class="column10 text-align-right">Giá trị còn lại</th>
          <th class="column11 text-align-center">Chức năng</th>
        </tr>
      </thead>
      <!-- phần body của table  -->
      <tbody>
        <tr
          @dblclick="btnAddOnDblClickRowTable(item)"
          @click="btnAddOnClickRowTable(index + 1)"
          v-for="(item, index) in this.assets"
          :key="index"
          :class="{
            row__selected: checkbox[index + 1] || isSelectedRow[index + 1],
          }"
        >
          <td class="column1 text-align-center">
            <input
              :ref="`mCheckbox${index + 1}`"
              :checked="checkbox[index + 1]"
              @change="markCheckbox(index + 1)"
              @keydown="addOnEventKeyDown($event, index + 1)"
              type="checkbox"
              class="checkbox"
            />
          </td>
          <td class="column2 text-align-center" type="stt">
            {{ (pageNumber - 1) * pageSize + index + 1 }}
          </td>
          <td class="column3 text-align-left">{{ item.fixed_asset_code }}</td>
          <td class="column4 text-align-left">{{ item.fixed_asset_name }}</td>
          <td class="column5 text-align-left">
            {{ item.fixed_asset_category_name }}
          </td>
          <td class="column6 text-align-left">{{ item.department_name }}</td>
          <td class="column7 text-align-right">
            {{ formatValue(item.quantity, "money") }}
          </td>
          <td class="column8 text-align-right">
            {{ formatValue(item.cost, "money") }}
          </td>
          <td class="column9 text-align-right">
            {{ formatValue(getDepreciationValue(item), "money") }}
          </td>
          <td class="column10 text-align-right">
            {{ formatValue(getResidualCost(item), "money") }}
          </td>
          <td class="column11 text-align-center">
            <div class="function" :style="styleFunction(index + 1)">
              <!-- chức năng sửa tài sản trong table  -->
              <MButtonIcon
                class="function__edit"
                data_tooltip_bottom="Sửa"
                @addOnClickBtnIcon="
                  handleEventClickFunction(titleEditAssetForm, item, index + 1)
                "
              >
              </MButtonIcon>
              <!-- chức năng nhân bản tài sản trong table  -->
              <MButtonIcon
                class="function__clone"
                data_tooltip_bottom="Nhân bản"
                @addOnClickBtnIcon="
                  handleEventClickFunction(titleCloneAssetForm, item, index + 1)
                "
              >
              </MButtonIcon>
            </div>
          </td>
        </tr>
      </tbody>
    <!-- phần footer của table  -->
    </table>
    <table class="footer__table">
      <tfoot>
        <tr>
          <th class="footer__left">
            <div class="content-footer__left">
              <div class="content-footer__item1">
                <div class="content-footer__item1--text">
                  Tổng số:
                  <span style="font-family: Roboto-Bold">
                    {{ totalRecord }}</span
                  >
                  bản ghi
                </div>
              </div>
              <div class="dropdown_table">
                <MDropdown v-model="pageSize" :data="dataPageSize"> </MDropdown>
              </div>
              <div class="content-footer__item3">
                <MButtonIcon
                  @addOnClickBtnIcon="addOnDecreaseNumberPage"
                  class="content-footer__item3--icon1"
                  classIcon="item3__icon1--image"
                >
                </MButtonIcon>
                <div v-if="totalPage <= 5" class="content-footer__item3--icon2">
                  <div
                    v-for="(item, index) in totalPage"
                    :key="index"
                    class="page__index"
                    @click="addOnClickPageNumber(item)"
                    :class="{ 'page--selected': item == pageNumber }"
                  >
                    <div class="text">{{ item }}</div>
                  </div>
                </div>
                <div v-if="totalPage > 5" class="content-footer__item3--icon2">
                  <div
                    :class="{ 'page--selected': pageNumber == 1 }"
                    class="page__index"
                    @click="addOnClickPageNumber(1)"
                  >
                    <div class="text">1</div>
                  </div>
                  <div
                    v-if="pageNumber == 1 || pageNumber == 2 || pageNumber == 3"
                    :class="{ 'page--selected': pageNumber == 2 }"
                    @click="addOnClickPageNumber(2)"
                    class="page__index"
                  >
                    <div class="text">2</div>
                  </div>
                  <div
                    v-if="pageNumber == 1 || pageNumber == 2 || pageNumber == 3"
                    :class="{ 'page--selected': pageNumber == 3 }"
                    @click="addOnClickPageNumber(3)"
                    class="page__index"
                  >
                    <div class="text">3</div>
                  </div>
                  <div v-if="pageNumber > 3" class="item3__icon2--icon">
                    <div class="icon__ellipsis"></div>
                  </div>
                  <div
                    v-if="pageNumber > 3 && pageNumber < totalPage - 2"
                    :class="{
                      'page--selected':
                        pageNumber > 3 && pageNumber < totalPage - 2,
                    }"
                    @click="addOnClickPageNumber(pageNumber)"
                    class="page__index"
                  >
                    <div class="text">{{ pageNumber }}</div>
                  </div>
                  <div
                    v-if="pageNumber < totalPage - 2"
                    class="item3__icon2--icon"
                  >
                    <div class="icon__ellipsis"></div>
                  </div>
                  <div
                    v-if="
                      pageNumber == totalPage ||
                      pageNumber == totalPage - 1 ||
                      pageNumber == totalPage - 2
                    "
                    :class="{ 'page--selected': pageNumber == totalPage - 2 }"
                    @click="addOnClickPageNumber(totalPage - 2)"
                    class="page__index"
                  >
                    <div class="text">{{ totalPage - 2 }}</div>
                  </div>
                  <div
                    v-if="
                      pageNumber == totalPage ||
                      pageNumber == totalPage - 1 ||
                      pageNumber == totalPage - 2
                    "
                    :class="{ 'page--selected': pageNumber == totalPage - 1 }"
                    @click="addOnClickPageNumber(totalPage - 1)"
                    class="page__index"
                  >
                    <div class="text">{{ totalPage - 1 }}</div>
                  </div>
                  <div
                    :class="{ 'page--selected': pageNumber == totalPage }"
                    @click="addOnClickPageNumber(totalPage)"
                    class="page__index"
                  >
                    <div class="text">{{ totalPage }}</div>
                  </div>
                </div>
                <MButtonIcon
                  @addOnClickBtnIcon="addOnIncreaseNumberPage"
                  class="content-footer__item3--icon1"
                  classIcon="item3__icon3--image"
                >
                </MButtonIcon>
              </div>
            </div>
          </th>
          <th class="column7 text-align-right">{{ formatValue(quantityTotal, "money") }}</th>
          <th class="column8 text-align-right">{{ formatValue(costTotal, "money") }}</th>
          <th class="column9 text-align-right">
            {{ formatValue(depreciationValueTotal, "money") }}
          </th>
          <th class="column10 text-align-right">{{ formatValue(residualValueTotal, "money") }}</th>
          <th class="column12"></th>
        </tr>
      </tfoot>
    </table>
    <!-- dialog load dữ liệu  -->
    <MDialogLoadData v-if="isShowLoad"></MDialogLoadData>
    <!-- dialog thông báo có lỗi xảy ra trong quá trình load dữ liệu -->
    <MDialogNotify
      :content="contentDialogNotifyLoadError"
      v-if="isShowDialogNotifyLoadError"
      @onClose="handlerEventCloseDialogNotifyLoadError"
    >
    </MDialogNotify>
  </div>
</template>

<script>
import commonJS from "@/js/common.js";
import resourceJS from "@/js/resourceJS.js";
import MDialogLoadData from "../dialog/MDialogLoadData.vue";
import axios from "axios";
import moment from 'moment'
export default {
  name: "MTable",
  components: {
    MDialogLoadData,
  },
  props: {
    api: {
      type: String,
      default: "",
    },
    modelValue: [String, Number, Boolean],
    departmentId: {
      type: String,
      default: "",
    },
    assetCategoryId: {
      type: String,
      default: "",
    },
    keyword: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      titleEditAssetForm: resourceJS.titlteForm.editAssetForm,
      titleCloneAssetForm: resourceJS.titlteForm.cloneAssetForm,
      labelForm: "",
      isShowForm: false,
      assetInput: null,
      assets: [],
      toolTipDepreciation: resourceJS.tooltip.toolTipDepreciation,
      checkboxAll: false,
      checkbox: [],
      quantityCheckbox: 0,
      indexCheckbox: -1,
      itemSelected: null,
      isShowLoad: false,
      isShowDialogNotifyLoadError: false,
      contentDialogNotifyLoadError: "",
      isSelectedRow: [],
      pageSize: 10,
      dataPageSize: ["10", "20", "50", "100"],
      pageNumber: 1,
      indexRowClick: 0,
      totalRecord: 0,
      totalPage: 0,
      clickFunction: false,
      quantityTotal: 0,
      costTotal: 0,
      depreciationValueTotal: 0,
      residualValueTotal: 0,
    };
  },
  computed: {
  },
  methods: {
    loadData() {
      this.isShowLoad = true;
      axios
        .get(
          `${this.api}/filter?fixedAssetCatagortId=${this.assetCategoryId}&keyword=${this.keyword}&departmentId=${this.departmentId}&pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`
        )
        .then((res) => {
          this.assets = res.data.Data;
          this.totalRecord = res.data.TotalRecord;
          this.quantityTotal = res.data.QuantityTotal;
          this.costTotal = res.data.CostTotal;
          this.depreciationValueTotal = res.data.DepreciationValueTotal;
          this.residualValueTotal = this.costTotal - this.depreciationValueTotal;
          this.getTotalPage();
          this.cancelCheckbox();
          // this.checkbox.fill(false);
          // this.isSelectedRow.fill(false);
          // this.quantityCheckbox = 0;
          // this.checkboxAll = false;
          // this.indexCheckbox = -1;
          // this.isShowLoad=false;
          this.isShowLoad = false;
        })
        .catch((error) => {
          console.log(error);
          this.isShowLoad = false;
          this.isShowDialogNotifyLoadError = true;
          this.contentDialogNotifyLoadError =
            "Đã có lỗi khi load data table. Vui lòng thử lại sau!";
        });
    },

    /**
     * Hàm tính khoảng cách thời gian từ thời điểm hiện tại đến thời gian cho trước theo tháng
     * @param {*} value giá trị thời gian cần tính
     * @author LTVIET (24/03/2023)
     */
    getMonthDiff(value){
      let valueTime = moment(moment()).diff(value, "milliseconds");
      let duration = moment.duration(valueTime);
      let monthDiff = duration.months();
      let yearDiff = duration.years();
      return monthDiff+(yearDiff*12);
    },

    

    /**
     * Hàm tính tổng số trang của table
     * @author LTVIET (15/03/2023)
     */
    getTotalPage() {
      this.pageSize = Number(this.pageSize);
      this.totalPage = this.totalRecord / this.pageSize;
      this.totalPage = Math.ceil(this.totalPage);
    },
    /**
     * Hàm tính giá trị còn lại của 1 tài sản trong table
     * @author LTVIET (02/03/2023)
     */
    getResidualCost(item) {
      let value = item.cost - this.getDepreciationValue(item);
      return value;
    },

    /**
     * Hàm tính hao mòn lũy kế của 1 tài sản trong table
     * @author LTVIET (02/03/2023)
     */
    getDepreciationValue(item) {
      let depreciationValueYear = Math.round(this.getDepreciationValueYear(item));
      let monthDiff = this.getMonthDiff(item.production_year);
      let depreciationValueMonth = Math.round((depreciationValueYear/12));
      let depreciationValue = Math.round(depreciationValueMonth*monthDiff);
      return depreciationValue;
    },

    /**
     * Hàm tính giá trị hao mòn năm
     * @param {*} item đối tượng chứa giá trị caabd tính
     * @author LTVIET (24/03/2023)
     */
    getDepreciationValueYear(item){
      return item.cost*item.depreciation_rate;
    },

    /**
     * Hàm thêm sự kiện click thêm tài sản
     * @param {*} title tiêu đề của form
     * @param {*} index id của đối tượng
     * @author LTVIET (02/03/2023)
     */
    btnClickOpenForm(title, item) {
      this.isShowForm = true;
      this.labelForm = title;
      if (item) {
        this.assetInput = item;
      } else {
        this.assetInput = null;
      }
    },
    /**
     * Hàm format lại định dạng tiền
     * @param {*} value giá trị cần format
     * @param {*} type loại định dạng muốn format
     * @author LTVIET (02/03/2023)
     */
    formatValue(value, type) {
      if (type == "money") {
        return commonJS.formatMoney(value);
      } else if (type == "date") {
        return commonJS.formatDate(value);
      }
    },
    /**
     * Hàm xử lý sự kiện click chức năng(sửa hoặc nhân bản) của table
     * @param {*} title tiêu đề form (sửa tài sản hoặc nhân bản tài sản)
     * @param {*} item đối tượng cần xử lý
     * @author LTVIET (02/03/2023)
     */
    handleEventClickFunction(title, item, index) {
      this.clickFunction = true;
      this.isSelectedRow[index] = false;
      this.$emit("btnClickFunctionOpenForm", [title, item]);
    },
    /**
     * Hàm xử lý sự kiện double click 1 dòng của table
     * @param {*} item dòng của table được dblclick
     * @author LTVIET (02/03/2023)
     */
    btnAddOnDblClickRowTable(item) {
      this.$emit("btnDblClickRow", item);
    },
    btnAddOnClickRowTable(index) {
      if (!this.checkbox[index]) {
        if (!this.clickFunction) {
          this.isSelectedRow[index] = !this.isSelectedRow[index];
        }
        this.isSelectedRow[this.indexRowClick] = false;
        if (this.isSelectedRow[index]) {
          this.indexRowClick = index;
        }
      }
    },
    /**
     * Hàm xử lý sự kiện click vòa checkboxAll
     * @author LTVIET (05/03/2023)
     */
    markCheckboxAll() {
      //1. set giá trị của checkboxAll: false-->true hoặc true-->false
      this.checkboxAll = !this.checkboxAll;
      let length = this.assets.length;
      let check = false;

      if (this.checkboxAll) {
        //2.1. nếu checkboxAll = true
        //--> gán giá trị true cho tất cả cac checkbox
        this.quantityCheckbox = length;
        check = true;
      } else {
        //2.2. nếu checkboxAll = false
        //--> gán giá trị false cho tất cả cac checkbox
        check = false;
        this.quantityCheckbox = 0;
      }
      for (let i = 1; i <= length; i++) {
        this.checkbox[i] = check;
      }
    },
    /**
     * Hàm xử lý sựu kiện khi click vào checkbox
     * @param {*} index vị trí dòng của checkbox trong table
     * @author LTVIET (04/03/2023)
     */
    markCheckbox(index) {
      //1. set giá trị của checkbox: false-->true hoặc true-->false
      this.checkbox[index] = !this.checkbox[index];
      let length = this.assets.length;
      if (this.checkbox[index]) {
        //2.1. nếu checkbox = true thì gán index cho indexCheckbox
        this.indexCheckbox = index;
        this.itemSelected = this.assets[index - 1];
        //2.1.1. tăng giá trị số checkbox = true lên 1
        this.quantityCheckbox += 1;
        //2.1.2 duyệt từng giá trị của checkbox
        for (let i = 1; i <= length; i++) {
          //2.1.3. nếu có 1 checkbox = false thì set checkboxAll = false
          if (!this.checkbox[i]) {
            this.checkboxAll = false;
            return;
          }
        }
        //2.1.4. nếu tất cả checkbox = true thì set checkboxAll = true
        this.checkboxAll = true;
      } else {
        //2.2. nếu checkbox = false thì giảm số lượng của checkbox = true giảm đi 1 đơn vị
        // và set checkboxAll = false
        this.quantityCheckbox -= 1;
        this.checkboxAll = false;
        this.isSelectedRow[index] = false;
      }
    },

    /**
     * nếu chỉ có 1 checkbox = true thì lấy ra vị trí của checkbox đó
     * @author LTVIET (05/03/2023)
     */
    getIndexCheckbox() {
      if (this.quantityCheckbox == 1) {
        return this.indexCheckbox;
      }
    },
    getItemSelected() {
      let checkboxSelected = [];
      for (let i = 0; i < this.assets.length; i++) {
        if (this.checkbox[i + 1]) {
          checkboxSelected.push(this.assets[i]);
        }
      }
      if (checkboxSelected.length == 1) {
        return this.itemSelected;
      } else {
        return checkboxSelected;
      }
    },
    /**
     * Hàm set style cho icon function khi click vào checkbox
     * @param {*} index vị trí fuction cần set style
     * @author LTVIET (05/03/2023)
     */
    styleFunction(index) {
      if (this.checkbox[index] || this.isSelectedRow[index]) {
        //nếu checkbox = true thì hiển thị icon
        return "visibility: visible;";
      } else {
        //nếu checkbox = false thì hiển thị icon
        return "visibility: hidden;";
      }
    },
    /**
     * Hàm sư lý sự kiện key down cho checkbox
     * @param {*} event sự kiện cần sử lý
     * @param {*} index ví trí của checkbox cần xử lý sự kiện
     * @author LTVIET (05/03/2023)
     */
    addOnEventKeyDown(event, index) {
      //lấy giá trị của phím nhập
      const key = event.keyCode;
      if (key == 13) {
        //nếu là phím enter
        if (index == 0) {
          //nếu index = 0 thì click nút checkboxAll
          this.markCheckboxAll();
        } else {
          //ngược lại thì click nút checkbox ở ví trí index
          this.markCheckbox(index);
        }
      }
    },

    /**
     * Hàm xử lý sự kiện click btn chuyển vị trí trang tăng thêm 1 đơn vị
     * @author LTVIET (05/03/2023)
     */
    addOnIncreaseNumberPage() {
      this.pageNumber += 1;

      if (this.pageNumber > this.totalPage) {
        this.pageNumber = this.totalPage;
      }
    },

    /**
     * Hàm xử lý sự kiện click btn chuyển vị trí trang gảm đi 1 đơn vị
     * @author LTVIET (05/03/2023)
     */
    addOnDecreaseNumberPage() {
      this.pageNumber -= 1;

      if (this.pageNumber < 1) {
        this.pageNumber = 1;
      }
    },
    /**
     * Hàm xử lý sự kiện khi click btn close của dialog thông báo lỗi load data
     * @author LTVIET (06/03/2023)
     */
    handlerEventCloseDialogNotifyLoadError() {
      this.isShowDialogNotifyLoadError = false;
    },
    /**
     * Hàm xử lý sự kiện click chọn trang trong table
     * @param {*} index vị trí trang muốn chọn
     * @author LTVIET (15/03/2023)
     */
    addOnClickPageNumber(index) {
      this.pageNumber = index;
    },

    /**
     * Hàm set trạng thái tất cả checkbox thành false;
     */
    cancelCheckbox(){
      this.checkbox.fill(false);
      this.isSelectedRow.fill(false);
      this.quantityCheckbox = 0;
      this.checkboxAll = false;
      this.indexCheckbox = -1;
    }
  },
  async created() {
    // lấy api để load danh sách asset
    if (this.api) {
      this.loadData();
      this.quantityCheckbox = this.modelValue;
      this.pageSize = Number(this.dataPageSize[0]);
    }
  },
  watch: {
    /** Hàm theo dõi số bản ghi trong 1 trang (pageSize),
     * nếu có sự thay đổi thì gọi đến hàm loadData để gọi dữ liệu mới
     * @author LTVIET (15/03/2023)
     */
    pageSize: function () {
      this.pageNumber = 1;
      this.loadData();
    },
    /** Hàm theo dõi số trang hiện tại (pageNumber),
     * nếu có sự thay đổi thì gọi đến hàm loadData để gọi dữ liệu mới
     * @author LTVIET (15/03/2023)
     */
    pageNumber: function () {
      this.loadData();
    },

    assetCategoryId: function (newValue) {
      if (!newValue) {
        console.log("table:",this.assetCategoryId);
        this.loadData();
      }
    },
    departmentId: function () {
      console.log("table:",this.departmentId);
      this.loadData();
    },
  },
};
</script>

<style scoped>
@import url(./table.css);
</style>
