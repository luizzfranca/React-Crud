Crude React
Descrição
 CRUD (Create, Read, Update, Delete). Ele utiliza Next.js para o frontend, Tailwind CSS para estilização, Firebase para autenticação e como banco de dados. O projeto é escrito em TypeScript para melhorar a qualidade e manutenibilidade do código.

Recursos
Next.js: O projeto é construído usando Next.js, um framework React que permite renderização no lado do servidor, roteamento eficiente e mais.

Tailwind CSS: O Tailwind CSS é utilizado para estilização, proporcionando uma abordagem de utilitários para a construção de designs modernos.

Autenticação Firebase: O Firebase está integrado para autenticação do usuário, garantindo acesso seguro e sem complicações à aplicação.

Banco de Dados em Tempo Real do Firebase: O projeto utiliza o Firebase como banco de dados, oferecendo sincronização em tempo real e um banco de dados NoSQL escalável.

TypeScript: Todo o código é escrito em TypeScript, melhorando a legibilidade do código, a manutenibilidade e detectando erros potenciais durante o desenvolvimento.

Funcionalidades CRUD
O projeto possui as operações CRUD (Create, Read, Update, Delete) para gerenciar dados. As funcionalidades incluem:

Create: Adicionar novos dados ao sistema.

Read: Visualizar dados existentes.

Update: Modificar informações de dados existentes.

Delete: Remover dados do sistema.

Configuração do Firebase
Criar um Projeto no Firebase
Acesse o Console do Firebase.

Clique em "Adicionar projeto" e siga as instruções para configurar um novo projeto.


Obter as Credenciais do Firebase
No Console do Firebase, vá para as configurações do projeto.

Clique em "Configurações do Projeto" e role para baixo até encontrar as configurações do Firebase.

Configurar as Credenciais no Projeto
Crie um arquivo .env na raiz do projeto.

Abra o arquivo .env e adicione suas credenciais do Firebase. Exemplo:

NEXT_PUBLIC_FIREBASE_API_KEY=sua-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=sua-app-id

Configurar a Versão do Node
Certifique-se de estar usando a versão correta do Node.js. Recomenda-se usar a versão 18.17.1. Você pode gerenciar as versões do Node.js usando ferramentas como NVM (Node Version Manager). Para instalar o NVM, siga as instruções no site oficial do NVM.

Depois de instalar o NVM, você pode definir a versão do Node.js para 18.17.1 com o seguinte comando:
nvm install 18.17.1
Em seguida, você pode usar esta versão do Node.js no projeto executando:
nvm use 18.17.1


Como Começar
1.Clonar o repositório:
git clone https://github.com/seu-nome-de-usuario/seu-repo.git
cd seu-repo

2.Instalar dependências:
yarn install

3.Executar o servidor de desenvolvimento:
yarn dev

4.Abrir no navegador:
Sua aplicação deve estar em execução em http://localhost:3000.

5. Logar na aplicação: 
você deve utilizar o usuário teste para logar na aplicação
email: teste@gmail.com 
senha: 12345678

*Para cada Task que você criar, editar, será necessário da um Refresh na página, pois esta conectado com o Banco de Dados do firebase