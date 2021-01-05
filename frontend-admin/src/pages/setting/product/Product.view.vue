<template>
  <q-page>
    <q-form
      @submit=""
    >
      <div class="row q-pa-md q-gutter-lg">
        <span class="text-h6 text-bold">បន្ថែមទំនិញថ្មី</span>
        <q-space/>
        <q-btn outline to="/settings" icon="fas fa-arrow-alt-circle-left"/>
      </div>
      <q-separator/>
      <div class="row">
        <div class="col-8">
          <div class="row q-pa-md">
            <q-card style="min-width: 100%">
              <q-card-section>
                <div class="row q-mt-md">
                  <q-input
                    outlined
                    dense
                    class="full-width"
                    v-model="selected_product.title"
                    label="ចំណងជើង"
                    hint="បំពេញឈ្មោះ"
                    :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                  />
                </div>
                <div class="row q-mt-md">
                  <strong>ពណ៌នា</strong>
                  <q-editor
                    class="full-width" :toolbar="[
                  [
                    {
                      label: $q.lang.editor.align,
                      icon: $q.iconSet.editor.align,
                      fixedLabel: true,
                      list: 'only-icons',
                      options: ['left', 'center', 'right', 'justify']
                    }
                  ],
                  ['bold', 'italic', 'strike', 'underline'],
                  ['undo', 'redo'],
                  ['viewsource']
                ]"
                    toolbar-outline v-model="selected_product.description"
                    min-height="5rem"/>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="row q-pa-md">
            <q-card style="min-width: 100%">
              <q-card-section>
                <strong>Media</strong>
                <div class="row q-gutter-md q-ma-md">
                  <q-img
                    :key="img_index"
                    v-for="(img, img_index) in selected_product.product_media"
                    spinner-color="red"
                    :src="img.src"
                    style="width: 180px"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
<!--          2Variants-->
          <div
            v-if="selected_product.variant1 !== null && selected_product.variant2 !== null && selected_product.variant3 === null"
            class="q-pa-md"
          >
            <q-table
              :data="selected_product.product_option"
              :columns="columns.column2"
              row-key="sku"
              selection="multiple"
              :selected.sync="selected"
              :rows-per-page-options="[0]"
            >
              <template v-slot:top>
                <div>
                  <q-btn
                    flat color="primary"
                    :key="'variant1'+index" v-for="(variant, index) in selected_product.variant1.values"
                    @click="filterSelected('option1',variant)" :label="variant"
                  />
                  <q-btn
                    flat color="primary"
                    :key="'variant2'+index" v-for="(variant, index) in selected_product.variant2.values"
                    @click="filterSelected('option2',variant)" :label="variant"
                  />
                </div>
                  <q-space/>
                  <div v-if="selected.length !== 0">
                    <q-btn @click="setImagePosition(selected.map(m => m._id))" flat color="primary" label="Add Image"/>
                    <q-btn flat color="primary" label="Remove Image"/>
                  </div>
              </template>
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td>
                    <q-checkbox v-model="props.selected" />
                  </q-td>
                  <q-td key="image_position" :props="props">
                    <q-img
                      v-if="props.row.image_position === 0"
                      @click="setImagePosition([props.row._id])"
                      class="cursor-pointer"
                      spinner-color="red"
                      :src="default_image"
                      style="height: 40px; width: 40px"
                    />
                    <q-img
                      v-else
                      @click="setImagePosition([props.row._id])"
                      class="cursor-pointer"
                      spinner-color="red"
                      :src="selected_product.product_media.filter(f => f.position === props.row.image_position)[0].src"
                      style="height: 40px; width: 40px"
                    />
                  </q-td>
                  <q-td key="option1" :props="props">
                    {{props.row.option1}}
                  </q-td>
                  <q-td key="option2" :props="props">
                    {{props.row.option2}}
                  </q-td>
                  <q-td key="price" :props="props">
                    ${{props.row.price.toFixed(2)}}
                  </q-td>
                  <q-td key="sku" :props="props">
                    {{props.row.sku}}
                  </q-td>
                  <q-td key="barcode" :props="props">
                    {{props.row.barcode}}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
<!--          3Variants-->
          <div
            v-if="selected_product.variant1 !== null && selected_product.variant2 !== null && selected_product.variant3 !== null"
            class="q-pa-md"
          >
            <q-table
              :data="selected_product.product_option"
              :columns="columns.column3"
              row-key="sku"
              selection="multiple"
              :selected.sync="selected"
              :rows-per-page-options="[0]"
            >
              <template v-slot:top>
                <div>
                  <q-btn
                    flat color="primary"
                    :key="'variant1'+index" v-for="(variant, index) in selected_product.variant1.values"
                    @click="filterSelected('option1',variant)" :label="variant"
                  />
                  <q-btn
                    flat color="primary"
                    :key="'variant2'+index" v-for="(variant, index) in selected_product.variant2.values"
                    @click="filterSelected('option2',variant)" :label="variant"
                  />
                  <q-btn
                    flat color="primary"
                    :key="'variant3'+index" v-for="(variant, index) in selected_product.variant3.values"
                    @click="filterSelected('option3',variant)" :label="variant"
                  />
                </div>
                  <q-space/>
                  <div v-if="selected.length !== 0">
                    <q-btn @click="setImagePosition(selected.map(m => m._id))" flat color="primary" label="Add Image"/>
                    <q-btn flat color="primary" label="Remove Image"/>
                  </div>
              </template>
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td>
                    <q-checkbox v-model="props.selected" />
                  </q-td>
                  <q-td key="image_position" :props="props">
                    <q-img
                      v-if="props.row.image_position === 0"
                      @click="setImagePosition([props.row._id])"
                      class="cursor-pointer"
                      spinner-color="red"
                      :src="default_image"
                      style="height: 40px; width: 40px"
                    />
                    <q-img
                      v-else
                      @click="setImagePosition([props.row._id])"
                      class="cursor-pointer"
                      spinner-color="red"
                      :src="selected_product.product_media.filter(f => f.position === props.row.image_position)[0].src"
                      style="height: 40px; width: 40px"
                    />
                  </q-td>
                  <q-td key="option1" :props="props">
                    {{props.row.option1}}
                  </q-td>
                  <q-td key="option2" :props="props">
                    {{props.row.option2}}
                  </q-td>
                  <q-td key="option3" :props="props">
                    {{props.row.option3}}
                  </q-td>
                  <q-td key="price" :props="props">
                    ${{props.row.price.toFixed(2)}}
                  </q-td>
                  <q-td key="sku" :props="props">
                    {{props.row.sku}}
                  </q-td>
                  <q-td key="barcode" :props="props">
                    {{props.row.barcode}}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
        <div class="col-4">
          <div class="row q-pa-md">
            <q-card style="min-width: 100%">
              <q-card-section>
                <strong>Other</strong>
                <div class="row q-mt-md">
                  <q-select
                    outlined dense
                    class="full-width"
                    v-model="selected_product.product_status"
                    :options="['Draft', 'Active']"
                    label="Status"
                  />
                </div>
                <div class="row q-mt-md">
                  <tag-input
                    :validate="false"
                    class="full-width"
                    dense outlined
                    label="Tags"
                    v-model="selected_product.tags"
                  />
                </div>
                <div class="row q-mt-md">
                  <q-input
                    class="full-width"
                    dense outlined
                    v-model.number="selected_product.product_option[0].price"
                    label="Price"
                  />
                </div>
                <div class="row q-mt-md">
                  <q-input
                    class="full-width"
                    dense outlined
                    v-model="selected_product.product_option[0].sku"
                    label="SKU (Stock Keeping Unit)"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </q-form>
    <add-variant-image :dialog.sync="dialog.add_variant_image" :variant_ids.sync="img_id" v-model="selected_product.product_media"/>
  </q-page>
</template>

<script lang="ts">
import SearchSelect from "components/SearchSelect.vue";
import { selected_product } from './store/product.store'
import {computed, reactive, ref, watch} from "@vue/composition-api";
import {category_graphql} from "pages/setting/sub-setting/category/graphql/category.graphql";
import {filter_sub_categories_graphql} from "pages/setting/sub-setting/sub-category/graphql/sub-category.graphql";
import {brand_graphql} from "pages/setting/sub-setting/brand/graphql/brand.graphql";
import TagInput from "components/TagInput.vue";
import AddVariantImage from "pages/setting/product/AddVariantImage.vue";

export default {
  name: "ProductView",
  components: {AddVariantImage, TagInput, SearchSelect, selected_product},
  setup(){
    const default_image = "https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
    const img_id = ref();
    const sub_cate = ref();
    const check_all = ref(false)
    const selected = ref([]);
    const columns = reactive({
      column1: [],
      column2: [
        {
          name: 'image_position',
          required: true,
          label: 'រូបភាព',
          align: 'left',
          field: 'image_position',
          sortable: true
        },
        {
          name: 'option1',
          required: true,
          label: 'Option1',
          align: 'left',
          field: 'option1',
          sortable: true
        },
        {
          name: 'option2',
          required: true,
          label: 'Option2',
          align: 'left',
          field: 'option2',
          sortable: true
        },
        {
          name: 'price',
          required: true,
          label: 'តម្លៃ',
          align: 'left',
          field: 'price',
          sortable: true
        },
        {
          name: 'sku',
          required: true,
          label: 'SKU',
          align: 'left',
          field: 'sku',
          sortable: true
        },
        {
          name: 'barcode',
          required: true,
          label: 'Barcode',
          align: 'left',
          field: 'barcode',
          sortable: true
        },
      ],
      column3: [
        {
          name: 'image_position',
          required: true,
          label: 'រូបភាព',
          align: 'left',
          field: 'image_position',
          sortable: true
        },
        {
          name: 'option1',
          required: true,
          label: 'Option1',
          align: 'left',
          field: 'option1',
          sortable: true
        },
        {
          name: 'option2',
          required: true,
          label: 'Option2',
          align: 'left',
          field: 'option2',
          sortable: true
        },
        {
          name: 'option3',
          required: true,
          label: 'Option3',
          align: 'left',
          field: 'option3',
          sortable: true
        },
        {
          name: 'price',
          required: true,
          label: 'តម្លៃ',
          align: 'left',
          field: 'price',
          sortable: true
        },
        {
          name: 'sku',
          required: true,
          label: 'SKU',
          align: 'left',
          field: 'sku',
          sortable: true
        },
        {
          name: 'barcode',
          required: true,
          label: 'Barcode',
          align: 'left',
          field: 'barcode',
          sortable: true
        },
      ],
    });

    const dialog = reactive({
      add_variant_image: false
    })

    const sub_category_condition = reactive({
      filter: {
        category_id: {
          $eq: null
        }
      }
    });

    function setImagePosition(val: any){
      img_id.value = val;
      dialog.add_variant_image = true;
    }

    const query = reactive({
      categories: category_graphql,
      sub_categories: filter_sub_categories_graphql,
      brands: brand_graphql,
    });

    function filterSelected(option: any, variant: any){
      selected.value = [];
      selected.value = selected_product.value.product_option.filter((f:any) => f[option] === variant)
    }

    const filter_sub_category = computed(() => {
      const copy = Object.assign({}, JSON.parse(JSON.stringify(sub_category_condition.filter)));
      if (copy.category_id.$eq == null) {
        delete copy.category_id
      } else {
        // @ts-ignore
        copy.category_id.$eq = copy.category_id.$eq?._id
      }
      return copy;
    })
    watch(() => filter_sub_category.value, (val) => {
      sub_cate.value.filterSelect(val)
    });
    return {
      dialog,
      default_image,
      query,
      sub_category_condition,
      sub_cate,
      filter_sub_category,
      selected_product,
      selected,
      check_all,
      columns,
      img_id,
      setImagePosition,
      filterSelected
    }
  }

}
</script>

<style lang="sass" scoped>

</style>
