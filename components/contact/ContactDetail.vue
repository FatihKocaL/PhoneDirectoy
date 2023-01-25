<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="auto">
        <v-avatar :image="getPhoto" size="100"></v-avatar>
      </v-col>
    </v-row>
    <!--  text field bölümü  -->
    <v-row>
      <v-col cols="6">
        <v-text-field
          variant="outlined"
          hide-details
          density="compact"
          label="İsim"
          v-model="requestDetail.name"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          variant="outlined"
          hide-details
          density="compact"
          label="Soyisim"
          v-model="requestDetail.surname"
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
          v-model="requestDetail.email"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          variant="outlined"
          hide-details
          density="compact"
          label="Telefon Numarası"
          v-model="requestDetail.phoneNumber"
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
          v-model="requestDetail.birthDate"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          variant="outlined"
          hide-details
          density="compact"
          label="Fotoğraf Adresi"
          v-model="requestDetail.photoUrl"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center">
      <v-col cols="auto">
        <v-btn color="error" size="x-large" @click="deleteContact">
          Delete</v-btn
        >
      </v-col>
      <v-col cols="auto">
        <v-btn color="success" size="x-large" @click="updateContact">
          update</v-btn
        >
      </v-col>
      <v-alert
        location="top right"
        position="absolute"
        v-model="alert"
        closable
        type="success"
        >Güncelleme Başarılı.</v-alert
      >
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Contact } from "@/models/Contact";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContactDetail",
  data: () => ({
    alert: false,
    requestDetail: new Contact(),
  }),
  methods: {
    deleteContact() {
      //deleteContact() metodu, kişinin silinmesini sağlar. Bu metodun içinde, axios ile kişinin ID'si ile url adresine "DELETE" methodu ile istek yapar ve kişi silinir.
      axios
        .delete(
          "https://63cd2149fba6420d4d690748.mockapi.io/api/Contact/" +
            this.requestDetail.id
        )
        .then((res: any) => {
          this.$emit("deleteEmit", res.data);
        });
    },
    updateContact() {
      //updateContact metodu, kişinin bilgilerinin güncellenmesini sağlar. Bu metodun içinde, axios ile kişinin ID'si ve güncellenmiş bilgileri ile url adresine "PUT" methodu ile istek yapar ve kişinin bilgileri güncellenir.
      axios
        .put(
          "https://63cd2149fba6420d4d690748.mockapi.io/api/Contact/" +
            this.requestDetail.id,
          this.requestDetail
        )
        .then((res: any) => {
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 1000);
        });
    },
    getDetail(id: any) {
      //getDetail metodu, kişinin detay bilgilerini getirir. Bu metodun içinde, axios ile kişinin ID'si ile url adresine GET methodu ile istek yapar ve kişinin detay bilgileri elde edilir.
      axios
        .get("https://63cd2149fba6420d4d690748.mockapi.io/api/Contact/" + id)
        .then((res: any) => {
          this.requestDetail = res.data;
        });
    },
  },
  mounted() {
    // mounted metodu sayfa yüklendiğinde, getDetail metodunu çalıştırır ve this.$route.params.contactId ile belirlenen kişinin ID'sini alır ve bu ID ile kişinin detay bilgilerini getirir.
    this.getDetail(this.$route.params.contactId);
  },
  computed: {
    getPhoto() {
      if (this.requestDetail.photoUrl == "") {
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3r7obHS9-Fr08iONgn5ZBYYIsllU-qT_5a7VYmCvw-eCUvi593W9srdxOdhro0JWvlYY&usqp=CAU";
      } else {
        return this.requestDetail.photoUrl;
      }
    },
  },
});
</script>

<style>
</style>