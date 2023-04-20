<template>
  <div  class="table" ref="mTable" style="position: relative; overflow: auto;">
    <!-- Khi table có dữ liệu phù hợp  -->
    <div class="content__table">
      <table ref="table1" class="ab" :key="keyTable"  style="border-bottom: none;box-shadow: none;height: 100%;position: absolute;top:0;" >
        <thead>
          <tr>
            <th v-if="tableInfo.isCheckbox" class="column1 text-align-center">
              <MCheckbox 
                ref="mCheckbox_0"
                idCheckbox="idCheckbox_0"
                :checked="checkboxAll"
                @addOnClick="markCheckboxAll"
                >
              </MCheckbox>
            </th>
            <th v-for="(itemHeader,indexHeader) in tableInfo.header" :key="indexHeader"
                :class="itemHeader.columnClass" :data_tooltip_bottom="itemHeader.tooltip">{{ itemHeader.title }}
            </th>
            <th class="column11 text-align-center">{{ titleColumn.function }}</th>
          </tr>
        </thead>
        <!-- phần body của table  -->
        <tbody>
          <tr>
            <td style="border-bottom: none;"></td>
          </tr>
        </tbody>
        
        <!-- phần footer của table  -->
        <tfoot v-if="!check">
            <td :colspan="tableInfo.footer.colspan" style="border: none;">
              <div v-if="tableInfo.footer.isPaging" class="content-footer__left">
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
            <td v-for="(itemFooter,indexFooter) in tableInfo.footer.total" :key="indexFooter" 
              class="footer_right" :class="itemFooter.columnClass" style="border: none;">
                {{ formatValue(totalFooter[indexFooter],itemFooter.typeValue) }}
            </td>
            <td v-for="(item,indexEmpty) in tableInfo.footer.quantityColumnEmpty" :key="indexEmpty" style="border: none;"></td>
            <td v-if="tableInfo.isFunction" :class="tableInfo.function.columnClass" style="transform: scale(0);border: none;" >
              <div class="function">
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
      <table ref="table2"  :key="keyTable"  style="border-bottom: none;box-shadow: none;" >
        <!-- phần title của table  -->
        <thead>
          <tr>
            <th v-if="tableInfo.isCheckbox" class="column1 text-align-center">
              <MCheckbox 
                ref="mCheckbox_0"
                idCheckbox="idCheckbox_0"
                :checked="checkboxAll"
                @addOnClick="markCheckboxAll"
                >
              </MCheckbox>
            </th>
            <th v-for="(itemHeader,indexHeader) in tableInfo.header" :key="indexHeader"
                :class="itemHeader.columnClass" style="position: relative;">
                  <div :id="`column_${indexHeader+1}`" style="min-width: max-content;">{{ itemHeader.title }}</div>
                  <MTooltip
                      :text="itemHeader.tooltip"
                      :class="itemHeader.classTooltip"
                  ></MTooltip>
            </th>
            
            
            <th class="column11 text-align-center" style="min-width: max-content;">{{ titleColumn.function }}</th>
          </tr>
        </thead>
        <!-- phần body của table  -->
        <tbody @keyup="handleEventKeyUp" @keydown="handleEventKeyDown">
          <tr style="position: relative;"
            :ref="`mRow_${index+1}`"
            @contextmenu="handleEventClickRightMouse($event,item)"
            @dblclick="btnAddOnDblClickRowTable(item,index+1)"
            @click="addOnClickRowTable(index + 1)"
            
            v-for="(item, index) of this.assets"
            :key="index"
            :class="{
              row__selected: rowSelected[index+1]||checkbox[index+1],
            }"
          >
            <td v-if="tableInfo.isCheckbox" class="column1 text-align-center">
              <MCheckbox 
                :ref="`mCheckbox_${index+1}`"
                :idCheckbox="`idCheckbox_${index+1}`"
                :checked="checkbox[index + 1]"
                @addOnClick="markCheckbox(index + 1)"
                >
              </MCheckbox>
            </td>
            <td v-for="(itemBody,indexBody) in tableInfo.body" :key="indexBody"
                :class="itemBody.columnClass">{{ formatValue(item[itemBody.propName], itemBody.typeValue) }}
            </td>
            <td v-if="tableInfo.isFunction" :class="tableInfo.function.columnClass" >
              <div class="function" :style="styleFunction(index + 1)">
                <div v-for="(itemFunction,indexFunction) in tableInfo.function.detail" :key="indexFunction">
                  <MButtonIcon
                    :class="itemFunction.classIcon"
                    @addOnClickBtnIcon="
                      handleEventClickFunction(itemFunction.type, item)
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
        <tfoot v-if="check">
            <td :colspan="tableInfo.footer.colspan" style="border: none;">
              <div v-if="tableInfo.footer.isPaging" class="content-footer__left">
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
            <td v-for="(itemFooter,indexFooter) in tableInfo.footer.total" :key="indexFooter" 
              class="footer_right" :class="itemFooter.columnClass" style="border: none;">
                {{ formatValue(totalFooter[indexFooter],itemFooter.typeValue) }}
            </td>
            <td v-for="(item,indexEmpty) in tableInfo.footer.quantityColumnEmpty" :key="indexEmpty" style="border: none;"></td>
            <td v-if="tableInfo.isFunction" :class="tableInfo.function.columnClass" style="border: none;">
              <div class="function" style="transform: scale(0);">
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
import configJS from '@/js/config';
export default {
  name: "MBase",
  components: {
    MContextMenu
  },
  props: {
    api: {
      type: String,
      default: "",
    },
    dataBodyApi:{
      type: [Object,Array,String,Number],
      default: null
    },
    tableInfo:{
      type: [Object,Array],
      default: null
    },
    dataPageSize:{
      type: [Array],
      default: null
    },
    dataTable: {
      type: [Object,Array],
      default: null
    },
    
  },
  data() {
    return {
      assets: [],
      checkboxAll: false,
      checkbox: [],
      checkboxActive: [],
      entityCheckboxActive:[],
      indexCheckbox: -1,
      isShowLoad: false,
      isShowDialogNotifyLoadError: false,
      contentDialogNotifyLoadError: "",
      pageSize: Number(this.dataPageSize[0]),
      pageNumber: 1,
      totalRecord: 0,
      totalPage: 0,
      clickFunction: false,
      clickCheckbox: false,
      isShowContextMenu: false,
      dataContextMenu: resourceJS.table.tableAsset.dataContextMenu,
      contentFooterBefore: resourceJS.table.tableAsset.contentFooterBefore,
      contentFooterAfter: resourceJS.table.tableAsset.contentFooterAfter,
      notitfyNoDataTable: resourceJS.table.tableAsset.noDataTable,
      contextMenuPageX: 0,
      contextMenuPageY: 0,
      keyContextMenu: 0,
      contextMenuEnity: null,
      previousKeyShift: false,
      previousKeyCtrl: false,
      indexDeleteStart: 0,
      indexDeleteEnd: 0,
      btnDialogNotify: resourceJS.buttonDialog.notify,
      keyTable: 0,
      titleColumn: resourceJS.table.tableAsset.titleColumm,
      widthContextMenu: 156,
      heightContextMenu: 152,
      totalFooter: [],
      rowSelected: [],
      indexRowSelected: 0,
      check:true,
    };
  },
  updated() {
    if(this.$refs["table1"]){
      let a = this.$refs["table1"].offsetHeight;
      let b = this.$refs["table2"].offsetHeight;
      if(a>b){
        this.check = false;
      }else{
        this.check = true;
      }
    }
  },
  created() {
    
    // lấy api để load danh sách asset
    if (this.api) {
      this.loadData();
    }else{
      this.totalFooter = this.dataTable.footer.total;
      this.getUnitData(this.dataTable);
    }
    for(let i=0;i<=this.pageSize;i++){
      this.checkbox[i] = false;
      this.rowSelected[i] = false;
    }
  },



  computed: {
  },
  mounted() {
    document.addEventListener('click',this.handleEventCloseContextMenu);
    if(this.$refs["table1"]){
      let a = this.$refs["table1"].offsetHeight;
      let b = this.$refs["table2"].offsetHeight;
      if(a>b){
        this.check = false;
      }else{
        this.check = true;
      }
    }
  },
  unmounted() {
    document.removeEventListener('click',this.handleEventCloseContextMenu);
  },
  methods: {
    abc(){
      console.log(1);
    },
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
        this.handleEventClickFunction(type,item);
      }
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
        this.indexRowSelected = item.index - this.pageSize*(this.pageNumber-1);
        this.rowSelected[this.indexRowSelected] = true;
        this.keyContextMenu=++this.keyContextMenu;
    },

    /**
     * Hàm nhận dữu liệu truyền vào từ bên ngoài và chuyển thanh api filter
     * @author LTVIET (02/03/2023)
     */
    getApiFilter(){
      let api = this.api.replace("{0}",this.pageSize);
      api = api.replace("{1}",this.pageNumber);
      return api;
    },

    /**
     * Hàm xử lý sự kiện gọi api load dữ liệu mTable
     * @author LTVIET (02/03/2023)
     */
    loadData() {
      
      
      this.isShowLoad = true;
      let api = this.getApiFilter();
      if(this.tableInfo.http == configJS.http.get){
        axios
        .get(api,this.dataBodyApi)
        .then( (res) => {
          // Lấy dữ liệu ra gán vào các biến
          this.totalFooter = [];
          if(this.tableInfo.footer.total){
            for (let item of this.tableInfo.footer.total) {
              this.totalFooter.push(res.data[item.propName]);
            }
          }
          this.getUnitData(res.data);
          
        })
        .catch((error) => {
          console.log(error);
          this.isShowLoad = false;
          this.isShowDialogNotifyLoadError = true;
          this.contentDialogNotifyLoadError = resourceJS.errorMsg.errorLoadDataTable;
        });
      }else if(this.tableInfo.http == configJS.http.post){
        axios
        .post(api,this.dataBodyApi)
        .then( (res) => {
          // Lấy dữ liệu ra gán vào các biến
          this.totalFooter = [];
          if(this.tableInfo.footer.total){
            for (let item of this.tableInfo.footer.total) {
              this.totalFooter.push(res.data[item.propName]);
            }
          }
          this.getUnitData(res.data);
          
        })
        .catch((error) => {
          console.log(error);
          this.isShowLoad = false;
          this.isShowDialogNotifyLoadError = true;
          this.contentDialogNotifyLoadError = resourceJS.errorMsg.errorLoadDataTable;
        });
      }
    },

    getUnitData(value){
      this.assets =  value.Data;
      this.totalRecord =  value.TotalRecord;
      
      
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
    },

    /**
     * Hàm tính tổng số trang của table
     * @author LTVIET (15/03/2023)
     */
    getTotalPage() {
      this.pageSize = Number(this.pageSize);
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
        return commonJS.formatDate(value);
      }
      return value;
    },

    /**
     * Hàm xử lý sự kiện click chức năng(sửa hoặc nhân bản) của table
     * @param {*} title tiêu đề form (sửa tài sản hoặc nhân bản tài sản)
     * @param {*} item đối tượng cần xử lý
     * @author LTVIET (02/03/2023)
     */
    handleEventClickFunction(type, item) {
      
      let quantityCheckbox = this.entityCheckboxActive[this.pageNumber].length;
      if(!(type == enumJS.type.delete && quantityCheckbox > 1)){
        this.addOnClickRowTable(item.index);
      }
      this.clickFunction = true;
      this.$emit("btnClickFunctionOpenForm", [type, item.fixed_asset_id]);
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
     * @param {*} item dòng của table được dblclick
     * @param {*} index vị trí dòng của table được dblclick
     * @author LTVIET (02/03/2023)
     */
    btnAddOnDblClickRowTable(item) {
      this.handleEventClickFunction(enumJS.type.edit,item);
      // this.$emit("btnDblClickRow", item.fixed_asset_id);
    },

    /**
     * Hàm xử lý sự kiện click 1 dòng của table
     * @param {*} index vị trí dòng của table được click
     * @author LTVIET (02/03/2023)
     */
    addOnClickRowTable(index) {
      if(this.tableInfo.isCheckbox){
        if(this.previousKeyShift){
          this.handleEventKeyStrokesShift(index);
        }else if (!this.clickCheckbox && !this.clickFunction) {
          if(!this.previousKeyCtrl){
            this.rowSelected.fill(false);
            this.rowSelected[index] = (index != this.indexRowSelected);
            this.indexRowSelected = this.rowSelected[index] ? index : 0;
          }
          else{
            this.markCheckbox(index);
          }
          this.indexDeleteStart = index;
        }
        this.clickCheckbox = false;
        this.clickFunction = false;
      }
    },

    /**
     * Hàm xử lý sự kiện khi nhấn giữa phím shift và click vào dòng table để chọn nhiều
     * @param {*} index vị trí được click của dòng trong table
     * @author LTVIET (29/03/2023)
     */
    handleEventKeyStrokesShift(index){
      if(this.tableInfo.isCheckbox){
        if(this.indexDeleteStart == 0){
            this.indexDeleteStart = index;
        }
        this.indexDeleteEnd = index;
        this.resetCheckbox();
        // table.checkbox.fill(false);
        if(this.indexDeleteStart <= this.indexDeleteEnd){
            for(let i = this.indexDeleteStart; i<= this.indexDeleteEnd; i++){
              this.markCheckbox(i,true);
              this.pushCheckboxActive(i);
            }
        }else{
            for(let i = this.indexDeleteEnd; i<= this.indexDeleteStart; i++){
              this.markCheckbox(i,true);
              this.pushCheckboxActive(i);
            }
        }
      }
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
      if(this.indexCheckbox > 0){
        let index = (this.indexCheckbox - 1) > 0 ? (this.indexCheckbox - 1) : 1;
        this.resetCheckbox();
        this.markCheckbox(index,true);
      }
    },

    /**
     * Hàm xử lý sự kiện bấm phím xuống 
     * @author LTVIET (01/04/2023)
     */
    handleEventKeyArrowDown(){
      if(this.indexCheckbox > 0){
        let index = (this.indexCheckbox + 1) > this.pageSize ? this.pageSize : (this.indexCheckbox + 1);
        this.resetCheckbox();
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
      } else {
        //2.2. nếu checkboxAll = false
        //--> gán giá trị false cho tất cả cac checkbox
        this.resetCheckbox();
      }
      this.checkbox.fill(this.checkboxAll);
      this.indexCheckbox = -1;
      this.clickCheckbox = false;
      this.clickFunction = false;
      this.setFocusCheckbox(0);
    },

    /**
     * Hàm xử lý chuyển hết danh sách checkbox của trang hiện tại về false
     * @author LTVIET (16/03/2023)
     */
    resetCheckbox(){
      this.checkbox.fill(false);
      this.checkboxActive[this.pageNumber] = [];
      this.entityCheckboxActive[this.pageNumber] = [];
      this.clickFunction = false;
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
      this.checkboxAll = false;
      this.indexCheckbox = -1;
      this.clickCheckbox = false;
      this.clickFunction = false;
      this.indexDeleteStart = 0;
      this.indexDeleteEnd = 0;
    },
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
     * Hàm theo dõi số trang hiện tại (pageNumber),
     * nếu có sự thay đổi thì gọi đến hàm loadData để gọi dữ liệu mới
     * @author LTVIET (15/03/2023)
     */
    pageNumber: function () {
      this.loadData();
      this.$emit('handleEventLoadTable');
    },

    api: function(){
      this.loadData();
      
    },
  },
  
};
</script>

<style scoped>
@import url(./table.css);
.ab::-webkit-scrollbar {
    height: 4px;
    width: 2px;
}
</style>

