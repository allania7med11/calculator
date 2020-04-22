<template>
  <v-container fluid >
    <v-row justify="center" align="start">
      <v-col cols="12" md="10">
        <v-card class="grey lighten-4">
          <v-container fluid >
            <v-row justify="center" align="start">
              <v-col class="ma-0 py-0" cols="12" md="5">
                <v-container class="ma-0 py-0">
                  <v-row justify="center">
                    <v-col class="ma-0 py-0 text-center" cols="6">
                      <v-select v-model="mode" :items="['standard','scientific']" label="View"></v-select>
                    </v-col>
                    <v-col class="ma-0 py-0 text-center" cols="5">
                      <v-select
                        v-if="mode== 'scientific'"
                        v-model="choice"
                        :items="['DEG','RAD']"
                        label="Mode"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row justify="center">
                    <v-col class="ma-0 pa-0">
                      <div class="title">
                        <div>{{ display }}</div>
                        <div>= {{ result }}</div>
                        <v-alert
                          class="font-weight-bold"
                          type="error"
                          :value="error"
                          dismissible
                        >{{ errorM }}</v-alert>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
              <v-col class="ma-0 py-0" cols="12" md="5">
                <v-container class="ma-0 py-0">
                  <v-row justify="center">
                    <v-col cols="12" sm="6" md="12">
                      <v-row v-for="rw in full" justify="center" :key="rw.id" no-gutters>
                        <template v-for="cl in rw">
                          <v-col
                            v-if="cl !== '=' "
                            cols="2"
                            class="ma-0 pt-1 text-center"
                            :key="cl.id"
                          >
                            <v-btn
                              depressed
                              fab
                              small
                              class="white--text"
                              :color="color(cl)"
                              @click="add(cl)"
                            >
                              <Fas v-if="icon(cl)" :i="cl" />
                              <span v-else class="text-none font-weight-bold">{{ cl }}</span>
                            </v-btn>
                          </v-col>
                          <v-col v-else cols="4" class="ma-0 pt-1 text-center" :key="cl.id">
                            <v-btn class="white--text" :color="color(cl)" @click="add(cl)">
                              <Fas v-if="icon(cl)" :i="cl" />
                              <span v-else class="text-none font-weight-bold">{{ cl }}</span>
                            </v-btn>
                          </v-col>
                        </template>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { stati } from "@/mixins/static";
var mexp = require("math-expression-evaluator");
export default {
  mixins: [stati],
  data: () => ({
    list: [],
    cursorPos: 0,
    math: mexp,
    key: 0,
    error: false,
    errorM: "Error: Incomplete expression",
    result: "",
    base: [],
    choice: "DEG"
  }),
  computed: {
    display() {
      let rtn = [...this.list];
      rtn.splice(this.cursorPos, 0, "|");
      return rtn.join("");
    },
    input() {
      let rtn = [...this.list];
      return rtn.join("");
    }
  },
  created() {
    this.fangle();
  },
  methods: {
    fangle() {
      if (this.choice == "DEG") {
        this.math.math.isDegree = true;
      } else if (this.choice == "RAD") {
        this.math.math.isDegree = false;
      }
    },
    icon(vl) {
      if (["backspace", "arrow-left", "arrow-right"].includes(vl)) {
        return true;
      } else {
        return false;
      }
    },
    color(vl) {
      if (["/", "*", "+", "-"].includes(vl)) {
        return "warning";
      } else if (["backspace", "AC"].includes(vl)) {
        return "error";
      } else if (["(", ")", "arrow-left", "arrow-right"].includes(vl)) {
        return "grey darken-3";
      } else if (["="].includes(vl)) {
        return "success";
      } else if (["sin", "cos", "tan"].some(cv => vl.includes(cv))) {
        return "deep-purple darken-1";
      } else if (
        ["e", "ln", "log", "!", "^", "Mod"].some(cv => vl.includes(cv))
      ) {
        return "purple darken-1";
      } else {
        return "primary";
      }
    },
    focus() {
      this.$refs.textField.focus();
    },
    add(vl) {
      if (vl == "=") {
        this.change();
      } else if (vl == "backspace") {
        this.list.splice(this.cursorPos - 1, 1);
        this.cursorPos =
          this.cursorPos > 0 ? this.cursorPos - 1 : this.cursorPos;
      } else if (vl == "arrow-left") {
        this.cursorPos =
          this.cursorPos > 0 ? this.cursorPos - 1 : this.cursorPos;
      } else if (vl == "arrow-right") {
        this.cursorPos =
          this.cursorPos < this.list.length
            ? this.cursorPos + 1
            : this.cursorPos;
      } else if (vl == "AC") {
        this.list = [];
      } else if (
        ["sin", "cos", "tan", "e", "ln", "log"].some(cv => vl.includes(cv))
      ) {
        this.list.splice(this.cursorPos, 0, vl + "(");
        this.cursorPos = this.cursorPos + 1;
      } else {
        this.list.splice(this.cursorPos, 0, vl);
        this.cursorPos = this.cursorPos + 1;
      }
    },
    change(cv) {
      if (process.client) {
        this.fangle();
        this.error = false;
        try {
          this.result = this.math.eval(this.input);
        } catch (e) {
          console.log(e);
          this.result = "";
          this.error = true;
        }
      }
    }
  }
};
</script>

<style>
</style>