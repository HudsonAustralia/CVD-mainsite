module.exports = {
    shape: {
      id: {
        generator: function (name, file) {
          return 'icon-' + name.toLowerCase();
        },
      },
    },
    mode: {
      symbol: true,
    },
  };
  