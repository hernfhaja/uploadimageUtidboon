<template>
  <div class="bg-cover">
    <!-- popup -->
    <div
      v-if="uploadValue == 100"
      class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 p-5"
    >
      <div class="bg-white px-10 py-16 rounded-md text-center mt-10">
        <h1 class="text-xl mb-4 font-bold text-gray-600">ส่งรูปสำเร็จ</h1>
        <p class="mb-5 text-gray-600">
          ร่วมสวดธรรมจักรทุกวัน และ ร่วมพิธีอุทิศบุญในทุกวันพระ ได้ที่ <br />
          " เพจธรรมล้านดวง " เวลา 20.02 น.
        </p>
        <div class="flex flex-row justify-between mt-5 p-1 mb-5">
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
          class="bg-yellow-300 px-4 py-2 rounded-md text-md font-bold text-gray-800"
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
        class="text-xl text-center mt-3 font-thasadith font-bold text-amber-900"
      >
        เพจธรรมล้านดวง
      </h1>
      <img src="../assets/section.png" class="mt-3" />
    </div>

    <!-- input file -->
    <div class="pt-20 flex flex-col justify-center">
      <p class="text-center h-10">กรุณากดที่ปุ่ม เพื่อเลือกรูป</p>
      <div class="flex justify-center">
        <label
          class="custom-file-upload p-5 px-20 rounded-xl text-3xl font-saraban font-bold"
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

    <div class="flex flex-col justify-center">
      <div class="flex justify-center">
        <img id="uploadPreview" class="pt-10 px-3 w-3/5" />
      </div>
      <div v-if="imageData != null" class="flex justify-center">
        <button
          @click="onUpload"
          class="p-3 shadow-xl mt-10 font-bold text-xl text-yellow-700 bg-yellow-200 rounded-full border-2"
        >
          กดส่งรูปภาพ
        </button>
      </div>
    </div>

    <div v-if="imageData != null" class="flex flex-row justify-center pt-10">
      <p v-if="imageData != 100" class="text-xs shadow-xl mb-10">
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
      let storageRef = this.storageRef;
      let uploadTask = this.uploadTask;

      const metadata = {
        contentType: "image/jpeg",
      };

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
