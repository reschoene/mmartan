# backend

Servidor de aplicação que expôe uma API Rest pública para se buscar produtos do catálogo da mmartan. Foi desenvolvido utilizando-se das seguintes tecnologias: 
Java, Spring, SpringBoot, JDBC, Maven.

### Instalação e compilação
Entre na pasta do projeto e execute o comando `mvn install`. O comando pedirá para o Maven (gerenciador de projetos java) que baixe todas as dependências do projeto (as mesmas estão definidas no arquivo de configuração pom.xml) e compilá-las. Ao final será gerado na pasta target um executável de nome mmartanServer.jar.

### Para re-compilar
caso precise compilar e gerar novamente o executável JAR, execute o comando `mvn package`.

### Execução
Para iniciar o servidor de aplicação, estando na pasta target, basta rodar o comando `.\mmartanServer.jar`. 

<br />

### Deploy
Para o deploy utilizei-me do servidor da Locaweb. Para automatizar o processo, criei o script: `deployMmartanBackend.sh`, basta executá-lo.  Para maiores detalhes, entrar em contato com o administrador.

