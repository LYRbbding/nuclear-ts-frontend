<template>
  <h3>{{ date }}，今日核酸做了吗？</h3>
  <el-input v-model="search" placeholder="输入姓名或学号筛选" clearable />
  <el-scrollbar>
    <el-radio-group v-model="school" style="display:flex;flex-wrap:nowrap!important">
        <el-radio label="">全部</el-radio>
        <el-radio label="是">在校 {{ inSchool }}</el-radio>
        <el-radio label="否">不在校 {{ outSchool }}</el-radio>
    </el-radio-group>
  </el-scrollbar>
  <el-scrollbar>
    <el-radio-group v-model="status" style="display:flex;flex-wrap:nowrap!important">
        <el-radio label="">全部</el-radio>
        <el-radio label="未完成">未完成 {{ nuclearUnfinish }}</el-radio>
        <el-radio label="已完成">已完成 {{ nuclearFinish }}</el-radio>
    </el-radio-group>
  </el-scrollbar>
  <el-scrollbar>
    <el-radio-group v-model="days" style="display:flex;flex-wrap:nowrap!important">
        <el-radio label="">全部</el-radio>
        <el-radio label="2">核酸两天 {{ nuclear2Days }}</el-radio>
    </el-radio-group>
  </el-scrollbar>
  <el-scrollbar>
    <el-radio-group v-model="classes" style="display:flex;flex-wrap:nowrap!important">
        <el-radio label="">全部</el-radio>
        <el-radio label="21">21</el-radio>
        <el-radio label="22">22</el-radio>
        <el-radio label="23">23</el-radio>
        <el-radio label="24">24</el-radio>
        <el-radio label="25">25</el-radio>
        <el-radio label="26">26</el-radio>
        <el-radio label="27">27</el-radio>
        <el-radio label="28">28</el-radio>
    </el-radio-group>
  </el-scrollbar>
  <el-table
    v-loading="loading"
    v-if="showing"
    :row-class-name="tableStatusClassName"
    :data="
      tableData.filter(
        (data) =>
          (!search ||
          data.name.indexOf(search) !== -1 ||
          data.id.indexOf(search) !== -1) && 
          (!school ||
          data.school === school) && 
          (!status ||
          data.status === status) && 
          (!days ||
          data.days === days) && 
          (!classes ||
          data.class === '20192111' + classes)
      )
    "
    style="width: 100%; height: calc(90vh - 160px)"
  >
    <el-table-column prop="id" label="学号" width="100" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="school" label="在校" width="50">
      <template #default="scope">
        <el-tag v-if="scope.row.school === '是'" type="info" effect="plain">是</el-tag>
        <el-tag v-else type="danger" effect="plain">否</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="核酸" width="70">
      <template #default="scope">
        <el-tag v-if="scope.row.status === '已完成'" type="success" effect="plain">已完成</el-tag>
        <el-tag v-else type="warning" effect="plain">未完成</el-tag>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="65">
      <template #default="scope">
        <el-button
          v-if="scope.row.status == '未完成'"
          type="success"
          size="small"
          @click="handleFinish(scope.$index, scope.row)"
          >完成</el-button
        >
        <el-button
          v-else
          type="warning"
          size="small"
          @click="handleUndone(scope.$index, scope.row)"
          >未完成</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-table
    v-loading="loading"
    v-else
    :row-class-name="tableStatusClassName"
    :data="
      tableData.filter(
        (data) =>
          (!search ||
          data.name.indexOf(search) !== -1 ||
          data.id.indexOf(search) !== -1) && 
          (!school ||
          data.school === school) && 
          (!status ||
          data.status === status) && 
          (!classes ||
          data.class === '20192111' + classes)
      )
    "
    style="width: 100%; height: calc(90vh - 160px)"
  >
    <el-table-column prop="id" label="学号" width="100" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="school" label="在校" width="50">
      <template #default="scope">
        <el-tag v-if="scope.row.school === '是'" type="info" effect="plain">是</el-tag>
        <el-tag v-else type="danger" effect="plain">否</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="核酸" width="70">
      <template #default="scope">
        <el-tag v-if="scope.row.status === '已完成'" type="success" effect="plain">已完成</el-tag>
        <el-tag v-else type="warning" effect="plain">未完成</el-tag>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="65">
      <template #default="scope">
        <el-button
          v-if="scope.row.school == '否'"
          type="info"
          size="small"
          @click="handleBack(scope.$index, scope.row)"
          >返校</el-button
        >
        <el-button
          v-else
          type="danger"
          size="small"
          @click="handleLeave(scope.$index, scope.row)"
          >离校</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-drawer v-model="confirmDialogVisible" direction="btt">
    <template #header>
      <h4>{{ name }}</h4>
    </template>
    <template #default>
      <div>
        请确认是否<span
          :style="
            tips == '已完成'
              ? 'color:var(--el-color-success)'
              : 'color:var(--el-color-warning)'
          "
          >{{ tips }}</span
        >核酸检测？
      </div>
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
import { defineComponent } from "vue";
import { ref } from "vue";
import { ElTable, ElMessage } from "element-plus";
import axios from "./server/axios";

import { Student } from "./server/api";

export default defineComponent({
  name: "App",
  data() {
    let tableData: Student[] = [];
    let time = new Date();

    return {
      search: "",
      loading: true,
      showing: true,
      confirmDialogVisible: false,
      tableData: tableData,
      tips: "",
      setStatus: "",
      id: "",
      name: "",
      currentIndex: -1,
      school: '是',
      status: '未完成',
      days: '',
      classes: '',
      date: time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate(),
      inSchool: 0,
      outSchool: 0,
      nuclearFinish: 0,
      nuclearUnfinish: 0,
      nuclear2Days: 0,
    };
  },
  mounted() {
    const search = location.search;
    if (search) {
      let params = new URLSearchParams(search);
      let manage = params.get("manage");
      if (manage) {
        this.showing = false;
        console.log(manage)
      }
    }
    axios({
      url: "nuclear_list",
    })
      .then((response) => {
        this.tableData.push(...response.res);
        this.nuclearFinish = this.tableData.filter((data) => data.status === '已完成' && data.school === '是').length;
        this.nuclearUnfinish = this.tableData.filter((data) => data.status === '未完成' && data.school === '是').length;
        this.inSchool = this.tableData.filter((data) => data.school === '是').length;
        this.outSchool = this.tableData.filter((data) => data.school === '否').length;
        this.nuclear2Days = this.tableData.filter((data) => data.status === '未完成' && data.school === '是' && data.days === '2').length;
      })
      .catch(() => {
        ElMessage.error("网络异常，请稍后再试");
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    tableStatusClassName({
      row,
      rowIndex,
    }: {
      row: Student
      rowIndex: number
    }) {
      if (row.days === '2') {
        return 'warning-row';
      } else {
        return 'success-row';
      }
    },
    filterSchool(value: string, row: Student) {
      return row.school === value;
    },
    filterStatus(value: string, row: Student) {
      return row.status === value;
    },
    findIndex(index: number, row: Student) {
      if (row.id != this.tableData[index].id) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (row.id == this.tableData[i].id) {
            index = i;
            break;
          }
        }
      }
      return index;
    },
    updateSchool(index: number, school: string) {
      axios({
        url: "nuclear_school",
        method: "POST",
        data: {
          id: this.tableData[index].id,
          date: this.tableData[index].date,
          school: school,
        },
      })
        .then((response) => {
          if (response.errCode === 0) {
            this.tableData[index].school = school;
            ElMessage.success("操作成功");
          } else {
            ElMessage.error("操作失败，请重试");
          }
        })
        .catch(() => {
          ElMessage.error("网络异常，请稍后再试");
        });
    },
    handleBack(index: number, row: Student) {
      index = this.findIndex(index, row);
      this.updateSchool(index, "是");
    },
    handleLeave(index: number, row: Student) {
      index = this.findIndex(index, row);
      this.updateSchool(index, "否");
    },
    handleFinish(index: number, row: Student) {
      if (row.id == this.tableData[index].id) {
        this.currentIndex = index;
      } else {
        for (let i = 0; i < this.tableData.length; i++) {
          if (row.id == this.tableData[i].id) {
            this.currentIndex = i;
            break;
          }
        }
      }
      this.confirmDialogVisible = true;
      this.tips = "已完成";
      this.name = `${this.tableData[this.currentIndex].name}同学`;
      this.setStatus = "finish";
    },
    handleUndone(index: number, row: Student) {
      if (row.id == this.tableData[index].id) {
        this.currentIndex = index;
      } else {
        for (let i = 0; i < this.tableData.length; i++) {
          if (row.id == this.tableData[i].id) {
            this.currentIndex = i;
            break;
          }
        }
      }
      this.confirmDialogVisible = true;
      this.tips = "尚未完成";
      this.name = `${this.tableData[this.currentIndex].name}同学`;
      this.setStatus = "undone";
    },
    cancelClick() {
      this.confirmDialogVisible = false;
      this.currentIndex = -1;
      this.tips = "";
      this.setStatus = "";
      this.id = "";
      this.name = "";
      ElMessage("操作取消");
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
        url: "nuclear_update",
        method: "POST",
        data: {
          id: this.tableData[index].id,
          date: this.tableData[index].date,
          status: this.setStatus == "finish" ? 1 : 0,
        },
      })
        .then((response) => {
          if (response.errCode === 0) {
            this.tableData[index].status =
              this.setStatus == "finish" ? "已完成" : "未完成";
            ElMessage.success("操作成功");
          } else {
            ElMessage.error("操作失败，请重试");
          }
        })
        .catch(() => {
          ElMessage.error("网络异常，请稍后再试");
        })
        .finally(() => {
          this.confirmDialogVisible = false;
          this.currentIndex = -1;
          this.tips = "";
          this.setStatus = "";
          this.id = "";
          this.name = "";
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
.el-tag {
  padding: 0 3px !important;
}
.el-button--small {
  padding: 5px 5px !important;
}
.el-table .cell {
  padding: 0 3px !important;
}
</style>