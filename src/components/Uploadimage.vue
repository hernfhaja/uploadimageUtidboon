<template>
  <div class="uploadImage">
    <!-- popup -->
    <div
      v-if="uploadValue == 100"
      class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 p-5"
    >
      <div class="bg-white px-10 py-10 rounded-md text-center">
        <h1 class="text-xl mb-4 font-bold text-gray-600">ส่งรูปสำเร็จ</h1>
        <p class="mb-5 text-gray-600">
          ร่วมสวดธรรมจักรทุกวัน และ ร่วมพิธีอุทิศบุญในทุกวันพระ ได้ที่ <br />
          " เพจธรรมล้านดวง " เวลา 20.02 น.
        </p>
        <button
          @click="reloadPage"
          class="bg-indigo-500 px-4 py-2 rounded-md text-md text-white"
        >
          ส่งรูปอีกครั้ง
        </button>
      </div>
    </div>

    <!-- topic -->
    <div class="shadow-xl flex flex-col justify-center mt-10 p-3 rounded-xl">
      <h1 class="drop-shadow-xl text-4xl text-center text-yellow-300">
        ส่งรูป พิธีอุทิศบุญ
      </h1>
      <h1 class="text-3xl text-color-dms text-center outline-title">
        เพจธรรมล้านดวง
      </h1>
    </div>

    <!-- input file -->
    <div class="pt-20 flex flex-col justify-center">
      <p class="text-center">กรุณากดที่ปุ่ม เพื่อเลือกรูป</p>
      <div class="pt-3 flex justify-center">
        <input
          id="uploadImage"
          class="px-20 justify-self-center pt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-100 file:text-yellow-800 hover:file:bg-yellow-100"
          type="file"
          @change="previewImage"
          accept="image/*"
          style="content: 'test'"
        />
      </div>
    </div>

    <div class="flex flex-col justify-center">
      <img id="uploadPreview" class="pt-10 px-3" />
      <div v-if="imageData != null" class="flex justify-center">
        <button
          @click="onUpload"
          class="p-3 shadow-xl mt-10 font-bold text-xl text-yellow-700 bg-yellow-200 rounded-full"
        >
          กดส่งรูปภาพ
        </button>
      </div>
    </div>

    <div v-if="imageData != null" class="flex flex-row justify-center pt-10">
      <p v-if="imageData != 100" class="text-xs shadow-xl">
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

      storageRef = ref(storage, `${file.name}`);
      uploadTask = uploadBytesResumable(storageRef, file, metadata);

      const metadata = {
        contentType: "image/jpeg",
      };

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

<style></style>
