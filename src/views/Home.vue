<template>
  <div class="home">
    <b-container class="mt-5">
      <Form class="mb-3" />
      <Table />
    </b-container>
  </div>
</template>

<script>
import Table from '@/components/Table.vue'
import Form from '@/components/Form.vue'
export default {
  name: 'Home',
  components: { Table, Form }
}
</script>