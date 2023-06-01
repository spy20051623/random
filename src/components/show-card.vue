<template>
  <div :class="'div'+' '+color+' '+dec">
    <span style="font-size: 20px">{{ type === 0 ? '天卡' : type === 1 ? '地卡' : '玄卡' }}{{ type <= 1 && attr === 1 ? '，但是歪了' : ''}}</span>
  </div>
</template>

<script>
export default {
  name: "show-card",
  props: {
    type: {
      type: 'number',
      default: 0
    }, attr: {
      type: 'number',
      default: 0
    }
  }, data() {
    return {
      color: this.type === 0 ? "T" : this.type === 1 ? "D" : "X",
      dec: this.attr === 0 ? "U" : "W"
    }
  }
}
</script>

<style scoped>
.div {
  height: 240px;
  margin-top: 20px;
  text-align: center;
  line-height: 240px;
}

.T {
  background-color: gold;
}

.D {
  background-color: mediumpurple;
}

.X {
  background-color: cornflowerblue;
}

.U {
  border: 5px solid red;
}

.W {
  border: 5px solid lightgray;
}
</style>