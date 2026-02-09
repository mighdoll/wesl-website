export default {
  slidev: {
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) =>
            tag === "wgsl-edit" || tag === "wgsl-play",
        },
      },
    },
  },
};
