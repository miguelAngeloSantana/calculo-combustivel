# Fuel Price

## Descrição

Site para estimar o custo do combustivel de uma viagem, alem das quantidades de paradas necessarias para reabastecer

## Tecnlogias utilizadas
1. NextJS
2. ReactJS
3. TypeScript
4. puppeteer
5. react-leaflet
6. TailwindCss
7. Prisma
8. PostgreSQL
9. better-auth
10. uuid

## Funções do site
1. Calcular o preço de diferentes combustiveis
2. Mostrar quantas paradas serão necessarias beaseado na capacidade do tanque
3. Exibir o consumo total
4. Historico de viagem anterior
5. Comprar consumo de diferentes veiculos
6. Salvar as informações de viagem de origem e destino no PostgreSQL usando o Prisma
8. Salvar o historico de viagem
9. Autenticar o login e registro de usuario usando a biblioteca better-auth
10. Opções de deslogar a conta criado com o better-auht
11. Garatir que apenas usuario logados possam acessar a tela de perfil
12. WebScraping para pegar o valor do combustivel autualizado

## Processo 
Tudo começou quando vi essa postagem do <a href="https://www.linkedin.com/posts/gustavo-endo-3b718b18b_ideias-de-projeto-pra-quem-quer-entrar-na-activity-7195907303189925889-zT7F?utm_source=share&utm_medium=member_desktop&rcm=ACoAADBfyWEB-asfP1etfFloRwDPcLam3P7ptMk" target="_blank">Linkedin</a> com uma idea de um projeto web sobre calcular o tanto de combustivel necessario para uma viagem.

Vendo e querendo fazer esse projeto dar certo, começei buscando a fonte de dados necessária para faze-lo funcionar como deveria, sendo o preço do combustivel mais recente. O jeito que eu achei de conseguir essa infomação foi pegando os arquivos de dados públicos da ANP. Após conseguir esses dados, fiz um protótipo de como ele ficaria no Figma, em paralelo com isso, escrevi as principais funções que o site teria além das telas necessarias para faze-lo funcionar. Isso me ajudou a ter mais clareza sobre qual função ia ficar em qual tela e como ficaria o fluxo de navegação do usuario entre as navegações.

A escolha do PostgreSQL como banco de dados para armazenar as informações do usuário se derão por alguns fatores, dentre eles a escolha por um banco de dados relacional, pois os dados iam se relacionar uns com ou outros ( um usuário poder ter varias viagens, por exemplo ), além disso, esse banco de dados é bom para conteudos dinâmicos, como o mapa e os dados que ele ia armazenar podem mudar de uma hora para outra, além da escolha de um que estregasse muita consistencia no sistema, junto do fato dele suporta grandes quantidades de registros. 

O uso do Prisma foi para facilitar a integração do banco de dados com a aplicação, e por permitir uma compatibilidade com a biblioteca better-auth.

Apos iniciar o projeto e fazer todas as funcionalidades descritas, me veio a idea e a oportunidade de implementar autenticação, tendo essa idea por meio da funcionalidade de poder salvar as informações de viagens de diferentes usuários, permitindo que eles saem da aplicação e os dados continuem salvos. A biblioteca que eu escolhi usar para isso foi a better-auth, pois ela têm otimos exemplos em sua documentação suando o prisma com o PostgreSQL, o que beneficiaria muito.

Para testar, eu fiz isso manualmente, criando duas contas diferentes com dois destinos diferentes para cada uma e salvando essas informações no banco de dados.

## Telas do site
<div align="center">
  <img src="https://github.com/miguelAngeloSantana/calculo-combustivel/blob/main/screenshots/Captura%20de%20ecr%C3%A3%202025-12-26%20154300.png" />
  <img src="https://github.com/miguelAngeloSantana/calculo-combustivel/blob/main/screenshots/Captura%20de%20ecr%C3%A3%202025-12-26%20154313.png" />
  <img src="https://github.com/miguelAngeloSantana/calculo-combustivel/blob/main/screenshots/Captura%20de%20ecr%C3%A3%202025-12-26%20154324.png" />
  <img src="https://github.com/miguelAngeloSantana/calculo-combustivel/blob/main/screenshots/Captura%20de%20ecr%C3%A3%202025-12-26%20154342.png" />
  <img src="https://github.com/miguelAngeloSantana/calculo-combustivel/blob/main/screenshots/Captura%20de%20ecr%C3%A3%202025-12-26%20154455.png" />
  <img src="https://github.com/miguelAngeloSantana/calculo-combustivel/blob/main/screenshots/Captura%20de%20ecr%C3%A3%202025-12-26%20154508.png" />
  <img src="https://github.com/miguelAngeloSantana/calculo-combustivel/blob/main/screenshots/Captura%20de%20ecr%C3%A3%202025-12-26%20154521.png" />
</div>
