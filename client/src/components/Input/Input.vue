<script lang="ts">
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    isTextarea: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      inputValue: this.value,
      typeState: this.type == "password",
    };
  },
  methods: {
    handleInput(event: Event) {
      if (this.type == "file") {
        const files = (event.target as HTMLInputElement).files;
        this.$emit("update:modelValue", files ? files[0] : null);
        return;
      }
      this.$emit("update:modelValue", (event.target as HTMLInputElement).value);
    },
    togglePassword() {
      this.typeState = !this.typeState;
    },
  },
};
</script>
<template>
  <label
    >{{ label }}
    <textarea
      v-if="isTextarea"
      v-model="inputValue"
      :placeholder="placeholder"
      @input="handleInput"
      cols="30"
      rows="5"
      :class="error ? 'error' : ''"
    ></textarea>
    <input
      :class="error ? 'error' : ''"
      v-else
      v-model="inputValue"
      :type="type != 'password' ? type : typeState ? type : 'text'"
      :placeholder="placeholder"
      @input="handleInput"
    />
    <i v-if="type == 'password'" :class="`fa-solid fa-eye${typeState ? '-slash' : ''}`" @click="togglePassword"></i>
    <span>{{ error }}</span>
  </label>
</template>
<style lang="scss" scoped>
label {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 280px;
  margin: calc(0.5rem - 2px) 0 0.5rem;
  input {
    width: 100%;
    background: $dark;
    padding: 5px;
    margin-top: 2px;
    font-weight: 600;
    border-bottom: 2px solid $lightGray;
    transition: 150ms;
    &:hover,
    &:focus {
      border-bottom: 2px solid $orange;
    }
    &::placeholder {
      color: $orange;
    }
    &.error {
      border-bottom: 2px solid $danger;
    }
    &[type="time"],
    &[type="date"] {
      height: calc(1.3rem + 10px);
    }
  }
  i {
    position: absolute;
    right: 4px;
    top: calc(20px + 1rem);
    transform: translateY(-50%);
  }
  textarea {
    width: 100%;
    background: $dark;
    padding: 4px;
    margin-top: 2px;
    border: 2px solid $lightGray;
    transition: 150ms;
    resize: none;
    &:hover,
    &:focus {
      border: 2px solid $orange;
    }
    &::placeholder {
      color: $orange;
    }
    &.error {
      border: 2px solid $danger;
    }
    &::-webkit-scrollbar {
      width: 4px;
      background: $darkGray;
    }
    &::-webkit-scrollbar-thumb {
      background: $orange;
      border-radius: 5px;
    }
  }
  span {
    text-align: right;
    height: 1rem;
    font-size: 0.85rem;
    color: $danger;
  }
}
</style>
