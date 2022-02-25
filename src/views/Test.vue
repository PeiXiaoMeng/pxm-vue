<template>
  <div>
    <span @click="handleLogin">{{ msg }}</span>
    <button @click="handleLogin">登录</button>
    <MyInput />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { auth, log } from '../utils';
import MyInput from '@/components/MyInput.vue';

@Component({
  components: {
    MyInput
  }
})
export default class Test extends Vue {

  private msg = '请登录';

  private mounted() {
    // TODO
  }

  private handleLogin() {
    auth.login().subscribe((result: any) => {
      log('======  login success  ======');
      log(result);
      this.msg = result.name;
    })
  }
}
</script>
