<template>
  <el-dialog title="Edit" v-model="dialogFormVisible" :close-on-click-modal="false" :show-close="false">
    <el-form :model="form">
      <el-form-item label="Amount" :label-width="formLabelWidth">
        <el-input v-model="form.amount" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Category" :label-width="formLabelWidth">
        <el-input v-model="form.categoryName" auto-complete="on"></el-input>
      </el-form-item>

      <el-form-item label="Date" :label-width="formLabelWidth">
        <el-input v-model="form.date" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="Account type" :label-width="formLabelWidth">
        <el-input v-model="form.accountType" auto-complete="on"></el-input>
      </el-form-item>
      <!--<el-form-item label="sex" :label-width="formLabelWidth">-->
      <!--<el-input :disabled="true" v-model="form.account" auto-complete="off"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="zone" :label-width="formLabelWidth">-->
      <!--<el-input v-model="form.zone" auto-complete="off"></el-input>-->
      <!--</el-form-item>-->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :plain="true" type="danger" v-on:click="canclemodal">Cancel</el-button>
      <el-button :plain="true" @click="updateForm(form)">Save</el-button>
    </div>
  </el-dialog>
</template>


<script>
  import http from '../utils/http'
  import {TRANSACTION_URL} from '../store/env'

  export default {
    data() {
      return {
        formLabelWidth: '120px',
      }
    },
    props: ['dialogFormVisible', 'form'],

    methods: {
      updateForm: function (formName) {
        var itemId = formName.id.valueOf();
        formName.amount = Number(formName.amount)
        http.put(TRANSACTION_URL + itemId, this.$store.getters.user, formName)
          .then(function (response) {
            this.form = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
        this.canclemodal();
//        location.reload();
      },
      canclemodal: function () {
        this.$emit('canclemodal');
      }
    }

  }

</script>
