<template>
	<div class="app">
		<el-container class="container1">
			<el-header class="header" height="60px">
				<el-page-header @back="back" content="忘川风华录随机概率模拟器"/>
			</el-header>
			<el-container>
				<el-aside class="menubar" width="100px">
					<el-menu class="menu" default-active="card" router>
						<el-menu-item index="card"><span>抽卡</span></el-menu-item>
						<el-menu-item index="equipment"><span>洗装备</span></el-menu-item>
						<el-menu-item index="cat"><span>洗猫</span></el-menu-item>
						<el-menu-item index="card-g"><span>抽卡(G)</span></el-menu-item>
						<el-menu-item index="equipment-g"><span>洗装备(G)</span></el-menu-item>
						<el-menu-item index="cat-g"><span>洗猫(G)</span></el-menu-item>
						<el-menu-item index="cat-b"><span>洗猫(B)</span></el-menu-item>
					</el-menu>
				</el-aside>
				<el-main class="main">
					<router-view/>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import Card from "@/components/card.vue";
import Equipment from "@/components/equipment.vue";
import Cat from "@/components/cat.vue";
import CardG from "@/components/card-g.vue";
import EquipmentG from "@/components/equipment-g.vue";
import CatG from "@/components/cat-g.vue";
import CatB from "@/components/cat-b.vue";
import router from "@/router";

export default {
    components: {CatB, CardG, CatG, EquipmentG, Cat, Equipment, Card},
    data() {
        return {}
    },
    methods: {
        back() {
            location.assign('/../..')
        }
    }
}
</script>

<style>
.app {
    height: 100%;
}

.container1 {
    height: 100%;
}

.header {
    display: flex;
    background-color: #81e7ff;
    align-items: center;
}

.menubar {
    text-align: center;
    line-height: 200px;
}

.main {
    height: 100%;
    background-color: #c6f7ff;
}

.menu {
    text-align: center;
    background-color: #a9eeff;
    height: 100%;
}

html, body {
    margin: 0;
    height: 100%;
    width: 100%;
}
</style>
