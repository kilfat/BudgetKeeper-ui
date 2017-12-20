<template>
  <div>
    <el-alert v-if="errorMessage"
              title="Error:"
              type="error"
              :closable="false">
      {{errorMessage}}
    </el-alert>
    <el-form :inline="true">
      <el-form-item label="Date">
        <el-date-picker v-model="value7" type="daterange" align="right"
                        unlink-panels range-separator="To"
                        start-placeholder="Start date" end-placeholder="End date"
                        :picker-options="pickerOptions2" format="dd.MM.yy">
        </el-date-picker>
      </el-form-item>
      <el-button type="primary" @click="getReport()">Report</el-button>
    </el-form>
  </div>
</template>

<script>
  import lodash from 'lodash'
  import Bus from '../eventBus'
  import http from '../utils/http'
  import {CATEGORY_NAMES_URL} from '../store/env'
  import {TRANSACTION_URL} from '../store/env'
  import {CATEGORY_URL} from '../store/env'
  import {ACCOUNT_NAMES_URL} from '../store/env'

  export default {
    data() {
      return {
        value7: '',
        pickerOptions2: {
          shortcuts: [
            {
              text: 'Yesterday',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', [date, date]);
              }
            }, {
              text: 'Last week',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: 'Last month',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: 'Last 3 months',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: 'Last Year',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                picker.$emit('pick', [start, end]);
              }
            }]
        },
        pickerOptions: {
          firstDayOfWeek: 1
        },
        errorMessage: '',
        successMessage: '',
        formLabelWidth: '120px'
      }
    },
    methods: {
      getReport: function () {
        alert("good");
      }
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
