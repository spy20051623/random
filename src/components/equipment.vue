<template>
	<div class="total">
		<div class="button-area">
			<el-button @click="check" :disabled="type === -1" type="primary">洗练</el-button>
			<el-button @click="accept" :disabled="res1.length === 0" type="success">替换</el-button>
			<el-button @click="dialogVisible1 = true" :disabled="type === -1" type="danger">清除</el-button>
			<el-dialog title="警告" :visible.sync="dialogVisible1" width="200px">
				<span>确认清空？</span>
				<span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取消</el-button>
          <el-button @click="clear(); dialogVisible1 = false" type="danger">确定</el-button>
        </span>
			</el-dialog>
			<el-dialog title="警告" :visible.sync="dialogVisible2" width="200px">
				<span>有新生成的目标词条，确认放弃？</span>
				<span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取消</el-button>
          <el-button @click="work(); dialogVisible2 = false" type="danger">确定</el-button>
        </span>
			</el-dialog>
		</div>
		<div class="button-area">
			<div class="hidden-sm-and-down">
				<el-radio-group v-model="type" :disabled="type !== -1">
					<el-radio-button :label="0">冠</el-radio-button>
					<el-radio-button :label="1">衣</el-radio-button>
					<el-radio-button :label="2">靴</el-radio-button>
					<el-radio-button :label="3">饰</el-radio-button>
					<el-radio-button :label="4">佩</el-radio-button>
				</el-radio-group>
			</div>
			<div class="hidden-md-and-up">
				<el-radio-group v-model="type" :disabled="type !== -1" size="small">
					<el-radio-button :label="0">冠</el-radio-button>
					<el-radio-button :label="1">衣</el-radio-button>
					<el-radio-button :label="2">靴</el-radio-button>
					<el-radio-button :label="3">饰</el-radio-button>
					<el-radio-button :label="4">佩</el-radio-button>
				</el-radio-group>
			</div>
		</div>
		<div class="summary-area">
			<span>你已经消耗了{{ ly }}个混沌灵元和{{ hc }}个绝之尘！</span>
		</div>
		<div class="result-area">
			<div class="hidden-sm-and-down">
				<div v-for="i in 4" style="height: 50px">
					<el-row>
						<el-col :span="11">
							<div class="description">
								<el-tag
										v-if="res.length !== 0 && hasTag[i - 1] && res[i - 1].level === 4"
										type="info" size="small" style="float:left;">{{ tags[res[i - 1].id] }}
								</el-tag>
								<el-tag
										v-if="res.length !== 0 && hasTag[i - 1] && res[i - 1].level === 5 && res[i - 1].id !== 12"
										type="danger" size="small" style="float:left;">{{ tags[res[i - 1].id] }}
								</el-tag>
								<el-tag v-if="res.length !== 0 && res[i - 1].id === 12"
										type="warning"
										size="small" style="float:left;">忘川风华
								</el-tag>
								<span v-if="res.length !== 0" style="float:left;">{{ name[res[i - 1].id] }}</span>
								<span v-if="res.length !== 0"
									  style="float:right;">{{ value[res[i - 1].id][res[i - 1].level] }}</span>
							</div>
							<el-progress :percentage="res.length === 0 ? 0 : 100 * (res[i - 1].level + 1) / 6"
										 :show-text="false"
										 :color="res.length !== 0 && res[i - 1].id === 12 ? 'mediumpurple' : res.length !== 0 && res[i - 1].level === 5 ? 'red' : 'yellow'"/>
						</el-col>
						<el-col :span="2">
							<el-switch v-model="locked[i - 1]"
									   :disabled="res.length === 0 || locked[0] + locked[1] + locked[2] + locked[3] === 2 && !locked[i - 1]"/>
						</el-col>
						<el-col :span="11">
							<div class="description">
								<el-tag
										v-if="res1.length !== 0 && hasTag1[i - 1] && res1[i - 1].level === 4"
										type="info" size="small" style="float:left;">{{ tags[res1[i - 1].id] }}
								</el-tag>
								<el-tag
										v-if="res1.length !== 0 && hasTag1[i - 1] && res1[i - 1].level === 5 && res1[i - 1].id !== 12"
										type="danger" size="small" style="float:left;">{{ tags[res1[i - 1].id] }}
								</el-tag>
								<el-tag v-if="res1.length !== 0 && res1[i - 1].id === 12"
										type="warning"
										size="small" style="float:left;">忘川风华
								</el-tag>
								<span v-if="res1.length !== 0" style="float:left;">{{ name[res1[i - 1].id] }}</span>
								<span v-if="res1.length !== 0" style="float:right;">{{
                                    value[res1[i - 1].id][res1[i - 1].level]
									}}</span>
							</div>
							<el-progress :percentage="res1.length === 0 ? 0 : 100 * (res1[i - 1].level + 1) / 6"
										 :show-text="false"
										 :color="res1.length !== 0 && res1[i - 1].id === 12 ? 'mediumpurple' : res1.length !== 0 && res1[i - 1].level === 5 ? 'red' : 'yellow'"/>
						</el-col>
					</el-row>
				</div>
			</div>
			<div class="hidden-md-and-up">
				<div v-for="i in 4" style="height: 40px">
					<el-row>
						<el-col :span="19">
							<div class="description">
								<el-tag
										v-if="res.length !== 0 && hasTag[i - 1] && res[i - 1].level === 4"
										type="info" size="mini" style="float:left;">{{ tags[res[i - 1].id] }}
								</el-tag>
								<el-tag
										v-if="res.length !== 0 && hasTag[i - 1] && res[i - 1].level === 5 && res[i - 1].id !== 12"
										type="danger" size="mini" style="float:left;">{{ tags[res[i - 1].id] }}
								</el-tag>
								<el-tag v-if="res.length !== 0 && res[i - 1].id === 12"
										type="warning"
										size="mini" style="float:left;">忘川风华
								</el-tag>
								<span v-if="res.length !== 0" style="float:left;">{{ name[res[i - 1].id] }}</span>
								<span v-if="res.length !== 0"
									  style="float:right;">{{ value[res[i - 1].id][res[i - 1].level] }}</span>
							</div>
							<el-progress :percentage="res.length === 0 ? 0 : 100 * (res[i - 1].level + 1) / 6"
										 :show-text="false"
										 :color="res.length !== 0 && res[i - 1].id === 12 ? 'mediumpurple' : res.length !== 0 && res[i - 1].level === 5 ? 'red' : 'yellow'"/>
						</el-col>
						<el-col :span="5">
							<div style="height: 40px;line-height: 40px">
								<el-switch v-model="locked[i - 1]"
										   :disabled="res.length === 0 || locked[0] + locked[1] + locked[2] + locked[3] === 2 && !locked[i - 1]"/>
							</div>
						</el-col>
					</el-row>
				</div>
				<div v-for="i in 4" style="height: 40px">
					<el-row>
						<el-col :span="24">
							<div class="description">
								<el-tag
										v-if="res1.length !== 0 && hasTag1[i - 1] && res1[i - 1].level === 4"
										type="info" size="mini" style="float:left;">{{ tags[res1[i - 1].id] }}
								</el-tag>
								<el-tag
										v-if="res1.length !== 0 && hasTag1[i - 1] && res1[i - 1].level === 5 && res1[i - 1].id !== 12"
										type="danger" size="mini" style="float:left;">{{ tags[res1[i - 1].id] }}
								</el-tag>
								<el-tag v-if="res1.length !== 0 && res1[i - 1].id === 12"
										type="warning"
										size="mini" style="float:left;">忘川风华
								</el-tag>
								<span v-if="res1.length !== 0" style="float:left;">{{ name[res1[i - 1].id] }}</span>
								<span v-if="res1.length !== 0" style="float:right;">{{
                                    value[res1[i - 1].id][res1[i - 1].level]
									}}</span>
							</div>
							<el-progress :percentage="res1.length === 0 ? 0 : 100 * (res1[i - 1].level + 1) / 6"
										 :show-text="false"
										 :color="res1.length !== 0 && res1[i - 1].id === 12 ? 'mediumpurple' : res1.length !== 0 && res1[i - 1].level === 5 ? 'red' : 'yellow'"/>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<div class="select-area">
			<div style="width: 100%">
				<el-transfer class="transfer" v-model="target" :data="getList()" :titles="['可选词条','目标词条']"/>
			</div>
			<div style="width: 100%;margin-top: 15px">
				<label>目标词条数量</label>
				<el-input-number :min="calcMin()" :max="4" v-model="targetNum" style="margin-left: 20px"/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    name: "equipment",
    data() {
        return {
            type: -1,
            dialogVisible1: false,
            dialogVisible2: false,
            locked: [false, false, false, false],
            ly: 0,
            hc: 0,
            bd: Math.floor(Math.random() * 300) + 1200,
            res: [],
            res1: [],
            levelProbability: [
                [10, 15, 25, 25, 15, 10],
                [15, 15, 15, 15, 20, 20],
                [8, 8, 8, 8, 36, 36],
                [5, 5, 5, 5, 40, 40]
            ],
            probability: [
                [0, 0, 0, 0, 225, 225, 25, 25, 25, 0, 0, 25, 1, 0, 0, 225, 225],
                [0, 0, 0, 0, 225, 225, 25, 25, 25, 0, 0, 25, 1, 0, 0, 225, 225],
                [275, 25, 0, 25, 175, 0, 25, 0, 0, 25, 0, 0, 1, 225, 225, 0, 0],
                [275, 25, 25, 0, 0, 175, 0, 25, 0, 0, 25, 0, 1, 225, 225, 0, 0],
                [175, 25, 25, 25, 0, 0, 0, 0, 0, 25, 25, 0, 1, 175, 175, 175, 175]
            ],
            w1: [5, 20, 0, 0],
            w2: [5, 10, 1, 35],
            name: ['攻击', '攻击加成', '暴击强度', '暴击伤害', '生命', '防御', '生命加成', '防御加成', '暴击抵抗', '敏捷', '效果命中', '效果抵抗', '主灵韵加成', '普攻伤害', '觉醒伤害', '普攻伤害减免', '觉醒伤害减免'],
            tags: ['', '破竹', '烛照', '幽荧', '', '', '永岁', '金汤', '渊沈', '扶摇', '魑魅', '明心', '忘川风华', '', '', '', ''],
            value: [
                ['40', '44', '48', '52', '56', '60'],
                ['4%', '4.4%', '4.8%', '5.2%', '5.6%', '6%'],
                ['16', '17.6', '19.2', '20.8', '22.4', '24'],
                ['4%', '4.4%', '4.8%', '5.2%', '5.6%', '6%'],
                ['100', '110', '120', '130', '140', '150'],
                ['20', '22', '24', '26', '28', '30'],
                ['4%', '4.4%', '4.8%', '5.2%', '5.6%', '6%'],
                ['4%', '4.4%', '4.8%', '5.2%', '5.6%', '6%'],
                ['16', '17.6', '19.2', '20.8', '22.4', '24'],
                ['3', '4', '5', '6', '7', '8'],
                ['8%', '8.8%', '9.6%', '10.4%', '11.2%', '12%'],
                ['8%', '8.8%', '9.6%', '10.4%', '11.2%', '12%'],
                ['', '', '', '', '', '25%'],
                ['20', '22', '24', '26', '28', '30'],
                ['40', '44', '48', '52', '56', '60'],
                ['20', '22', '24', '26', '28', '30'],
                ['40', '44', '48', '52', '56', '60']
            ],
            cnt1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            target: [12],
            targetNum: 0,
            hasTag: [false, false, false, false],
            hasTag1: [false, false, false, false]
        }
    }, methods: {
        getList() {
            if (this.type === -1) return [];
            let data = [];
            for (let i = 0; i < 17; i++) {
                if (this.probability[this.type][i] > 0) data.push({key: i, label: this.name[i]});
            }
            return data;
        }, getLevel() {
            let sum = 0;
            for (let i = 0; i < 4; i++) {
                sum += this.hasTag1[i];
            }
            console.log(sum);
            let x = Math.floor(Math.random() * 100);
            for (let i = 0; i < 6; i++) {
                if (x < this.levelProbability[sum][i]) return i;
                x -= this.levelProbability[sum][i];
            }
            return -1;
        }, getNext() {
            let newProbability = [];
            let sum = 0;
            for (let i = 0; i < 17; i++) {
                if (i === 12) newProbability.push(this.probability[this.type][i] * this.w1[this.cnt1[i]]);
                else newProbability.push(this.probability[this.type][i] * this.w2[this.cnt1[i]]);
                sum += newProbability[i];
            }
            let x = Math.floor(Math.random() * sum);
            for (let i = 0; i < 17; i++) {
                if (x < newProbability[i]) return i;
                x -= newProbability[i];
            }
            return -1;
        }, get(pos, id, level) {
            this.res1[pos] = {id: id, level: level};
            ++this.cnt1[id];
            if (id !== 0 && id !== 4 && id !== 5 && id <= 12 && level >= 4) this.hasTag1[pos] = true;
        }, check() {
            if (this.res1.length === 0) {
                this.work();
                return;
            }
            let c = 0;
            for (let i = 0; i < 4; i++) {
                for (const j of this.target) {
                    if (j === this.res1[i].id) ++c;
                }
            }
            if (c >= this.targetNum) this.dialogVisible2 = true;
            else this.work();
        }, work() {
            this.ly += 2;
            this.res1 = [0, 0, 0, 0];
            this.cnt1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.hasTag1 = [false, false, false, false];
            for (let i = 0; i < 4; i++) {
                if (this.locked[i]) {
                    this.get(i, this.res[i].id, this.res[i].level);
                    ++this.hc;
                }
            }
            let ok = true;
            for (let i = 0; i < 4; i++) {
                if (this.locked[i]) {
                    ok = false;
                    break;
                }
            }
            for (let i = 0; i < 4; i++) {
                if (!this.locked[i]) {
                    let id, level;
                    if (ok && this.bd === 0) id = 12;
                    else id = this.getNext();
                    if (id === 12) {
                        level = 5;
                        this.bd = Math.floor(Math.random() * 300) + 1200;
                    } else {
                        level = this.getLevel();
                        --this.bd;
                    }
                    this.get(i, id, level);
                }
            }
            if (!ok) this.bd = Math.floor(Math.random() * 300) + 1200;
        }, accept() {
            this.res = this.res1;
            this.res1 = [];
            this.cnt1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.bd = Math.floor(Math.random() * 300) + 1200;
            this.hasTag = this.hasTag1;
            this.hasTag1 = [false, false, false, false];
        }, clear() {
            this.ly = 0;
            this.hc = 0;
            this.res = [];
            this.res1 = [];
            this.cnt1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.bd = Math.floor(Math.random() * 300) + 1200;
            for (let i = 0; i < 4; i++) {
                this.locked[i] = false;
            }
            this.type = -1;
            this.target = [12];
            this.targetNum = 1;
            this.hasTag = [false, false, false, false];
            this.hasTag1 = [false, false, false, false];
        }, calcMin() {
            let c = 0;
            for (let i = 0; i < 4; i++) {
                if (this.locked[i] && this.res.length !== 0) {
                    for (const j of this.target) {
                        if (j === this.res[i].id) ++c;
                    }
                }
            }
            return c + 1;
        }
    }, watch: {
        locked: {
            handler() {
                if (this.targetNum < this.calcMin()) this.targetNum = this.calcMin();
            }
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
    margin-top: 15px;
    width: 100%;
    text-align: center;
}

.result-area {
    margin-top: 20px;
    width: 100%;
    text-align: center;
}

.select-area {
    margin-top: 10px;
    width: 100%;
    /*text-align: center;*/
}

.description {
    height: 30px;
}

.button-area .el-button {
    margin-bottom: 12px;
}
</style>