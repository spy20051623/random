<template>
  <div class="total">
    <div class="button-area">
      <el-switch v-model="jy" :disabled="jyc" active-text="精养" inactive-text="普通" style="margin-right: 20px"/>
      <el-button @click="work" type="primary">培养</el-button>
      <el-button @click="accept" :disabled="res1.length === 0" type="success">替换</el-button>
      <el-button @click="dialogVisible1 = true" :disabled="res.length === 0 && res1.length === 0" type="danger">清空
      </el-button>
      <el-dialog title="警告" :visible.sync="dialogVisible1" width="200px">
        <span>确认清空？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取消</el-button>
          <el-button @click="clear(); dialogVisible1 = false" type="danger">确定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="警告" :visible.sync="dialogVisible2" width="200px">
        <span>当前属性较好，确认放弃？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取消</el-button>
          <el-button @click="confirm(); dialogVisible2 = false" type="danger">确定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="summary-area">
      <span>你已经洗猫{{ count }}次，其中精养了{{ countJy }}次！</span>
    </div>
    <div class="summary-area">
      <el-row>
        <el-col :span="12">
          <div class="hidden-md-and-up">
            <el-progress :percentage="p[0] * 20" color="red"></el-progress>
            <el-progress :percentage="p[1] * 20" color="springgreen"></el-progress>
            <el-progress :percentage="p[2] * 20" color="yellow"></el-progress>
            <el-progress :percentage="p[3] * 20" color="cyan"></el-progress>
            <el-progress :percentage="p[4] * 20" color="pink"></el-progress>
          </div>
          <div class="hidden-sm-and-down">
            <div style="width: 50%;margin-left: 25%;margin-right: 25%">
              <el-progress :percentage="p[0] * 20" color="red"></el-progress>
              <el-progress :percentage="p[1] * 20" color="springgreen"></el-progress>
              <el-progress :percentage="p[2] * 20" color="yellow"></el-progress>
              <el-progress :percentage="p[3] * 20" color="cyan"></el-progress>
              <el-progress :percentage="p[4] * 20" color="pink"></el-progress>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="hidden-md-and-up">
            <el-progress :percentage="p1[0] * 20" color="red"></el-progress>
            <el-progress :percentage="p1[1] * 20" color="springgreen"></el-progress>
            <el-progress :percentage="p1[2] * 20" color="yellow"></el-progress>
            <el-progress :percentage="p1[3] * 20" color="cyan"></el-progress>
            <el-progress :percentage="p1[4] * 20" color="pink"></el-progress>
          </div>
          <div class="hidden-sm-and-down">
            <div style="width: 50%;margin-left: 25%;margin-right: 25%">
              <el-progress :percentage="p1[0] * 20" color="red"></el-progress>
              <el-progress :percentage="p1[1] * 20" color="springgreen"></el-progress>
              <el-progress :percentage="p1[2] * 20" color="yellow"></el-progress>
              <el-progress :percentage="p1[3] * 20" color="cyan"></el-progress>
              <el-progress :percentage="p1[4] * 20" color="pink"></el-progress>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="result-area">
      <el-row>
        <el-col :span="11">
          <h1>原性格</h1>
          <h3 v-for="(item,i) in res" :style="'color: ' + color[type[item]]" :key="i">{{ name[item] }}</h3>
        </el-col>
        <el-col :span="11" :offset="2">
          <h1>新性格</h1>
          <h3 v-for="(item,i) in res1" :style="'color: ' + color[type[item]]" :key="i">{{ name[item] }}</h3>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "cat-g",
  data() {
    return {
      dialogVisible1: false,
      dialogVisible2: false,
      jy: false,
      jyc: true,
      count: 0,
      countJy: 0,
      res: [],
      res1: [],
      bd4: 0,
      bd5: 0,
      jy1: 0,
      jy2: 0,
      color: ['red', 'springgreen', 'yellow', 'cyan', 'pink'],
      p: [0, 0, 0, 0, 0],
      p1: [0, 0, 0, 0, 0],
      countProbability: [3, 7, 15, 60, 15],
      probability: [30, 10, 10, 10, 15, 15, 10, 10, 10, 10, 10, 10],
      w1: [50, 300, 2, 15, 15],
      w2: [50, 200, 4500, 5000, 2000],
      name: ['攻击', '攻击加成', '暴击强度', '暴击伤害', '生命', '防御', '生命加成', '防御加成', '暴击抵抗', '敏捷', '效果命中', '效果抵抗'],
      type: [0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 3, 4],
      cnt: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      cnt1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  }, methods: {
    getCount() {
      let x = Math.floor(Math.random() * 100);
      for (let i = 0; i < 5; i++) {
        if (x < this.countProbability[i]) return i + 1;
        x -= this.countProbability[i];
      }
      return -1;
    }, getNext() {
      let newProbability = [];
      let sum = 0;
      for (let i = 0; i < 12; i++) {
        if (i === 0 || i === 4 || i === 5) newProbability.push(this.probability[i] * this.w1[this.cnt1[i]]);
        else newProbability.push(this.probability[i] * this.w2[this.cnt1[i]]);
        sum += newProbability[i];
      }
      let x = Math.floor(Math.random() * sum);
      for (let i = 0; i < 12; i++) {
        if (x < newProbability[i]) return i;
        x -= newProbability[i];
      }
      return -1;
    }, getNext1() {
      let sum = 0;
      for (let i = 0; i < 12; i++) {
        sum += this.probability[i];
      }
      let x = Math.floor(Math.random() * sum);
      for (let i = 0; i < 12; i++) {
        if (x < this.probability[i]) return i;
        x -= this.probability[i];
      }
      return -1;
    }, get(id) {
      this.res1.push(id);
      ++this.cnt1[id];
      ++this.p1[this.type[id]];
    }, work1() {
      let count = this.getCount();
      ++this.bd4;
      ++this.bd5;
      if (this.bd4 === 10) {
        count = Math.max(count, 4);
        this.bd4 = 0;
      }
      if (this.bd5 === 50) {
        count = 5;
        this.bd5 = 0;
      }
      for (let i = 0; i < count; i++) {
        this.get(this.getNext());
      }
    }, work2() {
      ++this.countJy;
      let id, num;
      for (let i = 0; i < 12; i++) {
        if (this.cnt[i] >= 3) {
          id = i;
          num = this.cnt[i];
          break;
        }
      }
      for (let i = 0; i < num - 1; i++) {
        this.get(id);
      }
      ++this.jy1;
      let x = Math.floor(Math.random() * 5);
      if (num === 3 && this.jy1 === 2 || num === 4 && this.jy1 === 5 || x === 0) {
        this.get(id);
        this.jy1 = 0;
        ++this.jy2;
      }
      if (this.jy2 === 10) {
        this.get(id);
        this.jy2 = 0;
      } else this.get(this.getNext1());
    }, work() {
      if (!this.jy) {
        for (let i = 0; i < 12; i++) {
          if (i !== 0 && i !== 4 && i !== 5 && this.cnt1[i] >= 3) {
            this.dialogVisible2 = true;
            return;
          }
        }
      }
      ++this.count;
      this.p1 = [0, 0, 0, 0, 0];
      this.cnt1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.res1 = [];
      if (this.jy) this.work2();
      else this.work1();
    }, confirm() {
      ++this.count;
      this.p1 = [0, 0, 0, 0, 0];
      this.cnt1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.res1 = [];
      this.work1();
    }, accept() {
      this.p = this.p1;
      this.cnt = this.cnt1;
      this.res = this.res1;
      this.p1 = [0, 0, 0, 0, 0];
      this.cnt1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.res1 = [];
      let mx = 0;
      for (let i = 0; i < 12; i++) {
        mx = Math.max(mx, this.cnt[i]);
      }
      if (mx < 3 || mx > 4) {
        this.jyc = true;
        this.jy = false;
      } else this.jyc = false;
    }, clear() {
      this.p = [0, 0, 0, 0, 0];
      this.cnt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.res = [];
      this.p1 = [0, 0, 0, 0, 0];
      this.cnt1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.res1 = [];
      this.jyc = true;
      this.jy = false;
      this.count = 0;
      this.countJy = 0;
      this.bd4 = 0;
      this.bd5 = 0;
      this.jy1 = 0;
      this.jy2 = 0;
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
  margin-top: 5px;
  width: 100%;
  text-align: center;
}

.result-area {
  margin-top: 20px;
  width: 100%;
  text-align: center;
}

.el-button {
  margin-bottom: 12px;
}
</style>