<template>
  <div>home</div>
</template>
<script setup>
import { useStore } from "@/store";

let store = useStore();

console.log(store.name, "useStore");

import { httpDashboardCampaignTop10 } from "@/api/home";

// console.log(httpDashboardCampaignTop10)
// httpDashboardCampaignTop10().then(res=>{
//     console.log(res,'6666')
// })
</script>
