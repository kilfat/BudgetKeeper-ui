<template>
  <el-dialog title="Edit" :visible.sync="dialogFormVisible" v-model="dialogFormVisible" :close-on-click-modal="false"
             :show-close="false" :before-close="cancelmodal">
    <div>
      <el-alert v-if="errorMessage"
                title="Error:"
                type="error"
                :closable="false">
        {{errorMessage}}
      </el-alert>
      <el-alert v-if="successMessage"
                title="Success:"
                type="success">
        {{successMessage}}
      </el-alert>
      <el-form :model="form" label-width="100px">
        <el-form-item label="Value">
          <el-input
            autofocus
            class="amount-input"
            suffix-icon="icon-money"
            placeholder="Type something"
            v-model="form.amount"
            clearable
            @focus="$event.target.select()"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Category">
          <el-autocomplete
            v-model="form.categoryName"
            :fetch-suggestions="querySearchAsync"
            placeholder="Please input"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="Date">
          <el-date-picker v-model="form.date_value"
                          :picker-options="pickerOptions"
                          format="dd.MM.yy"
                          placeholder="DD.MM.YY"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Account">
          <el-select v-model="form.accountType" filterable placeholder="Select" clearable>
            <el-option label="Account"
                       v-for="item in this.$store.getters.accounts"
                       :key="item.id"
                       :label="item.value"
                       :value="item">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.amount }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :plain="true" type="danger" v-on:click="cancelmodal">Cancel</el-button>
      <el-button :plain="true" @click="updateForm(form)">Save</el-button>
    </div>
  </el-dialog>
</template>


<script>
  import http from '../utils/http'
  import {TRANSACTION_URL} from '../store/env'
  import Bus from '../eventBus'
  import {CATEGORY_NAMES_URL} from '../store/env'
  import {ACCOUNT_NAMES_URL} from '../store/env'

  export default {
    data() {
      return {
        formLabelWidth: '120px',
        pickerOptions: {
          firstDayOfWeek: 1
        },
        type_options: [],
        errorMessage: '',
        successMessage: ''
      }
    },
    props: ['dialogFormVisible', 'form'],

    computed: {},

    methods: {
      updateForm: function (formName) {
        var itemId = formName.id.valueOf();
        formName.amount = Number(formName.amount);
        formName.date = Date.now(); //this.form.date_value;
        http.put(TRANSACTION_URL + itemId, this.$store.getters.user, formName)
          .then((response) => this.chechSuccessStatus).catch((error) => this.checkErrorStatus(error))
      },
      chechSuccessStatus: function () {
        this.errorMessage = '';
        this.$message({
                        showClose: true,
                        message: 'Transaction edited',
                        type: 'success'
                      });
        this.successMessage = 'Transaction edited';
        this.form = response.data;
        this.cancelmodal();
      },
      cancelmodal: function () {
        this.$emit('cancelmodal');
      },
      checkErrorStatus: function (error) {
        this.$message({
                        showClose: true,
                        message: 'Transaction edition error!',
                        type: 'error'
                      });
        this.errorMessage = error.response.data.message;
        console.log(error);
      },
      querySearchAsync(queryString, cb) {
        var links = this.$store.getters.links;
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },
      createFilter(queryString) {
        return (entity) => {
          return (entity.name.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
      },
      handleSelect(item) {
        this.form.inputCategory = item;
        console.log(item);
      }
    }
  }

</script>
