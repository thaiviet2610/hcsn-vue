
<template>
  <div  class="table"   ref="mTable">
    
    <!-- Khi table không có dữ liệu phù hợp  -->
    <div v-if="assets.length == 0" >
      <table style="position: relative;">
        <!-- phần title của table  -->
        <thead>
          <tr>
            <th class="column1 text-align-center">
              <MCheckbox 
                ref="mCheckbox_0"
                idCheckbox="idCheckbox_0"
                :checked="checkboxAll"
                @addOnClick="markCheckboxAll"
                >
              </MCheckbox>
            </th>
            <th class="column2 text-align-center" >
              <div :data_tooltip_bottom="tooltipIndex">{{ titleColumn.index }}</div>
            </th>
            <th class="column3 text-align-left">{{ titleColumn.assetCode }}</th>
            <th class="column4 text-align-left">{{ titleColumn.assetName }}</th>
            <th class="column5 text-align-left">{{ titleColumn.assetCategoryName }}</th>
            <th class="column6 text-align-left">{{ titleColumn.departmentName }}</th>
            <th class="column7 text-align-right">{{ titleColumn.quantity }}</th>
            <th class="column8 text-align-right">{{ titleColumn.cost }}</th>
            <th
              class="column9 text-align-right" 
            >
            <div :data_tooltip_bottom="tooltipDepreciation">{{ titleColumn.depreciationValue }}</div>
            </th>
            <th class="column10 text-align-right">{{ titleColumn.residualValue }}</th>
            <th class="column11 text-align-center">{{ titleColumn.function }}</th>
          </tr>
        </thead>
        <!-- phần body của table  -->
        <tbody>
          <tr style="cursor: unset !important;">
            <td style="cursor: unset !important;"></td>
            <td style="cursor: unset !important;"></td>
            <td style="cursor: unset !important;"></td>
            <td style="cursor: unset !important;"></td>
            <td class="no_data" style="cursor: unset !important;"></td>
          </tr>
        </tbody>
        <tbody class="no_data--content">
          <div class="no_data--icon"></div>
          <div class="no_data--text">{{ notitfyNoDataTable }}</div>
        </tbody>
        <!-- phần footer của table  -->
        <tfoot>
            <td colspan="6">
              <div class="content-footer__left">
                <div class="content-footer__item1">
                  <div class="content-footer__item1--text">
                    {{ contentFooterBefore }} <span style="font-family: Roboto-Bold"> {{ totalRecord }} </span> {{ contentFooterAfter }}
                  </div>
                </div>
                <div class="dropdown_table">
                  <MDropdown ref="mDropdown" v-model="pageSize" :data="dataPageSize"> </MDropdown>
                </div>
                <div class="content-footer__item3"> 
                  <MButtonIcon
                    class="content-footer__item3--icon1 cursor--disable"
                    classIcon="item3__icon1--image"
                  >
                  </MButtonIcon>
                  <div class="content-footer__item3--icon2" >
                    <div
                      class="page__index page--selected" style="cursor: unset;"
                    >
                      <div class="text">{{ pageNumber }}</div>
                    </div>
                  </div>
                  <MButtonIcon
                    @addOnClickBtnIcon="addOnIncreaseNumberPage"
                    class="content-footer__item3--icon1 cursor--disable"
                    classIcon="item3__icon3--image"
                  >
                  </MButtonIcon>
                </div>
              </div>
            </td>
            <td class="footer_right">{{ formatValue(quantityTotal, typeNumber) }}</td>
            <td class="column8 footer_right">{{ formatValue(costTotal, typeNumber) }}</td>
            <td class="footer_right">{{ formatValue(depreciationValueTotal, typeNumber) }}</td>
            <td class="footer_right">{{ formatValue(residualValueTotal, typeNumber) }}</td>
            <td></td>
        </tfoot>
      </table>
    </div>
    
    <!-- Khi table có dữ liệu phù hợp  -->
    <table id="idTable" v-else :key="keyTable" class="content__table"  >
      <!-- phần title của table  -->
      <thead>
        <tr>
          <th class="column1 text-align-center">
            <MCheckbox 
              ref="mCheckbox_0"
              idCheckbox="idCheckbox_0"
              :checked="checkboxAll"
              @addOnClick="markCheckboxAll"
              >
            </MCheckbox>
          </th>
          <th class="column2 text-align-center" >
            <div :data_tooltip_bottom="tooltipIndex">{{ titleColumn.index }}</div>
          </th>
          <th class="column3 text-align-left">{{ titleColumn.assetCode }}</th>
          <th class="column4 text-align-left">{{ titleColumn.assetName }}</th>
          <th class="column5 text-align-left">{{ titleColumn.assetCategoryName }}</th>
          <th class="column6 text-align-left">{{ titleColumn.departmentName }}</th>
          <th class="column7 text-align-right">{{ titleColumn.quantity }}</th>
          <th class="column8 text-align-right">{{ titleColumn.cost }}</th>
          <th
            class="column9 text-align-right" 
          >
          <div :data_tooltip_bottom="tooltipDepreciation">{{ titleColumn.depreciationValue }}</div>
          </th>
          <th class="column10 text-align-right">{{ titleColumn.residualValue }}</th>
          <th class="column11 text-align-center">{{ titleColumn.function }}</th>
        </tr>
      </thead>
      <!-- phần body của table  -->
      <tbody @keyup="handleEventKeyUp" @keydown="handleEventKeyDown">
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
              :idCheckbox="`idCheckbox_${index+1}`"
              :checked="checkbox[index + 1]"
              @addOnClick="markCheckbox(index + 1)"
              >
            </MCheckbox>
          </td>
          <td class="column2 text-align-center" type="stt">
            {{ item.index }}
          </td>
          <td class="column3 text-align-left">{{ item.fixed_asset_code }}</td>
          <td class="column4 text-align-left">{{ item.fixed_asset_name }}</td>
          <td class="column5 text-align-left">
            {{ item.fixed_asset_category_name }}
          </td>
          <td class="column6 text-align-left column6--text"
            >{{ item.department_name }}</td>
          <td class="column7 text-align-right">
            {{ formatValue(item.quantity, typeNumber) }}
          </td>
          <td class="column8 text-align-right">
            {{ formatValue(item.cost, typeNumber) }}
          </td>
          <td class="column9 text-align-right">
            {{ formatValue(item.depreciation_value, typeNumber) }}
          </td>
          <td class="column10 text-align-right">
            {{ formatValue(item.residual_value, typeNumber) }}
          </td>
          <td class="column11 text-align-center">
            <div class="function" :style="styleFunction(index + 1)">
              <!-- chức năng sửa tài sản trong table  -->
              <MButtonIcon
                class="function__edit"
                :data_tooltip_bottom= "tooltipFunctionEdit"
                @addOnClickBtnIcon="
                  handleEventClickFunction(typeForm.edit, item)
                "
              >
              </MButtonIcon>
              <!-- chức năng nhân bản tài sản trong table  -->
              <MButtonIcon
                class="function__clone"
                :data_tooltip_bottom="tooltipFunctionClone"
                @addOnClickBtnIcon="
                  handleEventClickFunction(typeForm.clone, item)
                "
              >
              </MButtonIcon>
            </div>
          </td>
        </tr>

      </tbody>
      <!-- phần footer của table  -->
            <tfoot>
                <td colspan="6">
                  <div class="content-footer__left">
                    <div class="content-footer__item1">
                      <div class="content-footer__item1--text">
                        {{ contentFooterBefore }} <span style="font-family: Roboto-Bold"> {{ totalRecord }} </span> {{ contentFooterAfter }}
                      </div>
                    </div>
                    <div class="dropdown_table">
                      <MDropdown v-model="pageSize" :data="dataPageSize"> </MDropdown>
                    </div>
                    <div class="content-footer__item3"> 
                      <MButtonIcon
                        v-if="pageNumber==1"
                        class="content-footer__item3--icon1 cursor--disable"
                        classIcon="item3__icon1--image"
                        tabindex="-1"
                      >
                      </MButtonIcon>
                      <MButtonIcon
                        v-else
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
                        v-if="pageNumber==totalPage"
                        @addOnClickBtnIcon="addOnIncreaseNumberPage"
                        class="content-footer__item3--icon1 cursor--disable"
                        classIcon="item3__icon3--image"
                        tabindex="-1"
                      >
                      </MButtonIcon>
                      <MButtonIcon
                        v-else
                        @addOnClickBtnIcon="addOnIncreaseNumberPage"
                        class="content-footer__item3--icon1"
                        classIcon="item3__icon3--image"
                      >
                      </MButtonIcon>
                    </div>
                  </div>
                </td>
                <td class="footer_right">{{ formatValue(quantityTotal, typeNumber) }}</td>
                <td class="column8 footer_right">{{ formatValue(costTotal, typeNumber) }}</td>
                <td class="footer_right">{{ formatValue(depreciationValueTotal, typeNumber) }}</td>
                <td class="footer_right">{{ formatValue(residualValueTotal, typeNumber) }}</td>
                <td></td>
            </tfoot>
      
    </table>
    
    <!-- dialog load dữ liệu  -->
    <MDialogLoadData v-if="isShowLoad"></MDialogLoadData>
    <!-- dialog thông báo có lỗi xảy ra trong quá trình load dữ liệu -->
    <MDialog
      :content="contentDialogNotifyLoadError"
      :buttonInfo="btnDialogNotify"
      v-if="isShowDialogNotifyLoadError"
      @onClickBtn="handleEventCloseDialogNotifyLoadError"
    >
    </MDialog>
    <!-- contextmenu của table  -->
    <MContextMenu  
      ref="mContextMenu"
      id="idContextMenu"
      v-show="isShowContextMenu"
      :data="dataContextMenu"
      :pageX="contextMenuPageX"
      :pageY="contextMenuPageY"
      :width="widthContextMenu"
      :height="heightContextMenu"
      :key="keyContextMenu"
      :entity="contextMenuEnity"
      @addOnClickItem="addOnClickItemContextMenu"
      >
    </MContextMenu>
  </div>
  
</template>

<script>
import commonJS from "@/js/common.js";
import resourceJS from "@/js/resourceJS.js";
import axios from "axios";
import MContextMenu from "../contextMenu/MContextMenu.vue";
import enumJS from '@/js/enum.js';
export default {
  name: "MTable",
  components: {
    MContextMenu
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
    idTable: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      titleEditAssetForm: resourceJS.titlteForm.editAssetForm,
      titleCloneAssetForm: resourceJS.titlteForm.cloneAssetForm,
      isShowForm: false,
      assetInput: null,
      assets: [],
      tooltipDepreciation: resourceJS.tooltip.table.tooltipDepreciation,
      tooltipIndex: resourceJS.tooltip.table.index,
      tooltipFunctionEdit: resourceJS.tooltip.table.functionEdit,
      tooltipFunctionClone: resourceJS.tooltip.table.functionClone,
      checkboxAll: false,
      checkbox: [],
      checkboxActive: [],
      entityCheckboxActive:[],
      quantityCheckbox: 0,
      indexCheckbox: -1,
      itemSelected: null,
      isShowLoad: false,
      isShowDialogNotifyLoadError: false,
      contentDialogNotifyLoadError: "",
      isSelectedRow: [],
      dataPageSize: resourceJS.table.dataPageSize,
      pageSize: Number(resourceJS.table.dataPageSize[0]),
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
      dataContextMenu: resourceJS.table.dataContextMenu,
      contentFooterBefore: resourceJS.table.contentFooterBefore,
      contentFooterAfter: resourceJS.table.contentFooterAfter,
      notitfyNoDataTable: resourceJS.table.noDataTable,
      contextMenuPageX: 0,
      contextMenuPageY: 0,
      keyContextMenu: 0,
      contextMenuEnity: null,
      previousKeyShift: false,
      previousKeyCtrl: false,
      indexDeleteStart: 0,
      indexDeleteEnd: 0,
      indexCheckboxFocus: -1,
      btnDialogNotify: resourceJS.buttonDialog.notify,
      keyTable: 0,
      typeNumber: enumJS.typeValue.number,
      typeForm: enumJS.type,
      titleColumn: resourceJS.table.titleColumm,
      contentFooterTable: resourceJS.table.contentFooter,
      widthContextMenu: 156,
      heightContextMenu: 152
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
        
        if(this.contextMenuPageX+this.widthContextMenu > window.innerWidth){
          this.contextMenuPageX = this.contextMenuPageX - this.widthContextMenu - 20;
        }
        if(this.contextMenuPageY+this.heightContextMenu > window.innerHeight){
          this.contextMenuPageY = this.contextMenuPageY - this.heightContextMenu - 10;
        }
        this.isShowContextMenu = true;
        this.isSelectedRow[item.index - this.pageSize*(this.pageNumber-1)] = false;
        this.btnAddOnClickRowTable(item.index - this.pageSize*(this.pageNumber-1));
        this.keyContextMenu=++this.keyContextMenu;
    },

    /**
     * Hàm nhận dữu liệu truyền vào từ bên ngoài và chuyển thanh api filter
     * @author LTVIET (02/03/2023)
     */
    getApiFilter(){
      let api = this.api.replace("{0}",this.keyword);
      api = api.replace("{1}",this.assetCategoryId);
      api = api.replace("{2}",this.departmentId);
      api = api.replace("{3}",this.pageSize);
      api = api.replace("{4}",this.pageNumber);
      return api;
    },

    /**
     * Hàm xử lý sự kiện gọi api load dữ liệu mTable
     * @author LTVIET (02/03/2023)
     */
    loadData() {
      this.isShowLoad = true;
      let api = this.getApiFilter();
       axios
        .get(api)
        .then( (res) => {
          // Lấy dữ liệu ra gán vào các biến
          this.assets =  res.data.Data;
          this.totalRecord =  res.data.TotalRecord;
          this.quantityTotal =  res.data.QuantityTotal;
          this.costTotal =  res.data.CostTotal;
          this.depreciationValueTotal =  res.data.DepreciationValueTotal;
          this.residualValueTotal =  res.data.ResidualValueTotal;
          // Tính tổng số trang
          this.getTotalPage();
          // Đặt lại các giá trị của table về mặc định ban đầu
          this.reloadTable();
          this.isShowLoad = false;
          this.keyTable = ++this.keyTable;
          // Đặt lại trạng thái cũ của các checkbox 
          if(!this.checkboxActive[this.pageNumber]){
            this.checkboxActive[this.pageNumber] = [];
            this.entityCheckboxActive[this.pageNumber] = [];
          }
          if(this.checkboxActive[this.pageNumber].length != 0){
            if(this.checkboxActive[this.pageNumber].length == this.pageSize){
              this.markCheckboxAll();
            }else{
              this.checkboxActive[this.pageNumber].forEach(element => {
                this.checkbox[element] = true;
              });
            }
          }
          
        })
        .catch((error) => {
          console.log(error);
          this.isShowLoad = false;
          this.isShowDialogNotifyLoadError = true;
          this.contentDialogNotifyLoadError = resourceJS.errorMsg.errorLoadDataTable;
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
     * Hàm format lại định dạng tiền
     * @param {*} value giá trị cần format
     * @param {*} type loại định dạng muốn format
     * @author LTVIET (02/03/2023)
     */
    formatValue(value, type) {
      if (type == enumJS.typeValue.number) {
        return commonJS.formatNumber(value);
      } else if (type == enumJS.typeValue.date) {
        return commonJS.formatDate(value);
      }
    },

    /**
     * Hàm xử lý sự kiện click chức năng(sửa hoặc nhân bản) của table
     * @param {*} title tiêu đề form (sửa tài sản hoặc nhân bản tài sản)
     * @param {*} item đối tượng cần xử lý
     * @author LTVIET (02/03/2023)
     */
    handleEventClickFunction(type, item) {
      this.clickFunction = true;
      this.$emit("btnClickFunctionOpenForm", [type, item.fixed_asset_id]);
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
      this.$emit("btnDblClickRow", item.fixed_asset_id);
    },

    /**
     * Hàm xử lý sự kiện click 1 dòng của table
     * @param {*} index vị trí dòng của table được click
     * @author LTVIET (02/03/2023)
     */
    btnAddOnClickRowTable(index) {
      if(!this.clickFunction){
        this.setFocusCheckbox(index);
      }
      
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
      this.clickFunction = false;
      this.clickCheckbox = false;
    },

    /**
     * Hàm xử lý sự kiện lên xuống dòng dữ liệu trong table bằng phím lên, xuống
     * @param {*} event sự kiện cần xử lý
     * @author LTVIET (01/04/2023)
     */
     handleEventKeyDown(event){
      let keyCode = event.keyCode;
      switch (keyCode) {
        case enumJS.arrowDown:
          this.handleEventKeyArrowDown();
          break;
        case enumJS.arrowUp:
          this.handleEventKeyArrowUp();
          break;
        case enumJS.keyShift:
          this.previousKeyShift = true;
          break;
        case enumJS.keyCtrl:
          this.previousKeyCtrl = true;
          break;
        default:
          break;
      }
    },

    /**
     * Hàm xử lý sự kiện bấm phím xuống 
     * @author LTVIET (01/04/2023)
     */
     handleEventKeyArrowUp(){
      if(this.indexRowClick != 0){
        let index = (this.indexRowClick - 1) > 0 ? (this.indexRowClick - 1) : 1;
        if(this.isSelectedRow[index]){
          this.isSelectedRow[index] = false;
        }
        if(this.previousKeyShift){
          this.handleEventKeyStrokesShiftUp(index);
        }else if(this.previousKeyCtrl){
          this.handleEventKeyStrokesCtrlUp();
        }
        else{
          this.btnAddOnClickRowTable(index);
        }
      }
      else{
        this.indexCheckboxFocus -= 1;
        if(this.indexCheckboxFocus < 0){
          this.indexCheckboxFocus = this.pageSize;
        }
        this.setFocusCheckbox(this.indexCheckboxFocus);
      }
    },

    /**
     * Hàm xử lý sự kiện bấm phím xuống 
     * @author LTVIET (01/04/2023)
     */
    handleEventKeyArrowDown(){
      if(this.indexRowClick != 0){
        let index = (this.indexRowClick + 1) > this.pageSize ? this.pageSize : (this.indexRowClick + 1);
        if(this.isSelectedRow[index]){
          this.isSelectedRow[index] = false;
        }
        if(this.previousKeyShift){
          this.handleEventKeyStrokesShiftDown(index);
        }else{
          this.btnAddOnClickRowTable(index);
        }
      }
      else{
        this.indexCheckboxFocus += 1;
        if(this.indexCheckboxFocus > this.pageSize){
          this.indexCheckboxFocus = 0;
        }
        this.setFocusCheckbox(this.indexCheckboxFocus);
      }
    },

    /**
     * Hàm xử lý sự kiện bấm tổ hợp phím Shift + phím xuống để chọn nhiều dòng dữ liệu
     * @author LTVIET (01/04/2023)
     */
     handleEventKeyStrokesShiftUp(index){
      if(this.indexDeleteStart == 0){
        this.indexDeleteEnd = index;
        this.indexDeleteStart = index + 1;
      }else{
        this.indexDeleteEnd = --this.indexDeleteEnd;
        if(this.indexDeleteEnd < 1){
          this.indexDeleteEnd = 1;
        }
      }
      this.setTrueForMultipleCheckbox();
    },

    /**
     * Hàm xử lý sự kiện bấm tổ hợp phím Shift + phím xuống để chọn nhiều dòng dữ liệu
     * @author LTVIET (01/04/2023)
     */
    handleEventKeyStrokesShiftDown(index){
      if(this.indexDeleteStart == 0){
        this.indexDeleteStart = index - 1;
        this.indexDeleteEnd = index;
        
      }else{
        this.indexDeleteEnd = ++this.indexDeleteEnd;
        if(this.indexDeleteEnd > this.pageSize){
          this.indexDeleteEnd = this.pageSize;
        }
      }
      
      this.setTrueForMultipleCheckbox();
    },

    /**
     * Hàm xử lý sự kiện set trạng thái true vào các checkbox cho trước
     * @author LTVIET (01/04/2023)
     */
    setTrueForMultipleCheckbox(){
      this.checkbox.fill(false);
      if(this.indexDeleteStart <= this.indexDeleteEnd){
        for(let i=this.indexDeleteStart; i<= this.indexDeleteEnd;i++){
          this.setClickCheckbox(i);
        }
      }else{
        for(let i=this.indexDeleteEnd; i<= this.indexDeleteStart;i++){
          this.setClickCheckbox(i);
        }
      }
    },

    /**
     * Hàm sử lý sự kiện keyup trong table
     * @param {*} event 
     */
    handleEventKeyUp(event){
      const keyCode = event.keyCode;
      if(keyCode == enumJS.keyShift){
        this.previousKeyShift = false;
        this.indexDeleteStart = 0;
        this.indexDeleteEnd = 0;
      }
      if(keyCode == enumJS.keyCtrl){
        this.previousKeyCtrl = false;
      }
      
    },

    /**
     * Hàm xử lý sự kiện click vòa checkboxAll
     * @author LTVIET (05/03/2023)
     */
    markCheckboxAll() {
      //1. set giá trị của checkboxAll: false-->true hoặc true-->false
      this.checkboxAll = !this.checkboxAll;
      let check = false;
      if (this.checkboxAll) {
        //2.1. nếu checkboxAll = true
        //--> gán giá trị true cho tất cả cac checkbox
        check = true;
        for(let i = 1;i<=this.pageSize;i++){
          this.pushCheckboxActive(i);
        }
      } else {
        //2.2. nếu checkboxAll = false
        //--> gán giá trị false cho tất cả cac checkbox
        check = false;
        this.checkboxActive[this.pageNumber] = [];
        this.entityCheckboxActive[this.pageNumber] = [];
      }
      this.checkbox.fill(check);
      this.isSelectedRow.fill(check);
      this.indexCheckbox = -1;
      this.indexRowClick = 0;
      this.clickCheckbox = false;
      this.clickFunction = false;
      this.setFocusCheckbox(0);
    },

    /**
     * Hàm set focus vào checkbox 
     * @param {*} index vị trí của checkbox
     * @author LTVIET (26/03/2023)
     */
    setFocusCheckbox(index){
      if(index != 0){
        this.$refs[`mCheckbox_${index}`][0].setFocus();
      }else{
        this.$refs["mCheckbox_0"].setFocus();
      }
      this.indexCheckboxFocus = index;
    },

    /**
     * Hàm xử lý sựu kiện khi click vào checkbox
     * @param {*} index vị trí dòng của checkbox trong table
     * @author LTVIET (04/03/2023)
     */
    markCheckbox(index) {
      //1. set giá trị của checkbox: false-->true hoặc true-->false
      this.checkbox[index] = !this.checkbox[index];
      if (this.checkbox[index]) {
        //2.1. nếu checkbox = true thì gán index cho indexCheckbox
        this.indexCheckbox = index;
        this.itemSelected = this.assets[index - 1];
        this.pushCheckboxActive(index);
        //2.1.2 duyệt từng giá trị của checkbox
        this.checkboxAll = this.checkbox.every(cb => {
          return cb;
        });
        if(this.checkboxAll){
          for(let i=1;i<this.pageSize;i++){
            this.pushCheckboxActive(i);
          }
        }
      } else {
        //2.2. nếu checkbox = false 
        this.checkboxAll = false;
        this.isSelectedRow[index] = false;
        this.popCheckboxActive(index);
      }
      this.setFocusCheckbox(index);
      this.clickCheckbox = true;
    },

    /**
     * Hàm thêm các index của chechkbox được tích vào mảng đánh dấu
     * @param {*} index vị trí của checkbox được tích của từng trang
     * @author (26/03/2023)
     */
    pushCheckboxActive(index){
      if(!this.checkboxActive[this.pageNumber]){
        this.checkboxActive[this.pageNumber] = [];
        this.entityCheckboxActive[this.pageNumber] = [];
      }
      const asset = this.assets[index-1];
      if(this.checkboxActive[this.pageNumber].indexOf(index) == -1){
        this.checkboxActive[this.pageNumber].push(index);
        this.entityCheckboxActive[this.pageNumber].push(asset);
      }
    },

    /**
     * Hàm loại bỏ các index của chechkbox vừa được bỏ tích ra khỏi mảng đánh dấu
     * @param {*} value vị trí của checkbox được tích của từng trang
     * @author (26/03/2023)
     */
    popCheckboxActive(value){
      // tìm vị trí của checkbox trong mảng đánh dấu
      const index = this.checkboxActive[this.pageNumber].indexOf(value);
      if(index != -1){
        // nếu tìm thấy thì xóa phần tử đó đi
        this.checkboxActive[this.pageNumber].splice(index,1);
        this.entityCheckboxActive[this.pageNumber].splice(index,1);
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

    /**
     * Hàm lấy ra số lượng checkbox có trạng thái là true trong table
     * @author LTVIET (15/03/2023)
     */
    getQuantityCheckbox(){
      let quantity = 0;
      for(let i=1; i < this.checkboxActive.length; i++){
        for(let j=0; j < this.checkboxActive[i].length; j++){
          quantity+=1;
        }
      }
      this.quantityCheckbox = quantity;
    },

    /**
     * Hàm lấy ra danh sách các đối tượng được chọn trong table
     * @author LTVIET (15/03/2023)
     */
    getItemSelected() {
      let entitiesCheckboxActive = [];
      for(let i=1; i<this.entityCheckboxActive.length;i++){
        for(let j=0;j<this.entityCheckboxActive[i].length;j++){
          entitiesCheckboxActive.push(this.entityCheckboxActive[i][j]);
        }
      }
      return entitiesCheckboxActive;
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
      this.indexCheckboxFocus = -1;
    },

    /**
     * Hàm set click vào checkbox
     * @param {*} index vị trí của checkbox muốn focus
     * @author LTVIET (29/03/2023)
     */
     setClickCheckbox(index){
      if(index == 0){
        this.markCheckboxAll();
      }else{
        this.markCheckbox(index);
      }
    }
  },

  created() {
    this.getApiFilter();
    // lấy api để load danh sách asset
    if (this.api) {
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
    pageSize: function (newValue) {
      this.pageNumber = 1;
      this.pageSize = newValue;
      this.loadData();
      this.$emit('handleEventLoadTable');
    },

    /**
     * Hàm theo dõi trạng thái checkbox trong table
     * @author LTVIET (15/03/2023)
     */
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
      this.$emit('handleEventLoadTable');
    },

    /** 
     * Hàm theo dõi id loại tài sản,
     * nếu có sự thay đổi thì gọi đến hàm loadData để gọi dữ liệu mới
     * @author LTVIET (15/03/2023)
     */
    assetCategoryId: function () {
      this.loadData();
    },

    /** 
     * Hàm theo dõi id phòng ban,
     * nếu có sự thay đổi thì gọi đến hàm loadData để gọi dữ liệu mới
     * @author LTVIET (15/03/2023)
     */
    departmentId: function () {
      this.loadData();
    },

    /** 
     * Hàm theo dõi từ khóa tìm kiếm,
     * nếu có sự thay đổi thì gọi đến hàm loadData để gọi dữ liệu mới
     * @author LTVIET (15/03/2023)
     */
    keyword: function(){
      this.loadData();
    }
  },
};
</script>

<style scoped>
@import url(./table.css);
</style>
