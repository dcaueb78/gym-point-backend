Inicializar ambiente de desenvolvimento `yarn dev`

Rodar eslint para organizar todos os arquivos JS `yarn eslint --fix src --ext .js`

Criar docker postgres `docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11`

Levantar container postgres `docker start database`

Criar migration `yarn sequelize migration:create --name=create-users`, onde name é o nome da migration

Carregar migration `yarn sequelize db:migrate`

Desfazer ultima migration `yarn sequelize db:migrate:undo`

Desfazer todas as migrations `yarn sequelize db:migrate:undo:all`

Criar container MongoDB `docker run --name mongobarber -p 27017:27017 -d -t mongo`

Levantar container MongoDB `docker start mongobarber`

Criar container Redis `docker run --name redisbarber -p 6379:6379 -d -t redis:alpine`

Levantar container Redis `docker start redisbarber`

Rodar Queue Redis `yarn queue`
