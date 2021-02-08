<template>
  <b-container fluid="md" dir="rtl" class="text-center">
    <h3 class="mt-3">
      <span class="blue"> الحدود الدنيا للقبول المركزي لسنة </span>
      <span class="pink">2020/2019</span>
    </h3>
    <small>تتضمن الحدود الدنيا لمعاهد النفط ايضاً</small>
    <hr class="col-8" />
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="6" class="my-1" align="center">
        <b-form-group
          label="بحث وفق"
          label-cols-sm="3"
          label-align-sm="left"
          label-size="lg"
          description="اترك خانات الاختيار فارغة للبحث عن الجميع!"
          class="mb-0"
        >
          <b-form-checkbox-group v-model="filterOn" class="mt-1" align="center">
            <b-form-checkbox value="university">الجامعة</b-form-checkbox>
            <b-form-checkbox value="collage">الكلية</b-form-checkbox>
            <b-form-checkbox value="sum">المجموع</b-form-checkbox>
            <b-form-checkbox value="result">المعدل</b-form-checkbox>
            <b-form-checkbox value="branch">الفرع</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" sm="10" class="my-1 mt-3">
        <b-form-group
          label="بحث"
          label-cols-sm="3"
          label-align-sm="left"
          label-size="lg"
          label-for="filterInput"
          description="ادخل أسم الكامل للجامعة او الكلية او جزء منهما وكذلك بالنسبة لبقية الاعمدة (المجموع...)."
        >
          <b-input-group size="md">
            <b-input-group-prepend is-text>
              <b-icon icon="search"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="بحث ..."
            >
            </b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''" variant="info"
                >مسح</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <!-- Main table element -->
    <div class="border">
      <b-table
        class="text-right"
        responsive
        small
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
      >
      </b-table>
      <h6 class="text-danger" v-if="totalRows === 0">
        لا توجد نتائج مطابقة, الرجاءا اتباع التعليمات تحت صندوق البحث!!
      </h6>
    </div>
    <b-row class="mt-2">
      <b-col sm="5" md="6" class="my-1 mb-2">
        <b-form-group
          label="لكل صفحة"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="left"
          label-size="lg"
          label-for="perPageSelect"
          class="mb-0"
          description="أختر عدد الجامعات لكل صفحة!"
        >
          <b-form-select
            v-model="perPage"
            id="perPageSelect"
            size="md"
            :options="pageOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col class="mt-2">
        <b-pagination
          pills
          align="center"
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          size="md"
        ></b-pagination>
      </b-col>
    </b-row>
    <div>
      للتواصل معي او أبلاغ عن مشكلة على
    </div>
    <b-link to="https://www.facebook.com/murtaja.adnan.52">
      <font-awesome-icon :icon="['fab', 'facebook']" size="4x"
    /></b-link>
    <b-link to="https://t.me/murt_14"
      ><font-awesome-icon :icon="['fab', 'telegram']" size="4x"
    /></b-link>
  </b-container>
</template>

<script>
import data from './data'
export default {
  data() {
    return {
      items: data,
      fields: [
        {
          key: 'number',
          label: 'ت',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-center'
        },
        {
          key: 'university',
          label: 'أسم الكلية',
          sortable: true,
          sortDirection: 'desc',
          class: 'col-6'
        },
        {
          key: 'sum',
          label: 'المجموع',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'result',
          label: 'المعدل',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'preference',
          label: 'المفاضلة',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'branch',
          label: 'الفرع',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'gender',
          label: 'الجنس',
          sortable: true,
          class: 'text-center'
        }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: 'اظهار الكثير' }],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: []
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key }
        })
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>
<style scoped>
.blue {
  color: rgb(92, 92, 163);
}
.pink {
  color: rgb(148, 93, 102);
}
.icon {
  position: relative;
  left: 190px;
  top: 40px;
}
</style>
