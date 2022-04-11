<script>
// import { ref, watch } from 'vue';
// import { Form, Field, useField, ErrorMessage} from 'vee-validate';
// import * as Yup from 'yup'

// export default {
//   //  setup() {
//   //     const usr= useField('username', Yup.string()
//   //             .required("Username is required")
//   //             .max(15, "Username is too long"));
//   //     const username = usr.value
//   //     const errorUsr = usr.errorMessage
//   //     const pwd= useField('password', Yup.string()
//   //             .required("Password is required")
//   //             .min(6, "Password must contain a minimum of 6 characters"));
//   //     const password = pwd.value
//   //     const errorPwd = pwd.errorMessage
//   //   return {
//   //     username,
//   //     errorUsr,
//   //     password,
//   //     errorPwd,
//   //   };
//   // },
//   components: {
//     Form,
//     Field,
//     ErrorMessage,
//   },
//   data(){
//     const validUsr = Yup.string()
//               .required("Username is required")
//               .max(15, "Username is too long")
//     const validPwd = Yup.string()
//               .required("Password is required")
//               .min(6, "Password must contain a minimum of 6 characters")
//     //const validUsr = this.usename;
//     console.log(validUsr)
//     // const validPwd = this.password;
//     return {
//       validUsr,
//       validPwd,
//     };
//   },

//   methods: {
//     onSubmit(values) {
//       //console.log(values)
//       this.$router.push(`/generator`);
//     },
//   },
// };
// </script>

<template>
    <h1>Generateur de Visuel</h1>
    <button>talk</button>
    <button>training</button>
</template>

<style scoped>

</style>
