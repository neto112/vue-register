const path = require('path');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/variables.scss";`, // Importe seus arquivos de variáveis, se houver
      },
    },
  },
  transpileDependencies: ['vuetify'], // Se você tiver outras dependências que deseja transpilar, adicione-as aqui
};
