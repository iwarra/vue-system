<script setup>
import logo2 from '../assets/logo2.png';
let currentDate = Date.now();
</script>

<template>
  <footer>
    <div>
      <img :src="logo2" alt="Company logo">
      <span>Copyright © {{ new Date(currentDate).getFullYear() }} Hello Company</span>
    </div>
    <ul> Contact:
      <li> <a href="mailto:hello@company.com">hello@company.com</a> </li>
      <li> <a href="tel:+1234567890">+12 345 67 890</a> </li>
    </ul>
  </footer>
</template>


<style scoped>
  footer {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    padding-block: 25px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    ul {
      list-style: none;
    }
    a {
      color: #02b0cd;
    }
    span {
      color: #f5bf12;
      margin-left: 8px;
    };
  }
</style>