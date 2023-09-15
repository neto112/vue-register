# vue-register

## Instalar as Dependências Iniciais

npm install -g @vue/cli

## Criar um Projeto Vue (substituir esse nome pelo nome da pasta que você deseja para o projeto)

vue create nome-da-pasta

## Instalar Dependências do Projeto

cd nome-da-pasta

## Instalar Vue Router, Vuex e Outras Dependências

npm install vue-router vuex date-fns

## Executar o Projeto
```
npm run serve
```

## Configurar a API FAKE com json-server

Para rodar o serviço, é necessário instalar o json-server:
```
npm install -g json-server
```
Após isso, rodar o comando:
```
json-server --watch data.json
```
