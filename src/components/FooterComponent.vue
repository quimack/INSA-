<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="container">
        <div class="footer-brand">
          <div class="width-100">
            <a href="#" class="logo">
              <img src="../assets/images/insainvertido.png" to="/" alt="Homeverse logo" />
            </a>


            <p class="section-text">
              Con más de 30 años de experiencia, destacamos en productos ferretería de
              alta calidad y precios competitivos.
            </p>
          </div>
          <div class="width-100">
            <ul class="contact-list">
              <li>
                <a href="https://maps.app.goo.gl/t7E4hnodawouZH6C6" target="blanc" class="contact-link">

                  <ion-icon name="location-outline"></ion-icon>

                  <span>
                    Av. Sta María 2200. Rincón de Milberg. Tigre, Buenos Aires
                  </span>
                </a>
              </li>

              <li>
                <a href="https://api.whatsapp.com/send?phone=5491123456789" class="contact-link">
                  <ion-icon name="call-outline"></ion-icon>

                  <span>15-6096-1726</span>
                </a>
              </li>

              <li>
                <a href="mailto:ferreteroinsaurralde@gmail.com" class="contact-link">
                  <ion-icon name="mail-outline"></ion-icon>

                  <span>ferreteroinsaurralde@gmail.com</span>
                </a>
              </li>
            </ul>

            <ul class="social-list">
              <li>
                <a href="#" class="social-link">
                  <ion-icon name="logo-facebook"></ion-icon>
                </a>
              </li>

              <li>
                <a href="#" class="social-link">
                  <ion-icon name="logo-instagram"></ion-icon>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <p class="copyright">&copy; 2024 <a href="#">bug</a>. All Rights Reserved</p>
      </div>
    </div>
  </footer>
  <!--   <div class="container" id="contact">
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
  </div> -->
</template>

<style scoped>
/* .container {
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
} */

.footer {
  background: var(--raisin-black-1);
  color: var(--white);
}

.footer .container {
  padding-inline: 30px;
}

.footer a {
  color: inherit;
}

.footer-top {
  padding-top: 80px;
  padding-bottom: 40px;
}

.footer-brand {
  margin-bottom: 70px;
}

.footer-brand .logo {
  margin-bottom: 15px;
}

.section-text {
  font-size: var(--fs-5);
  line-height: 1.8;
  margin-bottom: 30px;
  max-width: 45ch;
}

.contact-list {
  display: grid;
  gap: 15px;
  margin-bottom: 30px;
}

.contact-link {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.contact-link ion-icon {
  font-size: 18px;
}

.contact-link :is(address, span) {
  font-size: var(--fs-5);
  transition: var(--transition);
}

.contact-link:is(:hover, :focus) span {
  color: var(--orange-soda);
}

.social-list {
  display: flex;
  align-items: center;
  gap: 20px;
}

.footer-list:not(:last-child) {
  margin-bottom: 50px;
}

.footer-list-title {
  font-family: var(--ff-poppins);
  font-size: var(--fs-3);
  font-weight: var(--fw-700);
  margin-bottom: 15px;
}

.footer-link {
  font-size: var(--fs-5);
  padding-block: 10px;
}

.footer-link:is(:hover, :focus) {
  color: var(--orange-soda);
}

.footer-bottom {
  background: var(--raisin-black-2);
  padding-block: 25px;
}

.copyright {
  font-size: var(--fs-5);
  text-align: center;
}

.copyright a {
  display: inline-block;
}

.copyright a:is(:hover, :focus) {
  color: var(--orange-soda);
}

@media (min-width: 600px) {
  .footer-link-box {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
}

@media (min-width: 768px) {
  .footer {
    margin-bottom: 0;
  }
}

@media (min-width: 992px) {
  .width-100 {
    width: 100%;
  }
  .footer-top .container {
    display: flex;
    justify-content: center;
  }

  .footer-brand {
    display: flex;
    margin-bottom: 0;
  }

  .footer-link-box {
    flex-basis: 550px;
  }
  .header-bottom-right{
    margin-left: 42rem;
  }
}


@media (min-width: 1200px) {
  .footer {
    --fs-5: 1rem;
  }

  .footer-link-box {
    flex-basis: 700px;
  }
  .header-bottom-right{
    margin-left: 42rem;
  }
}
</style>
