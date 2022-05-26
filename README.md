Projeto semestral de desenvolvimento de sistema WEB

Passo a passo para rodar em seu ambiente local:<br><br>
git clone https://github.com/eikemello/devweb2/ <br><br>
Possuir algum framework SQL para executar database_script.sql. Nesse caso usaremos MySQL Workbench: <br>
1 - Abrir MySQL Workbench<br>
2 - Acessar seu banco de dados <br>
3 - Clicar em File<br>
4 - Selecionar "Open SQL Script"<br>
5 - Abrir script_database.sql localizado dentro da pasta "estoque", criada depois de rodar o comando git clone.<br>
6 - Executar os comandos do arquivo<br>

Para o sistema em si:<br>
1 - Entre na pasta "estoque" <br>
2 - execute: npm install <br>
3 - execute: nodemon app.js<br>
4 - Acesse localhost:3000/
