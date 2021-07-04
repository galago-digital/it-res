<template>
  <b-card class="user-form">
    <b-form @submit.prevent="submit" v-if="show">
      <b-row>
        <b-col sm="12" md="6" lg="4">
          <b-form-group
            label="ФИО"
            label-for="name"
            :invalid-feedback="'Поле не должно быть пустым'"
            :state="$v.name.$dirty ? $v.name.required : null"
          >
            <b-form-input
              id="name"
              v-model.trim="name"
              @blur="$v.name.$touch"
              :state="$v.name.$dirty ? $v.name.required : null"
            />
          </b-form-group>
        </b-col>
        <b-col sm="12" md="6" lg="4">
          <b-form-group
            label="Дата рождения"
            label-for="date"
            :invalid-feedback="'Поле не должно быть пустым'"
            :state="$v.date.$dirty ? $v.date.required : null"
          >
            <b-form-datepicker
              id="date"
              v-model="date"
              :max="new Date()"
              @input="$v.date.$touch"
              placeholder="Выбрать дату"
              class="mb-2"
              :state="$v.date.$dirty ? $v.date.required : null"
            />
          </b-form-group>
        </b-col>
        <b-col sm="12" md="6" lg="4">
          <b-form-group
            label="Email"
            label-for="email"
            :invalid-feedback="
              $v.email.$dirty && !$v.email.required
                ? 'Поле не должно быть пустым'
                : 'Некорректный Email'
            "
            :state="
              $v.email.$dirty ? $v.email.required && $v.email.email : null
            "
          >
            <b-form-input
              id="email"
              v-model.trim="email"
              @blur="$v.email.$touch"
              :state="
                $v.email.$dirty ? $v.email.required && $v.email.email : null
              "
            />
          </b-form-group>
        </b-col>
        <b-col sm="12" md="6" lg="4">
          <b-form-group
            label="Телефон"
            label-for="phone"
            :invalid-feedback="
              $v.phone.$dirty && !$v.phone.required
                ? 'Поле не должно быть пустым'
                : 'Некорректный номер телефона'
            "
            :state="
              $v.phone.$dirty
                ? $v.phone.required && $v.phone.minLength && $v.phone.maxLength
                : null
            "
          >
            <b-form-input
              id="phone"
              v-mask="'+7 (###) ###-##-##'"
              v-model.trim="phone"
              @blur="$v.phone.$touch"
              :state="
                $v.phone.$dirty
                  ? $v.phone.required &&
                    $v.phone.minLength &&
                    $v.phone.maxLength
                  : null
              "
            />
          </b-form-group>
        </b-col>
        <b-col sm="12" md="6" lg="4">
          <b-form-group
            label="Дистанция"
            label-for="distance"
            :invalid-feedback="'Не выбрана дистанция'"
            :state="$v.distance.$dirty ? $v.distance.required : null"
          >
            <b-form-select
              id="distance"
              v-model.trim="distance"
              @change="$v.distance.$touch"
              :state="$v.distance.$dirty ? $v.distance.required : null"
            >
              <b-form-select-option value="3">3 км</b-form-select-option>
              <b-form-select-option value="5">5 км</b-form-select-option>
              <b-form-select-option value="10">10 км</b-form-select-option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="6" lg="4">
          <b-form-group
            label="Сумма взноса (₽)"
            label-for="payment"
            :invalid-feedback="'Поле не должно быть пустым'"
            :state="$v.payment.$dirty ? $v.payment.required : null"
          >
            <b-form-input
              id="payment"
              type="number"
              v-model.trim="payment"
              @change="$v.payment.$touch"
              :state="$v.payment.$dirty ? $v.payment.required : null"
            />
          </b-form-group>
        </b-col>
        <b-col sm="12" class="mt-3 text-center">
          <b-button :disabled="$v.$invalid" type="submit" variant="primary">
            Отправить заявку
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import { email, required, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
export default {
  name: 'Form',
  data: () => ({
    name: '',
    date: '',
    email: '',
    phone: '',
    distance: null,
    payment: null,
    show: true
  }),
  validations: {
    name: { required },
    date: { required },
    email: { required, email },
    phone: { required, minLength: minLength(18), maxLength: maxLength(18) },
    distance: { required },
    payment: { required }
  },
  watch: {
    phone(value) {
      if (value) {
        let val = value
        if (val[0] === '8') {
          val = val.replace('8', '+7')
        }
        if ((val.replace(/[^0-9]+/g, '') === '789') || (val.replace(/[^0-9]+/g, '') === '779')) {
          val = '+79'
        }
        this.phone = val
      }
    }
  },
  methods: {
    ...mapActions(['addUser']),
    phoneClean(phone) {
      return phone.replace(/[^+,0-9]/g, '')
    },
    submit() {
      if (!this.$v.$invalid) {
        const user = {
          name: this.name,
          date: this.date,
          email: this.email,
          phone: this.phoneClean(this.phone),
          distance: this.distance,
          payment: this.payment,
          created_at: (new Date()).toJSON()
        }
        this.addUser(user)
        this.reset()
      }
    },
    reset() {
      this.name = ''
      this.date = ''
      this.email = ''
      this.phone = ''
      this.distance = 0
      this.payment = 0
      this.show = false
      this.$v.$reset()
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>