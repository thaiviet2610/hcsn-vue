<template>
  <div class="table"  @keyup="handleEventKeyUp" @keydown="handleEventKeyDown" >
    <table  class="content__table"  >
      <!-- phần title của table  -->
      <thead>
        <tr>
          <th class="column1 text-align-center">
            <MCheckbox 
              ref="mCheckboxAll"
              :checked="checkboxAll"
              @addOnClick="markCheckboxAll"
              >
            </MCheckbox>
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
        <tr style="position: relative;"
          :ref="`mRow_${index+1}`"
          @contextmenu="handleEventClickRightMouse($event,item)"
          @dblclick="btnAddOnDblClickRowTable(item,index+1)"
          @click="btnAddOnClickRowTable(index + 1)"
          @mousedown="handleEventMouseDown($event,index+1)"
          
          v-for="(item, index) in this.assets"
          :key="index"
          :class="{
            row__selected: checkbox[index + 1] || isSelectedRow[index + 1],
          }"
        >
          <td class="column1 text-align-center">
            <MCheckbox 
              :ref="`mCheckbox_${index+1}`"
              :checked="checkbox[index + 1]"
              @addOnClick="markCheckbox(index + 1)"
              >
            </MCheckbox>
          </td>
          <td class="column2 text-align-center" type="stt">
            {{ (pageNumber - 1) * pageSize + index + 1 }}
          </td>
          <td class="column3 text-align-left">{{ item.fixed_asset_code }}</td>
          <td class="column4 text-align-left">{{ item.fixed_asset_name }}</td>
          <td class="column5 text-align-left">
            {{ item.fixed_asset_category_name }}
          </td>
          <td class="column6 text-align-left column6--text"
            >{{ item.department_name }}</td>
          <td class="column7 text-align-right">
            {{ formatValue(item.quantity, "money") }}
          </td>
          <td class="column8 text-align-right">
            {{ formatValue(item.cost, "money") }}
          </td>
          <td class="column9 text-align-right">
            {{ formatValue(item.depreciation_value, "money") }}
          </td>
          <td class="column10 text-align-right">
            {{ formatValue(getResidualCost(item), "money") }}
          </td>
          <td class="column11 text-align-center">
            <div class="function" :style="styleFunction(index + 1)">
              <!-- chức năng sửa tài sản trong table  -->
              <MButtonIcon
                class="function__edit"
                data_tooltip_bottom="Sửa (Ctrl+E)"
                @addOnClickBtnIcon="
                  handleEventClickFunction(titleEditAssetForm, item)
                "
              >
              </MButtonIcon>
              <!-- chức năng nhân bản tài sản trong table  -->
              <MButtonIcon
                class="function__clone"
                data_tooltip_bottom="Nhân bản (Ctrl+0)"
                @addOnClickBtnIcon="
                  handleEventClickFunction(titleCloneAssetForm, item)
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
      btnLabel="Đóng"
      v-if="isShowDialogNotifyLoadError"
      @onClose="handleEventCloseDialogNotifyLoadError"
    >
    </MDialogNotify>
    <MContextMenu  
          v-show="isShowContextMenu"
          :data="dataContextMenu"
          :pageX="contextMenuPageX"
          :pageY="contextMenuPageY"
          :key="keyContextMenu"
          :entity="contextMenuEnity"
          @addOnClickItem="addOnClickItemContextMenu"></MContextMenu>
  </div>
  
</template>

<script>
import commonJS from "@/js/common.js";
import resourceJS from "@/js/resourceJS.js";
import MDialogLoadData from "../dialog/MDialogLoadData.vue";
import axios from "axios";
import MContextMenu from "../contextMenu/MContextMenu.vue";
import enumJS from '@/js/enumJS';
export default {
  name: "MTable",
  components: {
    MDialogLoadData,MContextMenu
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
      clickCheckbox: false,
      quantityTotal: 0,
      costTotal: 0,
      depreciationValueTotal: 0,
      residualValueTotal: 0,
      isShowContextMenu: false,
      dataContextMenu: [
        {
          icon: "context__menu--icon-add",
          text: "Thêm tài sản"
        },
        {
          icon: "context__menu--icon-clone",
          text: "Nhân bản tài sản"
        },
        {
          icon: "context__menu--icon-edit",
          text: "Sửa tài sản"
        },
        {
          icon: "context__menu--icon-delete",
          text: "Xóa tài sản"
        }
      ],
      contextMenuPageX: 0,
      contextMenuPageY: 0,
      keyContextMenu: 0,
      contextMenuEnity: null,
      previousKeyShift: false,
      indexDeleteStart: 0,
      indexDeleteEnd: 0,
    };
  },

  computed: {
  },
  methods: {
    /**
     * Hàm xử lý sự kiện click chuột vào table
     * @param {*} index vị trí dòng dữ liệu được click của table
     * @author LTVIET (01/04/2023)
     */
    handleEventMouseDown(event,index){
      event.preventDefault();
      this.$emit('addOnEventMouseDown',index);
    },

    /**
     * Hàm xử lý sự kiện click vào 1 item trong contextmenu
     * @param {*} values dữ liệu được truyền vào (item,index)
     * @author LTVIET (24/03/2023)
     */
    addOnClickItemContextMenu(values){
      let index = values[0];
      let item = values[1];
      this.$emit("addOnClickContextMenu",[item,index]);
      
    },

    /**
     * Hàm xử lý sự kiện click chuột phải vào từng dòng của table
     * @param {*} event Đối tượng sự kiện cần xử lý
     * @param {*} item Đối tượng dữ liệu của dòng vừa click
     * @author LTVIET (24/03/2023)
     */
    handleEventClickRightMouse(event,item){
        event.preventDefault();
        this.contextMenuEnity = item;
        this.contextMenuPageX = event.pageX+10;
        this.contextMenuPageY = event.pageY+10;
        if(this.contextMenuPageX+156 > window.innerWidth){
          this.contextMenuPageX = this.contextMenuPageX - 20 - 156 ;
        }
        if(this.contextMenuPageY+153 > window.innerHeight){
          this.contextMenuPageY = this.contextMenuPageY - 10 - 153;
        }
        this.isShowContextMenu = true;
        this.keyContextMenu=++this.keyContextMenu;
    },

    /**
     * Hàm xử lý sự kiện gọi api load dữ liệu mTable
     * @author LTVIET (02/03/2023)
     */
    async loadData() {
      this.isShowLoad = true;
      
       axios
        .get(
          `${this.api}/filter?fixedAssetCatagortId=${this.assetCategoryId}&keyword=${this.keyword}&departmentId=${this.departmentId}&pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`
        )
        .then(async (res) => {
          this.assets = await res.data.Data;
          this.totalRecord = await res.data.TotalRecord;
          this.quantityTotal = await res.data.QuantityTotal;
          this.costTotal = await res.data.CostTotal;
          this.depreciationValueTotal = await res.data.DepreciationValueTotal;
          this.residualValueTotal =  this.costTotal - this.depreciationValueTotal;
          this.getTotalPage();
          this.reloadTable();
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
      let value = item.cost - item.depreciation_value;
      return value > 0 ? value : 0;
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
    handleEventClickFunction(title, item) {
      this.clickFunction = true;
      this.$emit("btnClickFunctionOpenForm", [title, item]);
    },

    /**
     * Hàm xử lý sự kiện double click 1 dòng của table
     * @param {*} item dòng của table được dblclick
     * @param {*} index vị trí dòng của table được dblclick
     * @author LTVIET (02/03/2023)
     */
    btnAddOnDblClickRowTable(item,index) {
      this.isSelectedRow[index] = false;
      this.indexRowClick = -1;
      this.$emit("btnDblClickRow", item);
    },

    /**
     * Hàm xử lý sự kiện click 1 dòng của table
     * @param {*} index vị trí dòng của table được dblclick
     * @author LTVIET (02/03/2023)
     */
    btnAddOnClickRowTable(index) {
      this.$refs[`mCheckbox_${index}`][0].setFocus();
      
      if (!this.checkbox[index]) {
        if (!this.clickFunction&&!this.clickCheckbox) {
          this.isSelectedRow[index] = !this.isSelectedRow[index];
          if(index != this.indexRowClick){
            this.isSelectedRow[this.indexRowClick] = false;
          }
        }
        if (this.isSelectedRow[index]) {
          this.indexRowClick = index;
          this.indexDeleteMultiple = index;
        }
      }
      
      this.clickFunction = false;
      this.clickCheckbox = false;
    },

    /**
     * Hàm xử lý sự kiện lên xuống dòng dữ liệu trong table bằng phím lên, xuống
     * @param {*} event sự kiện cần xử lý
     * @author LTVIET (01/04/2023)
     */
     handleEventKeyDown(event){
      const keyCode = event.keyCode;
      switch (keyCode) {
        case enumJS.arrowDown:
          if(this.indexRowClick != 0){
            let index = (this.indexRowClick + 1) > this.pageSize ? this.pageSize : (this.indexRowClick + 1);
            if(this.isSelectedRow[index]){
              this.isSelectedRow[index] = false;
            }
            if(this.previousKeyShift){
              if(this.indexDeleteStart == 0){
                this.indexDeleteStart = index - 1;
                this.indexDeleteEnd = index;
              }else{
                this.indexDeleteEnd = ++this.indexDeleteEnd;
                if(this.indexDeleteEnd > this.pageSize){
                  this.indexDeleteEnd = this.pageSize;
                }
              }
              this.checkbox.fill(false);
              if(this.indexDeleteStart <= this.indexDeleteEnd){
                for(let i=this.indexDeleteStart; i<= this.indexDeleteEnd;i++){
                  this.setFocusCheckbox(i);
                }
              }else{
                for(let i=this.indexDeleteEnd; i<= this.indexDeleteStart;i++){
                  this.setFocusCheckbox(i);
                }
              }
            }else{
              this.btnAddOnClickRowTable(index);
            }
          }
          break;
        case enumJS.arrowUp:
          if(this.indexRowClick != 0){
            let index = (this.indexRowClick - 1) > 0 ? (this.indexRowClick - 1) : 1;
            if(this.isSelectedRow[index]){
              this.isSelectedRow[index] = false;
            }
            if(this.previousKeyShift){
              if(this.indexDeleteStart == 0){
                this.indexDeleteEnd = index;
                this.indexDeleteStart = index + 1;
              }else{
                this.indexDeleteEnd = --this.indexDeleteEnd;
                if(this.indexDeleteEnd < 1){
                  this.indexDeleteEnd = 1;
                }
              }
              this.checkbox.fill(false);
              // console.log("this.indexDeleteStart:",this.indexDeleteStart);
              // console.log("this.indexDeleteEnd:",this.indexDeleteEnd);
              if(this.indexDeleteStart <= this.indexDeleteEnd){
                for(let i=this.indexDeleteStart; i<= this.indexDeleteEnd;i++){
                  this.setFocusCheckbox(i);
                }
              }else{
                for(let i=this.indexDeleteEnd; i<= this.indexDeleteStart;i++){
                  this.setFocusCheckbox(i);
                }
              }
              
            }else{
              this.btnAddOnClickRowTable(index);
            }
          }
          break;
        case enumJS.keyShift:
          this.previousKeyShift = true;
          break;

        default:
          break;
      }
    },

    handleEventKeyUp(event){
      const keyCode = event.keyCode;
      if(keyCode == enumJS.keyShift){
        this.previousKeyShift = false;
        this.indexDeleteStart = 0;
        this.indexDeleteEnd = 0;
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
        check = true;
        
      } else {
        //2.2. nếu checkboxAll = false
        //--> gán giá trị false cho tất cả cac checkbox
        check = false;
        
      }

      for (let i = 1; i <= length; i++) {
        this.checkbox[i] = check;
        this.isSelectedRow[i] = check; 
      }
      this.indexCheckbox = -1;
      this.indexRowClick = 0;
      this.clickCheckbox = false;
      this.clickFunction = false;
      this.$refs["mCheckboxAll"].setFocus();
    },
    /**
     * Hàm xử lý sựu kiện khi click vào checkbox
     * @param {*} index vị trí dòng của checkbox trong table
     * @author LTVIET (04/03/2023)
     */
    markCheckbox(index) {
      //1. set giá trị của checkbox: false-->true hoặc true-->false
      this.checkbox[index] = !this.checkbox[index];
      let length = this.pageSize;
      if (this.checkbox[index]) {
        let check = true;
        //2.1. nếu checkbox = true thì gán index cho indexCheckbox
        this.indexCheckbox = index;
        this.itemSelected = this.assets[index - 1];
        //2.1.2 duyệt từng giá trị của checkbox
        for (let i = 1; i <= length; i++) {
          //2.1.3. nếu có 1 checkbox = false thì set checkboxAll = false
          if (!this.checkbox[i]) {
            this.checkboxAll = false;
            check = false;
            break;
          }
        }
        
        //2.1.4. nếu tất cả checkbox = true thì set checkboxAll = true
        if(check){
          this.checkboxAll = true;
        }
      } else {
        //2.2. nếu checkbox = false 
        this.checkboxAll = false;
        this.isSelectedRow[index] = false;
      }
      this.$refs[`mCheckbox_${index}`][0].setFocus();
      this.clickCheckbox = true;
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

    getQuantityCheckbox(){
      let quantity = 0;
      for(let i=1; i <= this.pageSize; i++){
        if(this.checkbox[i]){
          quantity += 1;
        }
      }
      this.quantityCheckbox = quantity;
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
    handleEventCloseDialogNotifyLoadError() {
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
     * Hàm set tất cả trạng thái của table về lại ban đầu;
     * @author LTVIET (26/03/2023)
     */
    reloadTable(){
      this.checkbox.fill(false);
      this.isSelectedRow.fill(false);
      this.checkboxAll = false;
      this.indexCheckbox = -1;
      this.clickCheckbox = false;
      this.clickFunction = false;
      this.indexDeleteStart = 0;
      this.indexDeleteEnd = 0;
      this.indexRowClick = 0;
    },

    /**
     * Hàm set focus vào checkbox
     * @param {*} index vị trí của checkbox muốn focus
     * @author LTVIET (29/03/2023)
     */
    setFocusCheckbox(index){
      if(index == 0){
        this.markCheckboxAll();
      }else{
        // this.checkbox[index] = false;
        this.markCheckbox(index);
      }
    }
  },

  async created() {
    // lấy api để load danh sách asset
    if (this.api) {
      this.pageSize = Number(this.dataPageSize[0]);
      this.loadData();
      
    }
    for(let i=0;i<=this.pageSize;i++){
      this.checkbox[i] = false;
    }
  },
  watch: {
    /** 
     * Hàm theo dõi số bản ghi trong 1 trang (pageSize),
     * nếu có sự thay đổi thì gọi đến hàm loadData để gọi dữ liệu mới
     * @author LTVIET (15/03/2023)
     */
    pageSize: function () {
      this.pageNumber = 1;
      this.loadData();
    },

    checkbox: {
      handler: function(){
        this.getQuantityCheckbox();
      },
      deep:true
    },

    /** 
     * Hàm theo dõi số trang hiện tại (pageNumber),
     * nếu có sự thay đổi thì gọi đến hàm loadData để gọi dữ liệu mới
     * @author LTVIET (15/03/2023)
     */
    pageNumber: function () {
      this.loadData();
    },

    /** 
     * Hàm theo dõi id loại tài sản,
     * nếu có sự thay đổi thì gọi đến hàm loadData để gọi dữ liệu mới
     * @author LTVIET (15/03/2023)
     */
    assetCategoryId: function (newValue) {
      if (!newValue) {
        this.loadData();
      }
    },

    /** 
     * Hàm theo dõi id phòng ban,
     * nếu có sự thay đổi thì gọi đến hàm loadData để gọi dữ liệu mới
     * @author LTVIET (15/03/2023)
     */
    departmentId: function () {
      this.loadData();
    },
  },
};
</script>

<style scoped>
@import url(./table.css);
</style>
