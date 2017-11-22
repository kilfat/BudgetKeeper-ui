<template>
  <el-form :inline="true" :model="formInline">
    <el-form-item label="Account">
      <el-select v-model="formInline.account" clearable placeholder="select account type"
                 v-on:visible-change="selectDemo">
        <el-option
          v-for="item in type_options"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item v-if='formInline.account' label="Category">
      <el-input v-model="formInline.category" placeholder="Please input suffix of category"></el-input>
    </el-form-item>

    <el-form-item v-else='formInline.account' label="Category">
      <el-input v-model="formInline.category" disabled placeholder="Please input suffix of category"></el-input>
    </el-form-item>

  </el-form>
</template>

<script>
  import lodash from 'lodash'
  import Bus from '../eventBus'

  export default {
    name: 'db-filterinput',
    data() {
      return {
        type_options: [],
        formInline: {
          account: '',
          category: ''
        },
        formLabelWidth: '120px'
      }
    },

    watch: {
      'formInline.account': 'filterResultData',
      'formInline.category': 'filterResultData'
    },

    methods: {
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
    }
  }
</script>
