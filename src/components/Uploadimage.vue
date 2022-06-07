<template>
  <div class="bg-cover">
    <!-- popup -->
    <div
      v-if="uploadValue == 100"
      class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center p-5 bg-opacity-50 bg-slate-800"
    >
      <div class="px-10 py-16 mt-10 text-center bg-white rounded-md">
        <h1 class="mb-4 text-xl font-bold text-gray-600">ส่งรูปสำเร็จ</h1>
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
        <button
          @click="reloadPage"
          class="px-4 py-2 font-bold text-gray-800 bg-yellow-300 rounded-md text-md"
        >
          ส่งรูปอีกครั้ง
        </button>
      </div>
    </div>

    <!-- topic -->
    <div class="flex flex-col justify-center pt-8 pb-6 bg-topic">
      <h1 class="text-5xl text-center font-charm">ส่งรูป พิธีอุทิศบุญ</h1>
    </div>
    <div>
      <h1
        class="mt-3 text-xl font-bold text-center font-thasadith text-amber-900"
      >
        เพจธรรมล้านดวง
      </h1>
      <img src="../assets/section.png" class="mt-3" />
    </div>

    <!-- input textarea -->
    <div class="flex justify-center mt-10">
      <p class="text-center">
        กรุณากรอก <br />
        ชื่อ-นามสกุล (ผู้ส่ง)
      </p>
      <input
        placeholder=""
        v-model="senderName"
        type="text"
        class="px-4 mx-5 rounded-lg"
      />
    </div>

    <!-- input file -->
    <div v-if="imageData == null" class="flex flex-col justify-center pt-10">
      <p class="h-10 text-center">กรุณากดที่ปุ่ม เพื่อเลือกรูป</p>
      <div class="flex justify-center">
        <label
          class="p-5 px-20 text-3xl font-bold custom-file-upload rounded-xl font-saraban"
        >
          <input
            id="uploadImage"
            type="file"
            @change="previewImage"
            accept="image/*"
          />
          เลือกรูป
        </label>
      </div>
    </div>

    <!-- chang + cancle buton -->
    <div
      v-if="imageData != null"
      class="flex flex-row justify-center pt-5 space-x-3"
    >
      <div class="flex justify-center">
        <label class="p-2 custom-file-upload rounded-xl">
          <input
            id="uploadImage"
            type="file"
            @change="previewImage"
            accept="image/*"
          />
          เปลี่ยนรูป
        </label>
      </div>
      <button
        class="p-2 bg-red-600 rounded-xl text-gray-50"
        @click="
          () => {
            this.picture = null;
            this.imageData = null;
          }
        "
      >
        ยกเลิก
      </button>
    </div>

    <!-- preview img -->
    <div class="flex flex-col justify-center">
      <div class="flex justify-center">
        <img id="uploadPreview" class="w-3/5 max-h-screen px-3 pt-5" />
      </div>
      <div v-if="imageData != null" class="flex justify-center">
        <button
          @click="onUpload"
          class="p-3 mt-10 text-xl font-bold text-yellow-700 bg-yellow-200 border-2 rounded-full shadow-xl"
        >
          กดส่งรูปภาพ
        </button>
      </div>
    </div>

    <div v-if="imageData != null" class="flex flex-row justify-center pt-10">
      <p v-if="imageData != 100" class="mb-10 text-xs shadow-xl">
        {{ !sendcomplete ? progress.incomplete : progress.complete }} :
        {{ uploadValue.toFixed() + "%" }}
        <progress
          id="progress"
          class="rounded-full"
          :value="uploadValue"
          max="100"
        ></progress>
      </p>
    </div>
  </div>
</template>

<script>
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default {
  name: "UploadImage",
  data() {
    return {
      imageData: null,
      picture: null,
      uploadValue: 0,
      storage: getStorage(),
      storageRef: null,
      popupData: {
        display: "none",
      },
      clicksend: null,
      progress: { incomplete: "ดำเนินการ", complete: "ส่งรูปสำเร็จ" },
      sendcomplete: null,
      uploadTask: null,
      senderName: "",
    };
  },

  methods: {
    previewImage(event) {
      const oFReader = new FileReader();
      oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

      oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreview").src = oFREvent.target.result;
      };

      this.uploadValue = 0;
      this.picture = event.file;
      this.imageData = event.target.files[0];
    },

    onUpload(e) {
      const file = this.imageData;
      const storage = this.storage;
      const senderName = this.senderName;
      let storageRef = this.storageRef;
      let uploadTask = this.uploadTask;

      const metadata = {
        contentType: "image/jpeg",
      };

      console.log(senderName);

      storageRef = ref(storage, `${file.name}`);
      uploadTask = uploadBytesResumable(storageRef, file, metadata);

      console.log(storage);

      this.clicksend = e;

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          this.uploadValue = progress;
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              console.log("storage/unauthorized", error.code);
              break;
            case "storage/canceled":
              // User canceled the upload
              console.log("storage/canceled", error.code);
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              console.log("storage/unknown", error.code);
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            this.sendcomplete = 1;
            this.picture = downloadURL;
          });
        }
      );
    },
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>

<style>
input[type="file"] {
  display: none;
}

.section-line-bg {
  background-image: url("../assets/section.png");
}
.bg-topic {
  background-image: url("../assets/head-bg.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.button-image-golden {
  background-image: url("../assets/btn-bg.png");
  object-fit: cover;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100px;
}

.custom-file-upload {
  display: inline-block;
  cursor: pointer;
  background-image: url("../assets/btn-bg.png");
  background-size: cover;
}
</style>
