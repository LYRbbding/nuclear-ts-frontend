<template>
  <el-input v-model="search" placeholder="输入姓名或学号筛选" clearable />
  <el-table
    v-loading="loading"
    :data="tableData.filter(data => !search || data.name.indexOf(search) !== -1 || data.id.indexOf(search) !== -1)"
    style="width: 100%;height: calc(90vh - 32px);"
    :row-class-name="tableRowClassName"
  >
    <el-table-column prop="id" label="学号" width="110" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column
      prop="status"
      label="核酸状态"
      width="100"
      :filters="[
        { text: '未完成', value: '未完成' },
        { text: '已完成', value: '已完成' },
      ]"
      :filter-method="filterStatus"
    />
    <el-table-column fixed="right" label="操作" width="70">
      <template #default="scope">
        <el-button v-if="scope.row.status=='未完成'" link type="primary" size="small" @click="handleFinish(scope.$index, scope.row)"
          >完成</el-button
        >
        <el-button v-else link type="warning" size="small" @click="handleUndone(scope.$index, scope.row)"
          >未完成</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-drawer v-model="confirmDialogVisible" direction="btt">
    <template #title>
      <h4>{{ name }}</h4>
    </template>
    <template #default>
      <div>请确认是否<span :style="tips=='已完成'?'color:var(--el-color-success)':'color:var(--el-color-warning)'">{{ tips }}</span>核酸检测？</div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from "vue";
import { ElTable, ElMessage } from "element-plus";
import axios from "./server/axios";

import { Student } from "./server/api";

export default defineComponent({
  name: "App",
  data() {
    let search = "";
    let loading = true;
    let confirmDialogVisible = false;
    let tableData: Student[] = [];
    let tips = "";
    let setStatus = "";
    let id = "";
    let name = "";
    let currentIndex = -1;

    return {
      search: search,
      loading: loading,
      confirmDialogVisible: confirmDialogVisible,
      tableData: tableData,
      tips: tips,
      setStatus: setStatus,
      id: id,
      name: name,
      currentIndex: currentIndex
    };
  },
  mounted() {
    axios({
      url: "nuclear_list",
    })
      .then((response) => {
        this.tableData.push(...response.res);
      })
      .catch(() => {
        ElMessage.error('网络异常，请稍后再试');
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    filterStatus(value: string, row: Student) {
      return row.status === value;
    },
    tableRowClassName({ row, rowIndex }: { row: Student; rowIndex: number }) {
      rowIndex;
      if (row.status == "未完成") {
        return "warning-row";
      } else if (row.status == "已完成") {
        return "success-row";
      }
    },
    handleFinish(index: number, row: Student) {
      if (row.id == this.tableData[index].id) {
        this.currentIndex = index;
      }
      else {
        for (let i = 0; i < this.tableData.length; i++) {
          if (row.id == this.tableData[i].id) {
            this.currentIndex = i;
            break;
          }
        }
      }
      this.confirmDialogVisible = true;
      this.tips = '已完成';
      this.name = `${this.tableData[this.currentIndex].name}同学`
      this.setStatus = 'finish';
    },
    handleUndone(index: number, row : Student) {
      if (row.id == this.tableData[index].id) {
        this.currentIndex = index;
      }
      else {
        for (let i = 0; i < this.tableData.length; i++) {
          if (row.id == this.tableData[i].id) {
            this.currentIndex = i;
            break;
          }
        }
      }
      this.confirmDialogVisible = true;
      this.tips = '尚未完成';
      this.name = `${this.tableData[this.currentIndex].name}同学`
      this.setStatus = 'undone';
    },
    cancelClick() {
      this.confirmDialogVisible = false;
      this.currentIndex = -1;
      this.tips = '';
      this.setStatus = '';
      this.id = '';
      this.name = '';
      ElMessage('操作取消');
    },
    confirmClick() {
      let index = this.currentIndex;
      if (this.id != this.tableData[index].id) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.id == this.tableData[i].id) {
            index = i;
            break;
          }
        }
      }
      axios({
        url: 'nuclear_update',
        method: 'POST',
        data: {
          id: this.tableData[index].id,
          date: this.tableData[index].date,
          status: this.setStatus == 'finish' ? 1 : 0
        }
      })
      .then((response) => {
        if (response.errCode === 0) {
          this.tableData[index].status = this.setStatus == 'finish' ? '已完成' : '未完成';
          ElMessage.success('操作成功');
        }
        else {
          ElMessage.error('操作失败，请重试');
        }
      })
      .catch(() => {
        ElMessage.error('网络异常，请稍后再试');
      })
      .finally(() => {
        this.confirmDialogVisible = false;
        this.currentIndex = -1;
        this.tips = '';
        this.setStatus = '';
        this.id = '';
        this.name = '';
      });
    },
  },
});
</script>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>