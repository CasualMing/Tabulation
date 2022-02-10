/*
 * @Author: CasualMing
 * @Date: 2021-11-24 09:29:04
 * @LastEditTime: 2021-11-30 18:47:08
 * @Description: 注册为vue插件
 * @FilePath: \sinosun-operation-ui\components\Tabulation\index.js
 */
import Tabulation from './Tabulation.vue';

Tabulation.install = Vue => Vue.component(Tabulation.name, Tabulation);

export default Tabulation;