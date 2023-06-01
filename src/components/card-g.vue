<template>
  <div class="total">
    <div class="button-area">
      <el-button @click="get1" type="primary">单抽</el-button>
      <el-button @click="get10" type="primary">十连</el-button>
      <el-button @click="dialogVisible = true" :disabled="res.length === 0" type="danger">清除</el-button>
      <el-dialog title="警告" :visible.sync="dialogVisible" width="200px">
        <span>确认清空？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button @click="clear(); dialogVisible = false" type="danger">确定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="summary-area">
      <span>你抽卡{{ c }}次，一共出了{{ ct }}个天卡，歪了{{ cw }}次，鉴定为{{
          ct / c > 0.04 ? '可恶的欧皇' : c <= 20 || ct / c > 0.02 && (ct <= 3 || cw / ct < 0.6) ? '平凡的使君' : '纯纯的非酋'
        }}。</span>
    </div>
    <div class="result-area" ref="result-area">
      <div class="hidden-sm-and-down">
        <el-row>
          <el-col :span="4" v-for="(item,index) in res" :offset="index % 5 === 0 ? 0 : 1" :key="index">
            <show-card :type="item.type" :attr="item.attr" :key="item">
              {{ item.type }},{{ item.attr }}
            </show-card>
          </el-col>
        </el-row>
      </div>
      <div class="hidden-md-and-up">
        <el-row>
          <el-col :span="24" v-for="(item,index) in res" :key="index">
            <show-card :type="item.type" :attr="item.attr" :key="item">
              {{ item.type }},{{ item.attr }}
            </show-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import ShowCard from "@/components/show-card.vue";

export default {
  name: "card-g",
  components: {ShowCard},
  data() {
    return {
      dialogVisible: false,
      nd: 0,
      nt: 0,
      bd: 0,
      res: [],
      c: 0,
      ct: 0,
      cw: 0
    }
  }, methods: {
    getNext() {
      ++this.c;
      let p;
      if (this.nt <= 50) p = 0.22;
      else if (this.nt <= 60) p = 0.22 + (this.nt - 50) * 0.02;
      else if (this.nt <= 70) p = 0.52 + (this.nt - 60) * 0.03;
      else p = 0.72 + (this.nt - 70) * 0.05;
      if (Math.random() < p) {
        ++this.ct;
        this.nt = 0;
        this.nd = 0;
        if (this.bd === 2 || Math.random() < 0.3) {
          this.bd = 0;
          return {type: 0, attr: 0};//天，up
        } else {
          ++this.cw;
          ++this.bd;
          return {type: 0, attr: 1};//天，歪
        }
      }
      ++this.nt;
      if (this.nd === 4 || Math.random() < 0.4) {
        this.nd = 0;
        if (Math.random() < 0.3) {
          return {type: 1, attr: 0};//地，up
        } else {
          return {type: 1, attr: 1};//地，歪
        }
      }
      ++this.nd;
      return {type: 2, attr: 1};
    },
    get1() {
      this.res = [];
      this.res.push(this.getNext());
    },
    get10() {
      this.res = [];
      for (let i = 0; i < 10; i++) this.res.push(this.getNext());
    },
    clear() {
      this.c = 0;
      this.ct = 0;
      this.cw = 0;
      this.res = []
    }
  }
}
</script>

<style scoped>
.total {
  width: 100%;
  height: 100%;
}

.button-area {
  width: 100%;
  text-align: center;
}

.summary-area {
  width: 100%;
  text-align: center;
}

.result-area {
  width: 100%;
  text-align: center;
}

.el-button {
  margin-bottom: 12px;
}
</style>