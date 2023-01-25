<template>
  <v-container>
    <v-table density="compact" hover fixed-header height="75vh">
      <thead>
        <tr>
          <th class="text-left">id</th>
          <th class="text-left"></th>
          <th class="text-left">Ad Soyad</th>
          <th class="text-left">Telefon Numarası</th>
          <th class="text-left">Email</th>
          <th class="text-left">Yaş</th>
        </tr>
      </thead>
      <tbody>
        <tr
          style="cursor: pointer"
          @click="contactDetail(item)"
          v-for="item in contacts"
          :key="item.id"
        >
          <td>{{ item.id }}</td>
          <td>
            <v-avatar small :image="item.photoUrl" size="small"> </v-avatar>
          </td>
          <td>{{ item.name + " " + item.surname }}</td>
          <td>{{ item.phoneNumber }}</td>
          <td>{{ item.email }}</td>
          <td>{{ calculateAge(item.birthDate) }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
  
  <script lang="ts">
import { Contact } from "@/models/Contact";
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "ContactList",
  props: ["sampleProp"],
  data: () => ({
    contacts: new Array<Contact>(),
  }),
  methods: {
    calculateAge(birthDate: any) {
      //"calculateAge" metodu, bir kişinin doğum tarihini alır ve kişinin yaşını hesaplar.
      let todayDate = new Date();
      let todayYear = todayDate.getFullYear();
      let todayMonth = todayDate.getMonth();
      let todayDay = todayDate.getDate();

      let birthYear = Number(birthDate.slice(0, 4));
      let birthMonth = Number(birthDate.slice(6, 7));
      let birthDay = Number(birthDate.slice(9, 10));

      let age = todayYear - birthYear;

      if (todayMonth < birthMonth - 1) {
        age--;
      }

      if (birthMonth - 1 == todayMonth && todayDay < birthDay) {
        age--;
      }
      return age;
    },
    getContactList() {
      //"getContactList" metodu, bir API'den kişiler listesini alır ve component içindeki "contacts" dizisini günceller.
      axios
        .get("https://63cd2149fba6420d4d690748.mockapi.io/api/Contact")
        .then((res: any) => {
          this.contacts = res.data;
        });
    },

    contactDetail(contact: Contact) {
      // "contactDetail" metodu, bir kişi nesnesini alır ve bu nesnenin detaylarını göstermek için component'te  "contactEmit" ile veri alışverişi yapar.
      this.$emit("contactEmit", contact);
    },
  },
  mounted() {
    //"mounted" metodunda "getContactList" metodu çağrılır ve component başlangıçta kişiler listesini alır.
    this.getContactList();
    console.log(this.sampleProp);
  },
});
</script>
  
  <style>
</style>