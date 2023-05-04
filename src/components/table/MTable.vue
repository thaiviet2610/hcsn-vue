<template>
  <!-- Khi table có dữ liệu phù hợp  -->
  <div v-if="dataBody.length == 0 && isShowNoData" class="content__table" :tabindex="-1" >
    <table  :key="keyTable"   style="border-bottom: none;box-shadow: none; height: 100%;"  >
      <!-- phần title của table  -->
      <thead>
        <tr>
          <th v-if="isCheckbox" class="column1 text-align-center">
            <MCheckbox 
              ref="mCheckbox_0"
              :disabled="true"
              style="cursor: unset;"
              idCheckbox="idCheckbox_0"
              :checked="checkboxAll"
              @addOnClick="markCheckboxAll"
              >
            </MCheckbox>
          </th>
          <th v-for="(itemHeader,indexHeader) in dataHeader" :key="indexHeader"
              :class="itemHeader.columnClass" style="position: relative;">
                <div style="cursor: default !important;">{{ itemHeader.title }}</div>
                <MTooltip
                    :text="itemHeader.tooltip"
                    :class="itemHeader.classTooltip"
                ></MTooltip>
          </th>
          <th v-if="isFunction" class="column11 text-align-center" :class="tableInfo.function.columnClass">{{ titleColumn.function }}</th>
        </tr>
      </thead>
      <!-- phần body của table  -->
      
      <tbody>
        <tr class="no-data" :class="{'no-data-no-footer':!isFooter}">
          <div class="icon-no-data"></div>
          <div class="text-no-data">{{ textNoData }}</div>
        </tr>

      </tbody>
      
      <!-- phần footer của table  -->
      
      <tfoot v-if="isFooter" class="footer-no-data">
          <td :colspan="tableInfo.footer.colspan" style="border: none;" >
            <div v-if="isPaging" class="content-footer__left">
              <div class="content-footer__item1">
                <div class="content-footer__item1--text" style="cursor: default !important;">
                  {{ contentFooterBefore }} <span style="font-family: Roboto-Bold"> {{ totalRecord }} </span> {{ contentFooterAfter }}
                </div>
              </div>
              <div class="dropdown_table">
                <MDropdown :valueInput="pageSize" :data="dataPageSize" @getValueDropdown="getValuePageSize"> </MDropdown>
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
            <div v-else class="footer-text"> Tổng cộng:</div>
          </td>
          <td v-for="(itemFooter,indexFooter) of dataFooter" :key="indexFooter" 
            class="footer_right" :class="tableInfo.footer.footerClass[indexFooter]" style="border: none;cursor: default !important;">
              {{ itemFooter }}
          </td>
          <td v-for="(itemEmpty,indexEmpty) of tableInfo.footer.columnEmpty" :key="indexEmpty" :class="itemEmpty.classColumn" style="border: none;"></td>
          <td v-if="isFunction" :class="tableInfo.function.columnClass" style="border: none;">
            <div class="function" style="visibility: hidden;">
              <div v-for="(itemFunction,indexFunction) in tableInfo.function.detail" :key="indexFunction">
                <MButtonIcon
                  :class="itemFunction.classIcon"
                >
                </MButtonIcon>
              </div>
            </div>
          </td>
      </tfoot>
    </table>
    
  </div>
  <div v-else class="content__table" :tabindex="isCheckbox ? 0:-1" @keyup="handleEventKeyUp" @keydown="handleEventKeyDown" >
    <table ref="mTable"  :key="keyTable"  style="border-bottom: none;box-shadow: none;"  >
      <!-- phần title của table  -->
      <thead>
        <tr>
          <th v-if="isCheckbox" class="column1 text-align-center">
            <MCheckbox 
              ref="mCheckbox_0"
              idCheckbox="idCheckbox_0"
              :checked="checkboxAll"
              @addOnClick="markCheckboxAll"
              >
            </MCheckbox>
          </th>
          <th v-for="(itemHeader,indexHeader) in dataHeader" :key="indexHeader"
              :class="itemHeader.columnClass" style="position: relative;">
                <div :id="`column_${indexHeader+1}`" style="min-width: max-content;cursor: default !important;">{{ itemHeader.title }}</div>
                <MTooltip
                    :text="itemHeader.tooltip"
                    :class="itemHeader.classTooltip"
                ></MTooltip>
          </th>
          <th v-if="isFunction" class="column11 text-align-center" :class="tableInfo.function.columnClass">{{ titleColumn.function }}</th>
        </tr>
      </thead>
      <!-- phần body của table  -->
      <tbody>
        <tr style="position: relative;"
          :ref="`mRow_${1+1}`"
          @contextmenu="handleEventClickRightMouse($event,index)"
          @dblclick="btnAddOnDblClickRowTable(index+1)"
          @click="addOnClickRowTable(index + 1)"
          
          v-for="(item, index) of dataBody"
          :key="index"
          :class="{
            row__selected: rowSelected[index+1]||checkbox[index+1],
          }"
        >
          <td v-if="isCheckbox" class="column1 text-align-center">
            <MCheckbox 
              :ref="`mCheckbox_${index+1}`"
              :idCheckbox="`idCheckbox_${index+1}`"
              :checked="checkbox[index + 1]"
              @addOnClick="markCheckbox(index + 1)"
              v-outside="handleEventClickOutsideCheckbox"
              >
            </MCheckbox>
          </td>
          <td v-for="(itemBody,indexBody) in item" :key="indexBody"
              :class="tableInfo.bodyClass[indexBody]">{{ itemBody }}
          </td>
          <td v-if="isFunction" :class="tableInfo.function.columnClass" >
            <div class="function" :style="styleFunction(index + 1)">
              <div v-for="(itemFunction,indexFunction) in tableInfo.function.detail" :key="indexFunction">
                <MButtonIcon
                  :class="itemFunction.classIcon"
                  @addOnClickBtnIcon="
                    handleEventClickFunction(itemFunction.type, index)
                  "
                >
                </MButtonIcon>
                <MTooltip
                    :text="itemFunction.tooltip"
                    :class="itemFunction.classTooltip"
                ></MTooltip>
              </div>
            </div>
          </td>
        </tr>

      </tbody>
      
      <!-- phần footer của table  -->
      
      
    </table>
    <table v-if="isFooter" :key="keyTable" style="position: sticky;bottom: 0; border-top: 1px solid #cccccc ;">
      <tfoot >
          <td class="footer_left" :class="tableInfo.footer.pagingClass" style="border: none;" >
            <div v-if="isPaging" class="content-footer__left">
              <div class="content-footer__item1">
                <div class="content-footer__item1--text" style="cursor: default !important;">
                  {{ contentFooterBefore }} <span style="font-family: Roboto-Bold"> {{ totalRecord }} </span> {{ contentFooterAfter }}
                </div>
              </div>
              <div class="dropdown_table">
                <MDropdown :valueInput="pageSize" :data="dataPageSize" @getValueDropdown="getValuePageSize"> </MDropdown>
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
            <div v-else class="footer-text"> Tổng cộng:</div>
          </td>
          <td v-for="(itemFooter,indexFooter) of dataFooter" :key="indexFooter" 
            class="footer_right" :class="tableInfo.footer.footerClass[indexFooter]" style="border: none;cursor: default !important;" >
              {{ itemFooter }}
          </td>
          <td v-for="(itemEmpty,indexEmpty) of tableInfo.footer.columnEmpty" :key="indexEmpty" :class="itemEmpty.classColumn" style="border: none;"></td>
          <td v-if="isFunction" :class="tableInfo.function.columnClass" style="border: none;">
            <div class="function" style="visibility: hidden;">
              <div v-for="(itemFunction,indexFunction) in tableInfo.function.detail" :key="indexFunction">
                <MButtonIcon
                  :class="itemFunction.classIcon"
                >
                </MButtonIcon>
              </div>
            </div>
          </td>
      </tfoot>
    </table>
    
  </div>
  
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
    v-if="isContextMenu"
    v-show="isShowContextMenu"
    :data="tableInfo.contextMenu.data"
    :pageX="contextMenuPageX"
    :pageY="contextMenuPageY"
    :width="tableInfo.contextMenu.width"
    :height="tableInfo.contextMenu.height"
    :key="keyContextMenu"
    :entity="contextMenuEnity"
    @addOnClickItem="addOnClickItemContextMenu"
    >
  </MContextMenu>

</template>

<script>
import commonJS from "@/js/common.js";
import resourceJS from "@/js/resource.js";
import MContextMenu from "../contextMenu/MContextMenu.vue";
import enumJS from '@/js/enum.js';
export default {
name: "MTable",
components: {
  MContextMenu
},
props: {
  /**
   * các thông tin của table
   * @author LTVIET (01/04/2023)
   */
  tableInfo:{
    type: [Object,Array],
    default: null
  },
  /**
   * danh sách các kích thước của số bản ghi trong 1 trang
   * @author LTVIET (01/04/2023)
   */
  dataPageSize:{
    type: Array,
    default: null
  },
  /**
   * dữ liệu phần header của table
   * @author LTVIET (01/04/2023)
   */
  dataHeader: {
    type: [Object,Array],
    default: null
  },
  /**
   * dữ liệu đầy đủ của danh sách các đối tượng của table
   * @author LTVIET (01/04/2023)
   */
  dataEntities:{
    type: [Object,Array],
    default: null
  },
  /**
   * danh sách dữ liệu cần hiển thị của các đối tượng của table
   * @author LTVIET (01/04/2023)
   */
  dataBody: {
    type: [Object,Array],
    default: null
  },
  /**
   * danh sách dữ liệu của phần footer table
   * @author LTVIET (01/04/2023)
   */
  dataFooter: {
    type: [Object,Array],
    default: null
  },
  /**
   * trạnh thái phân trang của table(true: có phân trang,false: không có phân trang)
   * @author LTVIET (01/04/2023)
   */ 
  isPaging:{
    type: Boolean,
    default: true
  },
  /**
   * trạnh thái checkbox của table(true: có checkbox,false: không có checkbox)
   * @author LTVIET (01/04/2023)
   */ 
  isCheckbox:{
    type: Boolean,
    default: true
  },
  /**
   * trạnh thái chức năng của table(true: có chức năng,false: không có chức năng)
   * @author LTVIET (01/04/2023)
   */ 
  isFunction:{
    type: Boolean,
    default: true
  },
  /**
   * trạnh thái footer của table(true: có footer,false: không có footer)
   * @author LTVIET (01/04/2023)
   */ 
  isFooter:{
    type: Boolean,
    default: true
  },
  isContextMenu:{
    type: Boolean,
    default: false
  },
  /**
   * số bản ghi trong 1 trang của table truyền từ ngoài vào khi khởi tạo table
   * @author LTVIET (01/04/2023)
   */
  valuePageSize:{
    type: Number,
    default: 0
  },
  /**
   * vị trí cả trang hiện trong 1 trang của table truyền từ ngoài vào khi khởi tạo table
   * @author LTVIET (01/04/2023)
   */
  valuePageNumber:{
    type: Number,
    default: 0
  },
  isShowNoData:{
    type: Boolean,
    default: false
  }
},
data() {
  return {
    /**
     * trạng thái của checkbox all
     * @author LTVIET (01/03/2023)
     */
    checkboxAll: false,
    /**
     * danh sách chứa trạng thái của checkbox
     * @author LTVIET (01/03/2023)
     */
    checkbox: [],
    /**
     * danh sách chứa vị trí của các checkbox được chọn
     * @author LTVIET (01/03/2023)
     */
    checkboxActive: [],
    /**
     * danh sách chứa thông tin của các đối tượng có checkbox được chọn
     * @author LTVIET (01/03/2023)
     */
    entityCheckboxActive:[],
    /**
     * vị trí của checkbox được chọn gần nhất
     * @author LTVIET (01/03/2023)
     */
    indexCheckbox: -1,
    isShowLoad: false,
    isShowDialogNotifyLoadError: false,
    contentDialogNotifyLoadError: "",
    /**
     * số bản ghi trong 1 trang
     * @author LTVIET (01/03/2023)
     */
    pageSize: 0,
    /**
     * vị trí của trang hiện tại
     * @author LTVIET (01/03/2023)
     */
    pageNumber: 1,
    /**
     * tổng số trang theo phân trang
     * @author LTVIET (01/03/2023)
     */
    totalPage: 0,
    clickCheckbox: false,
    isShowContextMenu: false, 
    contentFooterBefore: this.tableInfo.contentFooterBefore,
    contentFooterAfter: this.tableInfo.contentFooterAfter,
    notitfyNoDataTable: this.tableInfo.noDataTable,
    contextMenuPageX: 0,
    contextMenuPageY: 0,
    keyContextMenu: 0,
    contextMenuEnity: null,
    // isShowNoData: false,
    previousKeyShift: false,
    previousKeyCtrl: false,
    /**
     * vị trí checkbox bắt đầu của danh sách đối tượng cần xóa nhiều
     * @author LTVIET (01/03/2023)
     */
    indexDeleteStart: 0,
    /**
     * vị trí checkbox kết thúc của danh sách đối tượng cần xóa nhiều
     * @author LTVIET (01/03/2023)
     */
    indexDeleteEnd: 0,
    btnDialogNotify: resourceJS.buttonDialog.notify,
    keyTable: 0,
    titleColumn: this.tableInfo.titleColumm,
    
    /**
     * danh sách chứa dữ liệu tổng của các cột trong footer
     * @author LTVIET (01/03/2023)
     */
    totalFooter: [],
    /**
     * danh sách chứa trạng thái của các dòng trong table
     * @author LTVIET (01/03/2023)
     */
    rowSelected: [],
    /**
     * vị trí của dòng đang được chọn
     * @author LTVIET (01/03/2023)
     */
    indexRowSelected: 0,
    /**
     * tổng số bản ghi của danh sách trong table
     * @author LTVIET (01/03/2023)
     */
    totalRecord: 0,
    clickFunction: false,
    textNoData: resourceJS.table.noDataTable,
    isDblClick: true,
    isClickRow: []
  };
},
created() {
  this.getUnitData();
  if(this.pageSize){
    for(let i=0;i<=this.pageSize;i++){
      this.checkbox[i] = false;
      this.rowSelected[i] = false;
      this.isClickRow[i] = true;
    }
  }
},



computed: {
},
mounted() {
  document.addEventListener('click',this.handleEventCloseContextMenu);
},
unmounted() {
  document.removeEventListener('click',this.handleEventCloseContextMenu);
},
methods: {
  /**
   * Hàm xử lý sự kiện click chuột trái ra ngoài contextmenu thì sẽ ẩn đi contextment
   * @author LTVIET (16/04/2023)
   */
  handleEventCloseContextMenu(){
    this.isShowContextMenu = false;
  },
  /**
   * Hàm xử lý sự kiện click vào 1 item trong contextmenu
   * @param {*} values dữ liệu được truyền vào (item,index)
   * @author LTVIET (24/03/2023)
   */
  addOnClickItemContextMenu(values){
    let type = values[0];
    let item = values[1];
    if(type == enumJS.type.add){
      this.$emit("addOnClickContextMenu",[item,type]);
    }else{
      this.handleEventClickFunction(type,item.index-1);
    }
  },

  /**
   * Hàm xử lý sự kiện click chuột phải vào từng dòng của table
   * @param {*} event Đối tượng sự kiện cần xử lý
   * @param {*} index Vị trí của đối tượng dữ liệu của dòng vừa click
   * @author LTVIET (24/03/2023)
   */
  handleEventClickRightMouse(event,index){
      if(this.isContextMenu){
        event.preventDefault();
        const item = this.dataEntities[index];
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
        this.indexRowSelected = item.index - this.pageSize*(this.pageNumber-1);
        this.rowSelected.fill(false);
        this.rowSelected[this.indexRowSelected] = true;
        this.keyContextMenu=++this.keyContextMenu;
      }
  },

  /**
   * Hàm xử lý sự kiện khi click ra ngoài checkbox
   * @author LTVIET (02/03/2023)
   */
  handleEventClickOutsideCheckbox(){
    this.isDblClick = true;
  },

  /**
   * Hàm xử lý sự kiện chọn dòng của table
   * @param {*} index vị trí của dòng muốn chọn
   * @author LTVIET (02/03/2023)
   */
  selectedRowTable(index){
    this.indexRowSelected = index;
    this.rowSelected.fill(false);
    this.rowSelected[this.indexRowSelected] = true;
    this.$emit('getItemRowSelected',this.dataEntities[index-1]);
  },

  /**
   * Hàm khởi tạo các giá trị ban đầu cho table
   * @author LTVIET (02/03/2023)
   */
  getUnitData(){
    this.reloadTable();
    if(this.isPaging){
      this.pageSize = this.valuePageSize;
      this.pageNumber = this.valuePageNumber;
      this.getTotalPage();
    }
    // Đặt lại các giá trị của table về mặc định ban đầu
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
  },

  /**
   * Hàm tính tổng số trang của table
   * @author LTVIET (15/03/2023)
   */
  getTotalPage() {
    this.totalPage = this.totalRecord / this.pageSize;
    this.totalPage = Math.ceil(this.totalPage);
    if(!this.totalPage){
      this.totalPage = 1;
    }
  },

  /**
   * Hàm format lại định dạng tiền
   * @param {*} value giá trị cần format
   * @param {*} type loại định dạng muốn format
   * @author LTVIET (02/03/2023)
   */
  formatValue(value, type) {
    if (type == enumJS.typeValue.number) {
      value = Math.round(value);
      return commonJS.formatNumber(value);
    } else if (type == enumJS.typeValue.date) {
      return commonJS.formatDate(value,"",resourceJS.date.format.ddMMyyyy);
    }
    return value;
  },

  /**
   * Hàm xử lý sự kiện click chức năng(sửa hoặc nhân bản) của table
   * @param {*} title tiêu đề form (sửa tài sản hoặc nhân bản tài sản)
   * @param {*} index vị trí của đối tượng cần xử lý trong danh sách
   * @author LTVIET (02/03/2023)
   */
  handleEventClickFunction(type, index) {
    this.clickFunction = true;
    const item = this.dataEntities[index];
    this.$emit("btnClickFunctionOpenForm", [type, item]);
  },

  /**
   * Hàm chuyển kiều danh sách 2 chiều thành 1 chiều
   * @author LTVIET (26/03/2023)
   */
  getEntityCheckboxActiveList(){
    let list = [];
    for(let i=1; i<=this.totalPage;i++){
      if(this.entityCheckboxActive[i]){
        for (const item of this.entityCheckboxActive[i]) {
          list.push(item);
        }
      }
    }
    return list;
  },

  /**
   * Hàm xử lý sự kiện double click 1 dòng của table
   * @param {*} index vị trí dòng của table được dblclick
   * @author LTVIET (02/03/2023)
   */
  btnAddOnDblClickRowTable(index) {
    if(this.isDblClick){
      this.handleEventClickFunction(enumJS.type.edit,index-1);
      this.isClickRow[index] = true;
    }
  },

  /**
   * Hàm xử lý sự kiện click 1 dòng của table
   * @param {*} index vị trí dòng của table được click
   * @author LTVIET (02/03/2023)
   */
  addOnClickRowTable(index) {
    if(this.isClickRow[index]){
      if(this.previousKeyShift){
        this.handleEventKeyStrokesShift(index);
      }else if (!this.clickCheckbox) {
        if(!this.previousKeyCtrl){
          this.rowSelected.fill(false);
          this.rowSelected[index] = this.clickFunction ? true : (index != this.indexRowSelected);
          this.indexRowSelected = this.rowSelected[index] ? index : 0;
        }
        else{
          this.markCheckbox(index);
        }
        this.indexDeleteStart = index;
      }
      this.clickCheckbox = false;

      if(this.rowSelected[index] || this.checkbox[index]){
        this.$emit('getItemRowSelected',this.dataEntities[index-1]);
      }
      if(!this.rowSelected[index]){
        const listEntityActive = this.getEntityCheckboxActiveList();
        const listEntityActiveLength = listEntityActive.length;
        if(listEntityActiveLength == 0){
          this.$emit('getItemRowSelected',null);
        }else{
          this.$emit('getItemRowSelected',listEntityActive[listEntityActiveLength - 1]);
        }
      }
      this.clickFunction = false;
      this.isClickRow[index] = false;
    }
    setTimeout(() => {
      this.isClickRow[index] = true;
    }, 1000);
  },

  /**
   * Hàm xử lý sự kiện khi nhấn giữa phím shift và click vào dòng table để chọn nhiều
   * @param {*} index vị trí được click của dòng trong table
   * @author LTVIET (29/03/2023)
   */
  handleEventKeyStrokesShift(index){
    if(this.isCheckbox){
      if(this.indexDeleteStart == 0){
          this.indexDeleteStart = index;
      }
      this.indexDeleteEnd = index;
      if(this.indexDeleteStart <= this.indexDeleteEnd){
        for(let i = this.indexDeleteStart; i<= this.indexDeleteEnd; i++){
          this.markCheckbox(i,true);
        }
      }else{
        for(let i = this.indexDeleteEnd; i<= this.indexDeleteStart; i++){
          this.markCheckbox(i,true);
        }
      }
    }
    this.previousKeyCtrl = false;
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
    
    if(this.indexRowSelected > 0){
      let index = (this.indexRowSelected - 1) > 0 ? (this.indexRowSelected - 1) : 1;
      this.rowSelected.fill(false);
      this.rowSelected[index] = true;
      this.indexRowSelected = index;
    }
    else if(this.indexCheckbox > 0){
      this.markCheckbox(this.indexCheckbox,false);
      let index = (this.indexCheckbox - 1) > 0 ? (this.indexCheckbox - 1) : 1;
      this.markCheckbox(index,true);
    }
  },

  /**
   * Hàm xử lý sự kiện bấm phím xuống 
   * @author LTVIET (01/04/2023)
   */
  handleEventKeyArrowDown(){
    if(this.indexRowSelected > 0){
      let index = (this.indexRowSelected + 1) > this.pageSize ? this.pageSize : (this.indexRowSelected + 1);
      this.rowSelected.fill(false);
      this.rowSelected[index] = true;
      this.indexRowSelected = index;
    }
    else if(this.indexCheckbox > 0){
      this.markCheckbox(this.indexCheckbox,false);
      let index = (this.indexCheckbox + 1) > this.pageSize ? this.pageSize : (this.indexCheckbox + 1);
      this.markCheckbox(index,true);
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
  markCheckboxAll(value) {
    //1. set giá trị của checkboxAll: false-->true hoặc true-->false
    if(value != undefined){
      this.checkboxAll  = value;
    }else{
      this.checkboxAll = !this.checkboxAll;
    }
    if (this.checkboxAll) {
      //2.1. nếu checkboxAll = true
      //--> gán giá trị true cho tất cả cac checkbox
      for(let i = 1;i<=this.pageSize;i++){
        this.pushCheckboxActive(i);
      }
      this.$emit('getItemRowSelected',this.dataEntities[this.dataBody.length-1]);
    } else {
      //2.2. nếu checkboxAll = false
      //--> gán giá trị false cho tất cả cac checkbox
      this.resetCheckbox();
      this.$emit('getItemRowSelected',null);
    }
    this.checkbox.fill(this.checkboxAll);
    this.$emit('getQuantityItemSelected',this.getQuantityItemSelected());
    this.indexCheckbox = -1;
    this.clickCheckbox = false;
    this.setFocusCheckbox(0);
  },

  /**
   * Hàm đếm số lượng đối tượng được chọn trong table
   * @author LTVIET (16/03/2023)
   */
  getQuantityItemSelected(){
    const items = this.getItemSelected();
    return items.length;
  },

  /**
   * Hàm xử lý chuyển hết danh sách checkbox của trang hiện tại về false
   * @author LTVIET (16/03/2023)
   */
  resetCheckbox(){
    this.checkbox.fill(false);
    this.checkboxActive[this.pageNumber] = [];
    this.entityCheckboxActive[this.pageNumber] = [];
    this.clickCheckbox = false;
    this.indexCheckbox = -1;
  },

  /**
   * Hàm set focus vào checkbox 
   * @param {*} index vị trí của checkbox
   * @author LTVIET (26/03/2023)
   */
  setFocusCheckbox(index){
    if(this.tableInfo.isCheckbox){
      if(index == 0){
        this.$refs["mCheckbox_0"].setFocus();
        
      }else if(index > 0){

        this.$refs[`mCheckbox_${index}`][0].setFocus();
      }
    }
  },

  /**
   * Hàm xử lý sựu kiện khi click vào checkbox
   * @param {*} index vị trí dòng của checkbox trong table
   * @author LTVIET (04/03/2023)
   */
  markCheckbox(index,value) {
    this.rowSelected.fill(false);
    this.indexRowSelected = 0;
    //1. set giá trị của checkbox: false-->true hoặc true-->false
    if(value != undefined){
      this.checkbox[index] = value;
    }else{
      this.checkbox[index] = !this.checkbox[index];
    }
    if (this.checkbox[index]) {
      //2.1. nếu checkbox = true thì gán index cho indexCheckbox
      this.indexCheckbox = index;
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
      this.popCheckboxActive(index);
    }
    this.$emit('getQuantityItemSelected',this.getQuantityItemSelected());
    this.setFocusCheckbox(index);
    this.clickCheckbox = true;
    this.isDblClick = false;
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
    const entity = this.dataEntities[index-1];
    if(this.checkboxActive[this.pageNumber].indexOf(index) == -1){
      this.checkboxActive[this.pageNumber].push(index);
      this.entityCheckboxActive[this.pageNumber].push(entity);
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
   * Hàm xử lý sự kiện lấy giá trị pageSize mới khi chọn trong dropdown
   */
  getValuePageSize(value){
    this.pageSize = value;
    this.indexRowSelected = 0;
    this.rowSelected.fill(false);
    this.$emit('getValuePageSize',this.pageSize);
  },

  /**
   * Hàm lấy ra danh sách các đối tượng được chọn trong table
   * @author LTVIET (15/03/2023)
   */
  getItemSelected() {
    let entitiesCheckboxActive = [];
    for(let i=1; i<this.entityCheckboxActive.length;i++){
      if(this.entityCheckboxActive[i]){
        for(let j=0;j<this.entityCheckboxActive[i].length;j++){
          entitiesCheckboxActive.push(this.entityCheckboxActive[i][j]);
        }
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
    if (this.checkbox[index] || this.rowSelected[index]) {
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
    this.indexRowSelected = 0;
    this.rowSelected.fill(false);
    this.$emit('getValuePageNumber',this.pageNumber);
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
    this.$emit('getValuePageNumber',this.pageNumber);
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
    this.$emit('getValuePageNumber',this.pageNumber);
  },

  /**
   * Hàm set tất cả trạng thái của table về lại ban đầu;
   * @author LTVIET (26/03/2023)
   */
  reloadTable(){
    this.checkbox.fill(false);
    this.checkboxAll = false;
    this.indexCheckbox = -1;
    this.clickCheckbox = false;
    this.indexDeleteStart = 0;
    this.indexDeleteEnd = 0;
  },
},

};
</script>

<style scoped>
@import url(./table.css);
</style>

