<template>
  <div>
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div>
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script setup>
import { Sidebar, Navbar, AppMain } from "./index.js";
import { mapState } from "pinia";
import {  useAppStore } from "@/store/pinia";
import { computed } from "vue";
</script>
