<template>
    <div class="table">
        <table  class="content__table"  >
      <!-- phần title của table  -->
      <thead>
        <tr>
          <th class="asset_increment--column1">
            <MCheckbox 
              >
            </MCheckbox>
          </th>
          <th class="asset_increment--column2" >
            <div>STT</div>
          </th>
          <th class="asset_increment--column3">Số chứng từ</th>
          <th class="asset_increment--column4">Ngày chứng từ</th>
          <th class="asset_increment--column5">Ngày ghi tăng</th>
          <th class="asset_increment--column6">Tổng nguyên giá</th>
          <th class="asset_increment--column7">Nội dung</th>
          <th class="asset_increment--column8"></th>
        </tr>
      </thead>
      <!-- phần body của table  -->
      <tbody>
        <tr style="position: relative;">
          <td class="asset_increment--column1">
            <MCheckbox></MCheckbox>
          </td>
          <td class="asset_increment--column2"> 1
          </td>
          <td class="asset_increment--column3" style="color: dodgerblue;">GT000120</td>
          <td class="asset_increment--column4">14/04/2023</td>
          <td class="asset_increment--column5">14/04/2023
          </td>
          <td class="asset_increment--column6 column6--text"
            >2.157.243.000</td>
          <td class="asset_increment--column7">asdsadsadsa
          </td>
          <td class="asset_increment--column8">
            <div class="function">
              <!-- chức năng sửa tài sản trong table  -->
              <MButtonIcon
                class="function__edit"
              >
              </MButtonIcon>
              <!-- chức năng nhân bản tài sản trong table  -->
              <MButtonIcon
                class="function__clone"
              >
              </MButtonIcon>
            </div>
          </td>
        </tr>

      </tbody>
      <!-- phần footer của table  -->
            <tfoot style="background-color: #f5f5f5;">
                <td colspan="5">
                  <div class="content-footer__left">
                    <div class="content-footer__item1">
                      <div class="content-footer__item1--text">
                        Tổng số <span style="font-family: Roboto-Bold"> 200 </span> bản ghi
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
                <td class="footer_right text-align-left">412321321321</td>
                <td class="footer_right"></td>
                <td></td>
            </tfoot>
    </table>
    </div>
</template>

<script>
export default {
    name: "MTableAssetIncrement",
    components:{

    },
    props:{

    },
    data() {
        return {
            
        }
    },
    created() {
        
    },
    methods: {
        
    },
}
</script>

<style scoped>
@import url(./table-asset-increment.css);
</style>