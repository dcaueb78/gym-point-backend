Inicializar ambiente de desenvolvimento `yarn dev`

Rodar eslint para organizar todos os arquivos JS `yarn eslint --fix src --ext .js`

Criar docker postgres `docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11`

Levantar container postgres `docker start database`

Criar migration `yarn sequelize migration:create --name=create-users`, onde name é o nome da migration

Carregar migration `yarn sequelize db:migrate`

Desfazer ultima migration `yarn sequelize db:migrate:undo`

Desfazer todas as migrations `yarn sequelize db:migrate:undo:all`

Gerar Seed `yarn sequelize seed:generate --name admin-user`

Carregar Seeds `yarn sequelize db:seed:all`
