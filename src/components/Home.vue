<template>
  <div>
    <!-- topic -->
    <div class="flex flex-col justify-center pt-8 pb-6 bg-topic">
      <h1 class="text-5xl text-center font-charm">
        ส่งรูปและรายชื่อ พิธีอุทิศบุญ
      </h1>
    </div>
    <div>
      <h1
        class="mt-3 text-xl font-bold text-center font-thasadith text-amber-900"
      >
        เพจธรรมล้านดวง
      </h1>
      <img src="../assets/section.png" class="mt-3" />
    </div>

    <div class="pt-8">
      <h1 class="text-3xl text-center font-charm">กรอกชื่อผู้วายชนม์</h1>
    </div>

    <!-- button -->
    <div class="flex justify-center">
      <router-link :to="{ path: '/uploadimage' }"
        ><button
          class="px-8 py-5 mt-10 text-xl font-bold text-yellow-800 bg-yellow-200 border-2 rounded-full shadow-xl"
        >
          ส่งรูปผู้วายชนม์ <br />
          กดปุ่มนี้
        </button></router-link
      >
      <router-link :to="{ path: '/sendname' }">
        <button
          class="px-8 py-5 mt-10 text-xl font-bold text-yellow-800 bg-yellow-200 border-2 rounded-full shadow-xl"
        >
          ส่งรายชื่อผู้วายชนม์ <br />กดปุ่มนี้
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SendName",
  data() {
    return {
      diename: "",
      sendcomplete: false,
    };
  },

  methods: {
    sendname() {
      console.log(this.diename);
      this.sendcomplete = true;
    },

    reloadPage() {
      window.location.reload();
    },

    /* eslint-disable */
  },
};
</script>

<style></style>
