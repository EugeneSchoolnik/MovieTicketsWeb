<script lang="ts">
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      inputValue: this.value,
    };
  },
  methods: {
    handleInput(event: Event) {
      this.$emit("update:modelValue", (event.target as HTMLInputElement).value);
    },
  },
};
</script>
<template>
  <label
    >{{ label }}
    <input v-model="inputValue" :placeholder="placeholder" @input="handleInput" />
  </label>
</template>
<style lang="scss" scoped>
label {
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
  }
}
</style>
