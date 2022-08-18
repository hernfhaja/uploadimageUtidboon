<template>
  <div>
    <!-- popup -->
    <div
      v-if="sendcomplete == true"
      class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center p-5 bg-opacity-50 bg-slate-800"
    >
      <div class="px-10 py-16 mt-10 text-center bg-white rounded-md">
        <h1 class="mb-4 text-xl font-bold text-gray-600">ส่งรายชื่อสำเร็จ</h1>
        <p class="mb-5 text-gray-600">
          ร่วมสวดธรรมจักรทุกวัน และ ร่วมพิธีอุทิศบุญในทุกวันพระ ได้ที่ <br />
          " เพจธรรมล้านดวง " เวลา 20.02 น.
        </p>
        <div class="flex flex-row justify-between p-1 mt-5 mb-5">
          <a href="https://web.facebook.com/dhamma1000000" class="text-sm"
            ><img src="../assets/Facebook_Logo.png" class="w-12"
          /></a>
          <a
            href="https://www.youtube.com/channel/UC1Bh6OuSHBJnlt3vZd6hsUQ"
            class=""
            ><img src="../assets/Youtube-logo-png.png" class="w-20"
          /></a>
          <a href="https://www.boon123.com/"
            ><img src="../assets/zoom-logo.png" class="w-14"
          /></a>
        </div>
        <div class="">
          <button
            @click="reloadPage"
            class="px-4 py-2 m-5 font-bold text-gray-800 bg-yellow-300 rounded-md text-md"
          >
            ส่งชื่ออีกครั้ง
          </button>

          <router-link :to="{ path: '/' }">
            <button
              class="px-4 py-2 font-bold text-gray-800 bg-red-300 rounded-md text-md"
            >
              กลับไปหน้าแรก
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- topic -->
    <div class="flex flex-col justify-center pt-8 pb-6 bg-topic">
      <h1 class="text-5xl text-center font-charm">ส่งรายชื่อ พิธีอุทิศบุญ</h1>
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

    <!-- input textarea -->
    <div class="flex flex-col justify-center mt-5">
      <!-- input textarea  -->
      <div class="flex mt-5 justify-left">
        <p class="flex-1 text-center">
          ชื่อ-นามสกุล<br />
          (ผู้วายชนม์)
        </p>
        <input
          placeholder=""
          v-model="diename"
          type="text"
          class="flex-auto h-12 px-4 mx-5 rounded-lg"
        />
      </div>
      <div class="flex mt-5 justify-left">
        <p class="flex-1 text-center">
          ชื่อ-นามสกุล<br />
          (ผู้วายชนม์)
        </p>
        <input
          placeholder=""
          v-model="diename"
          type="text"
          class="flex-auto h-12 px-4 mx-5 rounded-lg"
        />
      </div>
      <div class="flex mt-5 justify-left">
        <p class="flex-1 text-center">
          ชื่อ-นามสกุล<br />
          (ผู้วายชนม์)
        </p>
        <input
          placeholder=""
          v-model="diename"
          type="text"
          class="flex-auto h-12 px-4 mx-5 rounded-lg"
        />
      </div>
      <div class="flex mt-5 justify-left">
        <p class="flex-1 text-center">
          ชื่อ-นามสกุล<br />
          (ผู้วายชนม์)
        </p>
        <input
          placeholder=""
          v-model="diename"
          type="text"
          class="flex-auto h-12 px-4 mx-5 rounded-lg"
        />
      </div>
    </div>

    <div class="flex justify-center">
      <button
        @click="sendname"
        class="px-8 py-5 mt-10 text-xl font-bold text-yellow-700 bg-yellow-200 border-2 rounded-full shadow-xl"
      >
        กดส่งชื่อ
      </button>
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
