<template>
  <div>
    <h3>Tiendaaa</h3>
    <ProductComponent imgSrc="/img/demo3.jpg" />
    <!-- <button @click="startGoogleDriveLogin">
      Iniciar sesión con Google Drive
    </button> -->
  </div>
</template>

<script setup>
import ProductComponent from "@/components/ProductComponent.vue";


const fileId="11gGY9ArgQbWmoPX48QAn6x89NMDAa9HRTBvvFSzniuc"

  //   startGoogleDriveLogin() {
  //     // URL de autorización de Google Drive
  //     const authorizationEndpoint = "https://accounts.google.com/o/oauth2/auth";

  //     // Parámetros de la solicitud de autorización

  //     const clientId =
  //       "1021058833600-vq6mp5dhvb6e5alkfldamgslrnc12a33.apps.googleusercontent.com";
  //     const redirectUri = "http://localhost:8080"; // Reemplaza con tu URI de redirección
  //     const scope = "https://www.googleapis.com/auth/drive"; // Alcance para acceder a Google Drive
  //     const responseType = "code"; // Tipo de respuesta esperada

  //     // Construir la URL de autorización
  //     const authorizationUrl = `${authorizationEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;

  //     // Redirigir al usuario a la página de autorización de Google Drive
  //     window.location.href = authorizationUrl;
  //   },
  //   async authenticateGoogleDrive() {
  //     try {
  //       const clientId =
  //         "1021058833600-vq6mp5dhvb6e5alkfldamgslrnc12a33.apps.googleusercontent.com";
  //       const apiKey = "AIzaSyB0qxJbZcpzSm7DjpN181iRQmthsIivkEQ";
  //       const searchDoc =
  //         "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";
  //       console.log("API KEY", apiKey, clientId, searchDoc);
  //       // Configuración para obtener el token de acceso
  //       const tokenEndpoint = "https://oauth2.googleapis.com/token";
  //       const clientSecret = "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"; // Reemplaza con tu secreto de cliente
  //       const redirectUri = "http://localhost:8080"; // Reemplaza con tu URI de redirección

  //       // Obtén el código de autorización (manual o a través de algún flujo de autenticación)
  //       const authorizationCode =
  //         "4/0AfJohXl6IVYvpfwvBnS9SrU4YaJ2eokMSFsV5G6ALphr0pUFAgiQPSxq_2Id2vgkXJecZA";

  //       // Intercambio del código de autorización por el token de acceso
  //       const tokenResponse = await axios.post(tokenEndpoint, {
  //         code: authorizationCode,
  //         client_id: clientId,
  //         client_secret: clientSecret,
  //         redirect_uri: redirectUri,
  //         grant_type: "authorization_code",
  //       });

  //       const accessToken = tokenResponse.data.access_token;

  //       // Ahora puedes realizar solicitudes a la API de Google Drive utilizando el accessToken
  //       const driveEndpoint = "https://www.googleapis.com/drive/v3/files";
  //       const driveResponse = await axios.get(driveEndpoint, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });

  //       console.log("Respuesta de Google Drive API:", driveResponse.data);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   },
</script>

<style scoped>
div {
  width: 100%;
  min-height: 70vh;
}
</style>
