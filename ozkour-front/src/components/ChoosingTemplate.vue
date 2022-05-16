<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from 'yup'
const { useTalkStore }=require("@/stores/talks");
const { watch, ref }=require("@vue/runtime-core");

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const talk = useTalkStore()

    const selected = ref('')

    watch(selected, async (newSelect) => {
      talk.pickedTemplate(newSelect);
    });

    return {
      talk,
      selected,

    }
  },
  data() {
    // function validate() {
      // let valid = false

      // let form = document.querySelector('Form');
      // let radio = document.querySelector('Field');

      // function change(){
      // let template = document.getElementsByName('templateForm')
      // let len =  template.length;

      // for(let i = 0; i<len;i++){
      //   if(template[i].checked){
      //     radio.textContent = template[i].value;
      //   }
      // }
      // }

      // form.addEventListener('click',change);

      // if (template[0].checked===false &&
      //     template[1].checked===false &&
      //     template[2].checked===false &&
      //     template[3].checked===false
      //   )
      // {
      //   alert("please select a template")
      // }

      // console.log('valid',template);

      // for (var i=0; i<x.lenght; i++) {
      //   if(x[i].checked) {
      //     valid= true;
      //     break
      //   }

      //   if(valid) {
      //     alert ("Validation is successful")
      //   }
      //   else {
      //     alert("please select a template")
      //   }
      // }
    // }
    // return {
    //   change
    // }
    const ValidationSchema = Yup.object().nullable().shape({
      template: Yup.object()
        .required("You must choose a template")
        .oneOf([true])
    });

    return{
      ValidationSchema
    }
  },
  //   return {
  //     schema: {
  //       template: (value) => {
  //         // console.log('value template =',value);
  //         if (value) {
  //           return true;
  //         }

  //         return "You must choose a visuel";
  //       },
  //     },
  //   };
  // },
  methods: {
    onSubmit(values) {
      alert(JSON.stringify(values, null));
    }
  }
}

</script>

<template>
    <div action="#">
      <fieldset>
        <legend>Choisir un visuel</legend>
        <Form class="templateChoice" name="templateForm" :validation-schema="template" @submit="onSubmit">
          <div class="templateType">
            <Field
              as="input"
              type="radio"
              name="template"
              value="Quoi de 9"
              id="quoide9"
              class="radio-btn"
              v-model="selected"
              :rules = "ValidationSchema"
            ></Field>
            <span>QUOI DE 9</span>
          </div>
          <div class="templateType">
            <Field
              as="input"
              type="radio"
              name="template"
              value="E-mailing"
              id="emailing"
              class="radio-btn"
              v-model="selected"
              :rules = "ValidationSchema"
            ></Field> 
              <span>E-MAILING</span>
          </div>
          <div class="templateType">
            <Field
              as="input"
              type="radio"
              name="template"
              value="Meetup"
              id="meetup"
              class="radio-btn"
              v-model="selected"
              :rules = "ValidationSchema"
            ></Field>
              <span>MEET-UP</span>
          </div>
          <div class="templateType">
            <Field
              as="input"
              type="radio"
              name="template"
              value="Slack"
              id="slack"
              class="radio-btn"
              v-model="selected"
              :rules = "ValidationSchema"
            ></Field>
              <span>SLACK</span>
          </div>
          <span><ErrorMessage name="template" /></span>
          <button>Submit</button>
        </Form>
      </fieldset>
    </div>
</template>

<style scoped>
    fieldset {
      border: none;
    }
    legend {
      background-color: #FFFFFF;
      border-radius: 10px;
      color: #1E1E1E;
      font-size: 18px;
      font-weight: 800;
      padding: 10px 20px;
      margin-bottom: 10px;
    }
    .templateChoice {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      font-size: 16px;
      letter-spacing: .0.5rem;
      padding-left: 5px;
    }
    .templateType {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .radio-btn {
      cursor: pointer;
      accent-color: #BF1D67;
    }
    /* label {
      padding-left: 10px;
    } */
    .blurClass {
      -webkit-filter: blur(5px);
      filter: blur(5px);
}
</style>