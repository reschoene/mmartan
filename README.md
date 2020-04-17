# Catálogo de Produtos mmartan

Simula uma página de um sistema e-commerce responsável por demonstrar de forma otimizada um catálogo de produtos.
<br />

### Para esta solução, utilizei-me da seguinte stack:

 1. Frontend: Reactjs, Redux, Bootstrap, NPM
 2. Backend: Java, Spring, JDBC, Maven, MySQL

<br />
### A solução é composta de 3 projetos que se complementam:

### 1 - frontend
Página do catálogo de produtos. Corresponde à parte visual da solução, contendo as regras visuais.  Implementa o *client* que irá consumir os dados da API desenvolvida no projeto *2 - backend*

### 2 - backend
Uma API REST escrita em Java, que permite buscar produtos do catálogo da mmartan. Trata-se do serviço que será consumido pela página do catálogo de produtos.

### 3 - dbInit
Uma aplicação java simples para auxiliar na tarefa de popular a base de dados da solução, para fins de testes e demostração.
Como permite a geração massiva de dados, facilita também a realização de testes de performance.

#### Para mais detalhes sobre o uso e instalação desses projetos, vide o arquivo README de cada um deles.


