<template>
  <div class="users-table">
    <b-table
      id="users-table"
      striped
      hover
      :items="users"
      :fields="fields"
      primary-key="id"
      sort-by="created_at"
      sort-desc
      :sort-compare="sortCompare"
      :per-page="perPage"
      :current-page="currentPage"
      stacked="lg"
      small
      caption-top
      :busy="loading"
    >
      <template #table-caption> Таблица благотворительного забега </template>
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Загрузка данных...</strong>
        </div>
      </template>
    </b-table>
    <b-pagination
      v-if="rows > perPage"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="users-table"
      align="center"
    ></b-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { users } from '@/users.json'
export default {
  name: 'Table',
  data: () => ({
    loading: true,
    fields: [
      { key: 'name', label: 'Имя' },
      {
        key: 'date',
        label: 'Дата рождения',
        sortable: true,
        formatter: 'dateFormat'
      },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Телефон' },
      {
        key: 'distance',
        label: 'Дистанция',
        sortable: true,
        formatter: (value) => (`${value} км`)
      },
      {
        key: 'payment',
        label: 'Сумма взноса',
        sortable: true,
        formatter: (value) => (`${value} ₽`)
      },
      {
        key: 'created_at',
        label: 'Дата регистрации',
        sortable: true,
        formatter: 'dateFormat'
      }
    ],
    perPage: 8,
    currentPage: 1
  }),
  computed: {
    ...mapGetters(['users']),
    rows() { if (this.users) { return this.users.length } }
  },
  mounted() {
    this.setUsers(users)
    this.loading = false
  },
  methods: {
    ...mapActions(['setUsers']),
    dateFormat(date) {
      const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }
      return new Intl.DateTimeFormat('ru-RU', options).format(new Date(date))
    },
    sortCompare(a, b, key) {
      if (key === 'date' || key === 'created_at') {
        return new Date(a[key]) - new Date(b[key])
      } else {
        return false
      }
    }
  }
}
</script>