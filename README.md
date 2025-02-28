Desafio: Sistema de Notificações em Tempo Real com Processamento Assíncrono
Descrição:
Crie um sistema que permita o envio de notificações em tempo real para usuários, com processamento assíncrono de mensagens e armazenamento de dados. O sistema deve ser escalável, seguro e totalmente gerenciado pela AWS.
-----
Funcionalidades Principais:
API Gateway:

Crie uma API RESTful que receba solicitações de envio de notificações.

A API deve aceitar um payload contendo o ID do usuário, a mensagem e a prioridade da notificação (alta, média, baixa).

Lambda (Processamento de Entrada):

Uma função Lambda deve ser acionada pela API Gateway para validar o payload e publicar a mensagem em um tópico do SNS.

SNS (Simple Notification Service):

Configure um tópico SNS para receber as mensagens da Lambda.

Crie três filas SQS (uma para cada prioridade: alta, média, baixa) que se inscrevam no tópico SNS, filtrando as mensagens por prioridade.

SQS (Simple Queue Service):

As filas SQS devem armazenar as mensagens filtradas por prioridade.

Crie uma segunda função Lambda que seja acionada automaticamente quando novas mensagens chegarem nas filas SQS.

Lambda (Processamento de Saída):

A segunda função Lambda deve processar as mensagens das filas SQS e:

Armazenar os dados no DynamoDB (ex.: ID do usuário, mensagem, prioridade, timestamp).

Enviar uma notificação simulada (ex.: log no CloudWatch ou um e-mail via SNS).

DynamoDB:

Armazene os dados das notificações em uma tabela do DynamoDB.

Crie índices para permitir consultas eficientes, como buscar notificações por ID do usuário ou por prioridade.

Monitoramento e Logs:

Use CloudWatch para monitorar o desempenho das Lambdas, filas SQS e tópicos SNS.

Gere métricas e alarmes para identificar gargalos ou falhas no sistema.

Extras (para aumentar o desafio):
Autenticação e Autorização:

Integre o Cognito para autenticar usuários e autorizar o acesso à API Gateway.

Apenas usuários autenticados podem enviar notificações.

Escalabilidade:

Configure o DynamoDB com auto-scaling para lidar com grandes volumes de dados.

Ajuste as configurações de concorrência das Lambdas para garantir que o sistema seja eficiente sob carga.

Testes de Carga:

Use ferramentas como Artillery ou AWS Lambda Power Tuning para testar a escalabilidade do sistema.

CI/CD:

Automatize o deploy da infraestrutura usando AWS SAM ou Terraform.

Configure um pipeline de CI/CD com GitHub Actions ou AWS CodePipeline.

Documentação:

Crie um README detalhado no GitHub explicando a arquitetura, como configurar o projeto localmente e como testar cada componente.
-----
Tecnologias Utilizadas:
API Gateway: Para expor a API RESTful.

Lambda: Para processamento de entrada e saída.

SNS: Para distribuição de mensagens.

SQS: Para filas de processamento assíncrono.

DynamoDB: Para armazenamento de dados.

CloudWatch: Para monitoramento e logs.

Cognito (opcional): Para autenticação.

AWS SAM/Terraform: Para infraestrutura como código.