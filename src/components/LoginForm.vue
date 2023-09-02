<script setup>
    function handleSubmit() {
      // Check errors 
      // Create user object
      // Add info to store
      // Add info to local storage
      // reset
    }
</script>

<template>
  <div>
    <h1>Please log in</h1>
    <form class="login-form" @submit.prevent="handleSubmit">
      <label for="name">Username:</label>
      <input type="text" id="name" v-model="username" ref="nameInput" />
      <span class="error"> {{ errorName }} </span>
      <label for="password">Password:</label>
      <input
        id="password"
        type="password"
        v-model="password"
        ref="passwordInput"
      />
      <span class="error"> {{ errorPassword }} </span>
      <button type="submit" class="btn">Log in</button>
    </form>
  </div>
</template>


<style  scoped>
h1 {
  text-align: center;
  font-weight: normal;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8em;
  margin-top: 3em;
}

label {
  font-size: large;
}

input {
  border: 0.5px solid rgb(208, 205, 205);
  border-radius: 5px;
  height: 2.3em;
  padding-inline-start: 0.8em;
  min-width: 50%;
}

.btn {
  border: 0.5px solid rgb(208, 205, 205);
  padding: 0.4em 2em;
  border-radius: 8px;
  background-color: #ffffff;
  font-size: large;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.1);
}

.btn:hover {
  cursor: pointer;
  background-color: #eee;
  transition: 0.8s;
}

.error {
  color: #d33529e3;
}
</style>