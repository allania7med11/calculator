<template>
  <div>
    <v-card
      class="d-flex justify-space-around flex-column mb-6"
      color="grey lighten-2"
      flat
      tile
      height="1100"
    >
      <v-card
        class="pa-2"
        outlined
        tile
        color="grey lighten-2"
      >
        <app1 />
      </v-card>
      <v-card
        class="pa-2"
        outlined
        tile
        color="grey lighten-2"
      >
        <seo data-aos="zoom-in" />
      </v-card>
    </v-card>
  </div>
</template>
<script>
import app1 from "@/components/app1";
import seo from "@/components/seo";
export default {
  head: {
    titleTemplate: "Effective Calculator",
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "This Effective Calculator provides simple and advanced mathematical functions in an intuitive and easy to use app."
      }
    ]
  },
  components: {
    app1,
    seo
  }
};
</script>

