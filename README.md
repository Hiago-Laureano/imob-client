# Imob Client

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

Um simples sistema responsivo projetado para imobiliárias. O projeto apresenta os imóveis disponíveis da empresa, além, de permitir a inserção, atualização e deleção. Este sistema consome a API REST [Imob API](https://github.com/Hiago-Laureano/imob-api).

<h1 align="center">
    <img src="./public/README/home1.png" width="300"/>
    <img src="./public/README/home2.png" width="300"/>
    <img src="./public/README/info_house.png" width="300"/>
</h1>

## Requisitos

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

### Contato via WhatsApp

No arquivo PropertyCard.vue existe a variável **phoneNumber**, substitua o valor inicial pelo número telefônico que será usado para clientes entrarem em contato via WhatsApp. Ex.: o número (00) 00000-1111 deve ser informado assim 5500000001111. Note que no início foi adicionado 55, este é o código do Brasil e é necessário para números telefônicos brasileiros.

### Para instalar as dependências, execute o seguinte comando:
```
npm install
```

### Para executar o projeto, execute o seguinte comando:
```
npm run serve
```

### Para compilar a aplicação para produção, execute o seguinte comando:
```
npm run build
```