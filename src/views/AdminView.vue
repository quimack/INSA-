<template>
    <CallBack  @codigoRecibido="handleCode" />
</template>

<script>
export default{
    name: 'VueAdmin',
    methods: {
        handleCode(authorizationCode) {
      // Ahora puedes usar authorizationCode en este componente
      console.log(authorizationCode);
    },
    }
}
</script>