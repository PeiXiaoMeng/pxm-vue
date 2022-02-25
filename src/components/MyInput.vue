<template>
  <input type="text" @input='handleInput'>
</template>

<script lang='ts'>
  import { Component, Vue } from 'vue-property-decorator';
  import { StremFlow } from '../utils';
  import { Observable, of } from 'rxjs';
  import { tap, catchError } from 'rxjs/operators';

  @Component
  export default class MyInput extends Vue {

    private mockHttp = (val: string) => {
      return new Observable((observer: any) => {
        setTimeout(() => {
          const result = {
            name: val,
          };
          observer.next({
            result,
          })
        }, 100)
      })
    }

    private _search$ = new StremFlow({
      data$Fn: (val: string) => this.mockHttp(val).pipe(
        tap(),
        catchError(() => of({ result: null } as any))
      ),
      next: (res) => {
        console.log(res);
      }
    })

    private handleInput(val: any) {
      this.$data._search$.next(val.target.value)
    }
  }
</script>