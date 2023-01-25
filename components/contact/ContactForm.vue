<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="auto">
        <v-avatar :image="getPhoto" size="100"></v-avatar>
      </v-col>
    </v-row>
    <!--  text field bölümü -->
    <v-row>
      <v-col cols="6">
        <v-text-field
          variant="outlined"
          hide-details
          density="compact"
          label="İsim"
          v-model="requestContact.name"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          variant="outlined"
          hide-details
          density="compact"
          label="Soyisim"
          v-model="requestContact.surname"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-text-field
          variant="outlined"
          hide-details
          density="compact"
          label="Email"
          v-model="requestContact.email"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          variant="outlined"
          hide-details
          density="compact"
          label="Telefon Numarası"
          v-model="requestContact.phoneNumber"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-text-field
          variant="outlined"
          hide-details
          density="compact"
          type="date"
          label="Doğum Tarihi"
          v-model="requestContact.birthDate"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          variant="outlined"
          hide-details
          density="compact"
          label="Fotoğraf Adresi"
          v-model="requestContact.photoUrl"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center">
      <v-col cols="auto">
        <v-btn color="success" size="x-large" @click="createContact">
          Ekle</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script lang="ts">
import { Contact } from "@/models/Contact";
import { defineComponent } from "@vue/runtime-core";
import axios from "axios";

export default defineComponent({
  name: "ContactForm", // sayfanın ismini belirledik
  props: {
    // propsla üst kompenanttan gönderilen verileri alırız
    contact: {
      // contact değişkenimize contact tipini verdik
      type: Contact,
    },
  },
  data: () => ({
    // sayfada kullanacağımız değişkenleri burda belirtiyoruz.
    requestContact: new Contact(), // burada requestContact değişkenimiz contact tipinden yeni bir obje oluşturuyor.
  }),
  methods: {
    // burada sayfada kullanacağımız metodları yazıyoruz.
    createContact() {
      // bu metotta belirttiğimiz urlye verilerimizi post işlemi ile gönderiyoruz
      axios
        .post(
          "https://63cd2149fba6420d4d690748.mockapi.io/api/Contact",
          this.requestContact
        )
        .then((res: any) => {
          // yeni oluşan verileride contactEmit metodu ile üst kompenanta gönderiyoruz.
          this.$emit("contactEmit", res.data);
        });
    },
  },

  computed: {
    // computed direktifi, formda kullanılacak olan hesaplanmış değerleri tanımlar.
    getPhoto() {
      // getPhoto metodu, requestContact.photoUrl değişkeninin boş olup olmadığını kontrol eder ve boşsa varsayılan bir değer döndürür.
      if (this.requestContact.photoUrl == "") {
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3r7obHS9-Fr08iONgn5ZBYYIsllU-qT_5a7VYmCvw-eCUvi593W9srdxOdhro0JWvlYY&usqp=CAU";
      } else {
        return this.requestContact.photoUrl;
      }
    },
  },
});
</script>
  
  <style>
</style>