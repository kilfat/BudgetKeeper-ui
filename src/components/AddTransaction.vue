<template>
  <el-form :inline="true" :model="formInline">
    <el-form-item label="Value">
      <el-input
        class="amount-input"
        prefix-icon="icon-money"
        placeholder="Type something"
        v-model="inputAmount">
      </el-input>
    </el-form-item>
    <el-form-item label="Category">
      <el-autocomplete
        v-model="inputCategory"
        :fetch-suggestions="querySearchAsync"
        placeholder="Please input"
        @select="handleSelect"
      ></el-autocomplete>
    </el-form-item>
    <el-form-item label="Date">
      <el-date-picker v-model="inputDate" type="datetime" :picker-options="pickerOptions" format="dd-MM-yyyy HH:mm:ss"
                      placeholder="Select date and time">
      </el-date-picker>
    </el-form-item>
    <!--<el-form-item label="Account">-->
    <!--<el-select v-model="formInline.account" clearable placeholder="select account type"-->
    <!--v-on:visible-change="selectDemo">-->
    <!--<el-option-->
    <!--v-for="item in type_options"-->
    <!--:label="item.label"-->
    <!--:value="item.value">-->
    <!--</el-option>-->
    <!--</el-select>-->
    <!--</el-form-item>-->

    <!--<el-form-item v-if='formInline.account' label="Category">-->
    <!--<el-input v-model="formInline.category" placeholder="Please input suffix of category"></el-input>-->
    <!--</el-form-item>-->

    <!--<el-form-item v-else='formInline.account' label="Category">-->
    <!--<el-input v-model="formInline.category" disabled placeholder="Please input suffix of category"></el-input>-->
    <!--</el-form-item>-->

  </el-form>
</template>

<script>
  import lodash from 'lodash'
  import Bus from '../eventBus'
  import http from '../utils/http'
  import {CATEGORY_NAMES_URL} from '../store/env'

  export default {
    name: 'db-filterinput',
    data() {
      return {
        pickerOptions: {
          firstDayOfWeek: 1
        },
        inputAmount: 0,
        inputCategory: '',
        inputDate: Date.now(),
        type_options: [],
        formInline: {
          account: '',
          category: ''
        },
        formLabelWidth: '120px',
        links: []
      }
    },

    watch: {
      'formInline.account': 'filterResultData',
      'formInline.category': 'filterResultData'
    },

    methods: {
      loadAll: function () {
        return http.get(CATEGORY_NAMES_URL, this.$store.getters.user).then((response) => {
          response.data.forEach(function (e) {
            if (typeof e === "object") {
              e["value"] = e.name;
            }
          });
          this.links = response.data;
          console.log(response.data);
        });
      },
      querySearchAsync(queryString, cb) {
        var links = this.links;
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },
      createFilter(queryString) {
        return (entity) => {
          return (entity.name.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
      },
      handleSelect(item) {
        console.log(item);
      },

      selectDemo: function (params) {
        if (params) {
          this.type_options =
            [{label: "BANK CARD", value: "BANK_CARD"}, {label: "CASH", value: "CASH"},
              {label: "SAVINGS ACCOUNT", value: "SAVINGS_ACCOUNT"}];
          console.log(this.type_options);
        }

      },
      filterResultData: _.debounce(
        function () {
//          this.$axios.get("http://127.0.0.1:8000/api/persons", {
//            params: {
//              account: this.formInline.account,
//              category: this.formInline.category,
//            }
//          }).then((response) => {
//            response.data['account'] = this.formInline.account;
//            response.data['category'] = this.formInline.category;
//            Bus.$emit('filterResultData', response.data);
//            console.log(response.data);
//          }).catch(function (response) {
//            console.log(response)
//          });
//
        },
        500
      ),
    },
    mounted() {
      this.links = this.loadAll();
    }
  }
</script>

<style>
  @import url("//unpkg.com/element-ui@2.0.4/lib/theme-chalk/index.css");

  .amount-input {
    width: 60px;
  }

  .icon-money {
    content: url('../../static/money.png');
  }
</style>
