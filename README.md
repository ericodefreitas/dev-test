# Teste Prático para Desenvolvedores Fullstack

Bem-vindo(a) ao teste prático de desenvolvimento. Este desafio tem como objetivo avaliar suas habilidades técnicas e sua capacidade de compreender, estender e manter um projeto existente. Siga as instruções abaixo e desenvolva o máximo que conseguir dentro do prazo estabelecido.

## Configuração do Ambiente

Para iniciar o desenvolvimento, configure seu ambiente seguindo os passos abaixo:

### Backend (C# .NET)

1.  **Instalação do Docker:**
    Baixe e instale o Docker em sua máquina. Ele será utilizado para gerenciar o banco de dados MySQL.
    [Link para download do Docker](https://www.docker.com/get-started)

2.  **Configuração do MySQL com Docker:**
    Execute o script `setup-mysql.sh` localizado na raiz do projeto para automatizar a configuração do MySQL via Docker:
    ```bash
    ./setup-mysql.sh
    ```
    *Observação:* Caso sua máquina não suporte Docker, você pode instalar o MySQL localmente e atualizar a `connectionstring` no projeto Backend para apontar para sua instância local.

3.  **Preparação do Repositório:**
    Realize um "fork" deste repositório para sua conta no GitHub e, em seguida, clone-o em sua máquina local para iniciar o desenvolvimento.
    [Guia para fazer um fork de um repositório](https://docs.github.com/pt/github/getting-started-with-github/fork-a-repo)

4.  **Execução das Migrações do Banco de Dados:**
    Navegue até a pasta `backend/Infra/Persistence` no terminal e execute o comando abaixo para aplicar as migrações e criar o esquema do banco de dados:
    ```bash
    dotnet ef database update
    ```

### Frontend (React com TypeScript)

1.  **Navegação para o Diretório do Frontend:**
    Abra seu terminal e navegue até o diretório do frontend:
    ```bash
    cd frontend
    ```

2.  **Instalação das Dependências:**
    Instale todas as dependências do projeto utilizando o npm:
    ```bash
    npm install
    ```

3.  **Configuração das Variáveis de Ambiente:**
    Duplique o arquivo de exemplo de variáveis de ambiente e renomeie-o para `.env`:
    ```bash
    cp .env.example .env
    ```

4.  **Início do Servidor de Desenvolvimento:**
    Inicie o servidor de desenvolvimento do frontend:
    ```bash
    npm run start
    ```
    O aplicativo estará acessível em `http://localhost:3000` (ou em outra porta disponível, caso a 3000 esteja em uso).

## Tarefas de Desenvolvimento

Com o ambiente configurado, utilize seus conhecimentos para entender o código existente e implementar as seguintes alterações. Atente-se aos padrões de código, arquitetura e estilo já presentes no projeto.

**Tarefa 1: Filtragem de Clientes por Documento (Backend)**
No projeto `WebApi`, crie uma nova rota `GET /clients?document={numeroDocumento}` que permita filtrar clientes pelo número do documento. Siga o padrão de implementação de consultas já existente no projeto.

**Tarefa 2: Campo de Filtro por Documento (Frontend)**
No projeto `frontend`, adicione um campo de filtro por documento na tela de listagem de clientes. Utilize este campo para realizar a chamada à API criada na **Tarefa 1**, exibindo os resultados filtrados. Siga o padrão de implementação de consultas já existente.

**Tarefa 3: Atualização de Dados do Cliente (Backend)**
No projeto `WebApi`, crie uma nova rota `PUT /clients/{id}` que permita a atualização dos dados de um cliente específico. Siga o padrão de implementação de comandos (edição) já existente no projeto.

**Tarefa 4: Funcionalidade de Edição de Cliente (Frontend)**
No projeto `frontend`, implemente a funcionalidade de edição de cliente. Isso inclui:
*   Criar uma página ou modal de edição que carregue os dados existentes do cliente.
*   Realizar a chamada à API de atualização criada na **Tarefa 3** ao salvar as alterações.
*   Adicionar um link ou botão na listagem de clientes que direcione para a página/modal de edição do cliente selecionado.
Siga o padrão de implementação de telas e formulários já existente.

**Tarefa 5: Adição do Campo Data de Nascimento (Fullstack)**

*   **5.1: Modelo de Domínio (Backend)**
    Na classe de domínio `Client` (no projeto `Domain`), adicione um novo campo para a data de nascimento (`BirthDate`) e torne-o obrigatório.

*   **5.2: Migração do Banco de Dados (Backend)**
    Ajuste as configurações do Entity Framework (no projeto `Persistence`) para contemplar o novo campo `BirthDate`. Em seguida, crie uma nova migração para aplicar essa alteração no banco de dados:
    ```bash
    dotnet ef migrations add "AddBirthDateToClient"
    ```

*   **5.3: Ajuste das APIs (Backend)**
    No projeto `WebApi`, ajuste as APIs de criação (`POST`) e edição (`PUT`) de clientes para receber e salvar o novo campo `BirthDate`. Além disso, modifique as APIs de listagem e consulta (`GET`) para que o campo `BirthDate` seja retornado.

*   **5.4: Atualização das Telas (Frontend)**
    No projeto `frontend`, inclua o campo de data de nascimento nas telas de listagem, detalhe, criação e edição de clientes. Utilize-o de acordo com a necessidade de cada tela (ex: exibição na listagem, campo de entrada na criação/edição).

**Tarefa 6: Importação em Lote de Clientes (Frontend)**
No projeto `frontend`, na tela de listagem de clientes, inclua uma opção para importação em lote. O usuário deve ser capaz de fazer o upload de um arquivo CSV contendo dados de clientes. Este arquivo CSV deve ser salvo em um diretório específico no projeto `backend` para processamento posterior (conforme **Tarefa 7**).

**Tarefa 7: Processamento de Importação em Lote (Backend)**
No projeto `backend`, implemente a funcionalidade de importação de clientes em lotes a partir de um arquivo CSV. O processamento dessa importação deve ser realizado em *background*. Para isso, crie um serviço dedicado a essa tarefa.

**Tarefa 8: Implementação do Gerenciamento de Usuários (Fullstack)**
O sistema atualmente não possui as funcionalidades de gerenciamento de usuários no frontend. Sua tarefa é implementar as telas de listagem, criação e edição de usuários, bem como integrar com as APIs de backend existentes para:
*   Listar todos os usuários.
*   Criar novos usuários.
*   Editar usuários existentes.
Certifique-se de seguir os padrões de código, estilo e arquitetura já estabelecidos no projeto, tanto no frontend quanto na integração com o backend.

**Tarefa 9: Gestão de Perfis de Usuário e Acesso (Frontend)**
Crie um novo tipo de Perfil de Usuário chamado "Operator" no frontend. Em seguida, implemente uma nova gestão de acesso onde:
*   O perfil "Administrator" pode gerenciar tanto usuários quanto clientes.
*   O perfil "Operator" pode gerenciar apenas clientes (não terá acesso às funcionalidades do contexto de usuário).
Atente-se à forma de gerenciar permissões e acesso no frontend, seguindo as melhores práticas.

**Tarefa 10: Nova Funcionalidade (Livre)**
Implemente uma nova funcionalidade no sistema. Esta funcionalidade pode ser apenas no frontend, apenas no backend, ou em ambos, de forma livre. Utilize esta atividade para demonstrar suas habilidades e criatividade, aplicando boas práticas de desenvolvimento e design.

## Finalização e Entrega

Ao concluir as tarefas (ou o máximo que conseguir dentro do prazo), siga o passo abaixo para submeter seu trabalho:

1.  **Criação do Pull Request:**
    Crie um "Pull Request" das suas alterações do seu repositório "forkado" para o repositório original deste teste.
    [Guia para criar um Pull Request a partir de um fork](https://docs.github.com/pt/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork)

Agradecemos sua participação e dedicação!
