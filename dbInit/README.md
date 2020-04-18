# dbInit

Aplicação console java desenvolvida com o objetivo de ajudar no processo de popular a base de dados mmartan. Desenvolvida utilizando-se das seguintes tecnologias: 
Java, JDBC, Maven.

### criação da base de dados
Na pasta ScriptsBase, está disponível o script `20200411_Complete.sql`. Ele contém todos os comandos necessários para se criar e popular a base de dados mmartan no servidor mysql. Execute este script para criar a base de dados. Se quiser rodar o dbInit mais tarde para gerar outros produtos e re-popular a base, o executável automaticamente excluirá os dados anteriores.

### Instalação e compilação
Entre na pasta do projeto e execute o comando `mvn install`. O comando pedirá para o Maven (gerenciador de projetos java) que baixe todas as dependências do projeto (as mesmas estão definidas no arquivo de configuração pom.xml) e compilá-las. Ao final será gerado na pasta target um executável de nome dbInit-1.0.0.jar.

### Para re-compilar
caso precise compilar e gerar novamente o executável JAR, execute o comando `mvn package`.

### Execução
Para iniciar o servidor de aplicação, estando na pasta target, basta rodar o comando `.\dbInit-1.0.0.jar`. 

