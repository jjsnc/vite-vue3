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
</script>
