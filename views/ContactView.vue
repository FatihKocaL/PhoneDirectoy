<template>
  <v-container>
    <v-tabs
      v-model="contactCurrentTab"
      background-color="#463f3a"
      class="tabs"
      fixed
    >
      <v-tab v-for="tab in tabs" :key="tab.id">
        <v-row align="center" @click="$router.push(tab.route)">
          <v-icon v-if="tab.id == -1" small
            >mdi-format-list-bulleted-square</v-icon
          >
          <v-icon v-if="tab.id == 0" small>mdi-plus-box</v-icon>
          <v-icon v-if="tab.id > 0" small>mdi-account</v-icon>
          <v-col
            class="text-truncate"
            :style="tab.id > 0 ? 'max-width: 15rem' : ''"
            @click.middle="tab.id > 0 && removeTab(tab.id)"
          >
            {{ tab.name }}
          </v-col>
          <v-icon
            v-if="tab.id > 0"
            role="button"
            size="small"
            @click.prevent="removeTab(tab.id)"
          >
            mdi-close-thick</v-icon
          >
        </v-row>
      </v-tab>
    </v-tabs>
    <router-view
      @contactEmit="addTab($event)"
      @deleteEmit="removeTab($event.id)"
      :sampleProp="tabs"
    />
  </v-container>
</template>
    
    <script lang="ts">
import { Contact } from "@/models/Contact";
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  name: "ContactView",
  data: () => ({
    tabs: [
      // tabs nesnesinde, "Kişiler" ve "Kişi Ekle" sekmelerinin adı, kimliği ve rotası tanımlanır.
      {
        name: "Kişiler",
        id: -1,
        route: "/",
      },
      {
        name: "Kişi Ekle",
        id: 0,
        route: "/contactForm",
      },
    ],
    contactCurrentTab: 0, // contactCurrentTab değişkeni, kullanıcının o an seçtiği sekmenin kimliğini tutar.
  }),
  methods: {
    // addTab metodu, yeni bir kişi için yeni bir sekme ekler ve kullanıcının bu kişinin detaylarını görüntülemek için bu sekmeye yönlendirir. Eğer bu kişi için zaten bir sekme var ise, yine de yeni bir sekme eklenmez.
    addTab(item: Contact) {
      if (this.tabs.some((x) => x.id == item.id) == false) {
        // gelen contactın tabı açık değilse, git tab ekle
        this.tabs.push({
          name: item.name,
          id: item.id,
          route: `/contactDetail/${item.id}`,
        });
      }
      this.$router.push({
        name: "contactDetail",
        params: { contactId: item.id },
      });
      this.contactCurrentTab = item.id;
    },
    // removeTab metodu, kullanıcının sekmeler arasında gezinirken, sekme kapatmak için üzerine tıkladığı sekmenin kimliğini alır ve bu sekmeyi tabs nesnesinden siler. Aynı zamanda, kullanıcı "Kişiler" sekmesine yönlendirilir.
    removeTab(itemId: number) {
      const indexOff = this.tabs.findIndex((x: any) => x.id == itemId);
      this.tabs.splice(indexOff, 1);
      setTimeout(() => {
        this.contactCurrentTab = 0;
        this.$router.replace("/");
      }, 25);
    },
  },

  mounted() {
    // sayfa yenilendiğinde eğer açık bir contactDetaili varsa o sayfanın açık kalmasını sağladık.
    if (this.$route.name == "contactDetail") {
      axios
        .get(
          "https://63cd2149fba6420d4d690748.mockapi.io/api/Contact/" +
            this.$route.params.contactId
        )
        .then((res: any) => {
          this.addTab(res.data);
        });
    }
  },
});
</script>
    
    <style>
</style>