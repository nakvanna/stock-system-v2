<template>
  <q-page v-if="JSON.stringify(selected_product) !== '{}'">
    <div class="row q-pa-sm q-gutter-lg">
      <span class="text-h6 text-bold">បង្ហាញទំនិញ</span>
      <q-space/>
      <q-btn outline to="/settings" icon="fas fa-arrow-alt-circle-left"/>
    </div>
    <q-separator/>
    <div class="row">
        <div class="col-8">
          <div class="row q-pa-md">
            <q-card style="min-width: 100%">
              <q-card-section>
                <Strong>Title</Strong>
                <div class="row q-mt-md q-mb-lg">
                  {{selected_product.title}}
                  <q-popup-edit
                    @save="updateProductData(selected_product._id, 'title', selected_product.title)"
                    v-model="selected_product.title"
                  >
                    <q-input
                      outlined
                      dense
                      autofocus
                      class="full-width"
                      v-model="selected_product.title"
                      label="ចំណងជើង"
                    />
                  </q-popup-edit>
                </div>
                <strong>ពណ៌នា</strong>
                <div class="row q-mt-md">
                  <div v-html="selected_product.description"/>
                  <q-popup-edit
                    @save="updateProductData(selected_product._id, 'description', selected_product.description)"
                    v-model="selected_product.description" buttons
                    label-set="រក្សាទុក" label-cancel="ត្រឡប់"
                  >
                    <q-editor
                      v-model="selected_product.description"
                      counter @keyup.stop
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
                      toolbar-outline
                      min-height="5rem"/>
                  </q-popup-edit>
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
                <q-btn-dropdown v-if="selected.length !== 0" dense color="primary" outline label="More options">
                  <q-list>
                    <q-item clickable v-close-popup  @click="setImagePosition(selected.map(m => m._id))">
                      <q-item-section>
                        <q-item-label>Add Image</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>Remove Image</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>Delete Record</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
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
                    <q-popup-edit @save="updateProductOptionData(props.row._id, 'price', props.row.price)" v-model.number="props.row.price">
                      <q-input type="number" v-model.number="props.row.price" dense autofocus />
                    </q-popup-edit>
                  </q-td>
                  <q-td key="sku" :props="props">
                    {{props.row.sku}}
                    <q-popup-edit @save="updateProductOptionData(props.row._id, 'sku', props.row.sku)" v-model="props.row.sku">
                      <q-input v-model="props.row.sku" dense autofocus />
                    </q-popup-edit>
                  </q-td>
                  <q-td key="barcode" :props="props">
                    {{props.row.barcode}}
                    <q-popup-edit @save="updateProductOptionData(props.row._id, 'barcode', props.row.barcode)" v-model="props.row.barcode">
                      <q-input v-model="props.row.barcode" dense autofocus />
                    </q-popup-edit>
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
                <q-btn-dropdown v-if="selected.length !== 0" dense color="primary" outline label="More options">
                  <q-list>
                    <q-item clickable v-close-popup  @click="setImagePosition(selected.map(m => m._id))">
                      <q-item-section>
                        <q-item-label>Add Image</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="onItemClick">
                      <q-item-section>
                        <q-item-label>Remove Image</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="onItemClick">
                      <q-item-section>
                        <q-item-label>Delete Record</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
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
                  </q-td><q-td key="price" :props="props">
                  ${{props.row.price.toFixed(2)}}
                  <q-popup-edit @save="updateProductOptionData(props.row._id, 'price', props.row.price)" v-model.number="props.row.price">
                    <q-input type="number" v-model.number="props.row.price" dense autofocus />
                  </q-popup-edit>
                </q-td>
                  <q-td key="sku" :props="props">
                    {{props.row.sku}}
                    <q-popup-edit @save="updateProductOptionData(props.row._id, 'sku', props.row.sku)" v-model="props.row.sku">
                      <q-input v-model="props.row.sku" dense autofocus />
                    </q-popup-edit>
                  </q-td>
                  <q-td key="barcode" :props="props">
                    {{props.row.barcode}}
                    <q-popup-edit @save="updateProductOptionData(props.row._id, 'barcode', props.row.barcode)" v-model="props.row.barcode">
                      <q-input v-model="props.row.barcode" dense autofocus />
                    </q-popup-edit>
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
                <strong>Status</strong>
                <div class="row q-mt-md q-mb-lg">
                  {{selected_product.product_status}}
                  <q-popup-edit
                    @save="updateProductData(selected_product._id, 'product_status', selected_product.product_status)"
                    v-model="selected_product.product_status"
                  >
                    <q-select
                      outlined dense
                      class="full-width"
                      v-model="selected_product.product_status"
                      :options="['Draft', 'Active']"
                      label="Status"
                    />
                  </q-popup-edit>
                </div>
                <strong>Tags</strong>
                <div class="row q-mt-md q-mb-lg">
                  {{selected_product.tags}}
                  <q-popup-edit
                    buttons
                    @save="updateProductData(selected_product._id, 'tags', selected_product.tags)"
                    v-model="selected_product.tags"
                  >
                    <tag-input
                      :validate="false"
                      class="full-width"
                      dense outlined
                      label="Tags"
                      v-model="selected_product.tags"
                    />
                  </q-popup-edit>
                </div>
                <div v-if="selected_product.variant1 === null && selected_product.variant2 === null && selected_product.variant3 === null">
                  <strong>Price</strong>
                  <div class="row q-mt-md q-mb-lg">
                    ${{selected_product.product_option[0].price.toFixed(2)}}
                    <q-popup-edit
                      @save="updateProductOptionData(selected_product.product_option[0]._id, 'price', selected_product.product_option[0].price)"
                      v-model="selected_product.product_option[0].price"
                    >
                      <q-input
                        class="full-width"
                        dense outlined
                        v-model.number="selected_product.product_option[0].price"
                        label="Price"
                      />
                    </q-popup-edit>
                  </div>
                  <strong>SKU</strong>
                  <div class="row q-mt-md q-mb-lg">
                    {{selected_product.product_option[0].sku}}
                    <q-popup-edit
                      @save="updateProductOptionData(selected_product.product_option[0]._id, 'sku', selected_product.product_option[0].sku)"
                      v-model="selected_product.product_option[0].sku"
                    >
                      <q-input
                        class="full-width"
                        dense outlined
                        v-model="selected_product.product_option[0].sku"
                        label="SKU (Stock Keeping Unit)"
                      />
                    </q-popup-edit>
                  </div>
                  <strong>Barcode</strong>
                  <div class="row q-mt-md">
                    {{selected_product.product_option[0].barcode}}
                    <q-popup-edit
                      @save="updateProductOptionData(selected_product.product_option[0]._id, 'barcode', selected_product.product_option[0].barcode)"
                      v-model="selected_product.product_option[0].barcode"
                    >
                      <q-input
                        class="full-width"
                        dense outlined
                        v-model="selected_product.product_option[0].barcode"
                        label="Barcode"
                      />
                    </q-popup-edit>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    <add-variant-image :dialog.sync="dialog.add_variant_image" :variant_ids.sync="variant_ids" v-model="selected_product.product_media"/>
  </q-page>
</template>

<script lang="ts">
import SearchSelect from "components/SearchSelect.vue";
import {computed, reactive, ref, watch} from "@vue/composition-api";
import {category_graphql} from "pages/setting/sub-setting/category/graphql/category.graphql";
import {filter_sub_categories_graphql} from "pages/setting/sub-setting/sub-category/graphql/sub-category.graphql";
import {brand_graphql} from "pages/setting/sub-setting/brand/graphql/brand.graphql";
import TagInput from "components/TagInput.vue";
import AddVariantImage from "pages/setting/product/AddVariantImage.vue";
import {updateProductOption} from "pages/setting/product/view/store/product-option.store";

export default {
  name: "ProductView",
  components: {AddVariantImage, TagInput, SearchSelect},
  setup(props: any, context: any){
    const default_image = "https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
    const variant_ids = ref();
    const sub_cate = ref();
    const check_all = ref(false);
    const selected = ref([]);
    const columns = reactive({
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
    });

    //Condition filter
    const sub_category_condition = reactive({
      filter: {
        category_id: {
          $eq: null
        }
      }
    });

    //Set on position
    function setImagePosition(val: any){
      variant_ids.value = val;
      dialog.add_variant_image = true;
    }

    //Search select Query
    const query = reactive({
      categories: category_graphql,
      sub_categories: filter_sub_categories_graphql,
      brands: brand_graphql,
    });

    //Filter selected
    function filterSelected(option: any, variant: any){
      selected.value = [];
    }

    const filter_sub_category = computed(() => {
      const copy = Object.assign({}, JSON.parse(JSON.stringify(sub_category_condition.filter)));
      if (copy.category_id.$eq == null) {
        delete copy.category_id;
      } else {// @ts-ignore
        copy.category_id.$eq = copy.category_id.$eq?._id
      }
      return copy;
    });

    watch(() => filter_sub_category.value, (val) => {
      sub_cate.value.filterSelect(val);
    });

    const {updateProductOptionData} = updateProductOption(props, context);

    return {
      dialog,
      default_image,
      query,sub_cate,
      sub_category_condition,
      filter_sub_category,
      selected, variant_ids,
      check_all, columns,
      setImagePosition,
      filterSelected,
      updateProductOptionData,
    }
  }

}
</script>

<style lang="sass" scoped>

</style>
