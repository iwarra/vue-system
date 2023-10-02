<script setup>
import logo2 from '../assets/logo2.png';
let currentDate = Date.now();
</script>

<template>
  <footer class="footer">
    <div>
      <img :src="logo2" alt="Company logo">
      <span class="copyText">Copyright &copy; {{ new Date(currentDate).getFullYear() }} Hello Company</span>
    </div>
    <ul class="links-list"> Contact:
      <li> <a  class="link" href="mailto:hello@company.com">hello@company.com</a> </li>
      <li> <a href="tel:+1234567890" class="link">+12 345 67 890</a> </li>
    </ul>
  </footer>
</template>


<style scoped>
  .footer {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    padding-block: 25px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    .links-list {
      list-style: none;
    }
    .link {
      color: var(--primary-accent);
    }
    .copyText {
      color: var(--secondary-accent);
      margin-left: 8px;
    };
  }

  @media only screen and (max-width: 560px) {
  .footer {
    flex-direction: column;
    gap: 20px;
    align-items: center;
    padding-block: 15px;
  }
}
</style>