<template>
  <div class="container" id="contact">
    <div class="info-item">
      <img src="@/assets/icons/icons8-email-50.png" class="icon" alt="icon email" />
      <div>
        <a href="mailto:ferreteríainsaurralde@gmail.com"
          >ferreteríainsaurralde@gmail.com</a
        >
      </div>
    </div>

    <div class="info-item">
      <img src="@/assets/icons/icons8-whatsapp-50.png" class="icon" alt="icon email" />
      <a href="https://api.whatsapp.com/send?phone=5491123456789" target="_blank">1560961726</a>
    </div>

    <div class="info-item">
      <img
        src="@/assets/icons/icons8-place-marker-50.png"
        class="icon"
        alt="icon email"
      />
      <div>
        <a href="https://maps.app.goo.gl/U3ofA1FnqJWrtaS6A" target="_blank"
          >Av. Sta María de Las Conchas 2210. Rincón de Milberg. Tigre, Buenos
          Aires</a
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: #072440;
  padding: 2.5em 3vw;
  color: #fff;
}
.info-item {
  font-size: 1.1em;
  display: flex;
  align-items: center;
  padding: 0.3em 0;
}

a {
  text-decoration: none;
  color: #fff;


}

a:hover {
    color: #4297c7;
  }
.icon {
  width: 2%;
  margin-right: .9em;
}
</style>
