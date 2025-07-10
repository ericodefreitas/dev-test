#!/bin/bash

# Configurações
CONTAINER_NAME="client-control-mysql"
MYSQL_ROOT_PASSWORD="R9Q97t9pgiwcRhrfDKyGCjT-"
MYSQL_DATABASE="clientcontrol"
MYSQL_USER="application_user"
MYSQL_PASSWORD="NbY3GxT@M_f!owe6sy93X9Uk"
MYSQL_IMAGE="mysql/mysql-server:latest"

# Subir o container MySQL
docker run --name $CONTAINER_NAME \
  -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
  -e MYSQL_DATABASE=$MYSQL_DATABASE \
  -p 3306:3306 \
  -d $MYSQL_IMAGE

# Esperar o MySQL iniciar
echo "Aguardando MySQL iniciar..."
sleep 20

# Criar o arquivo de script SQL
cat <<EOF > init-user.sql
CREATE USER IF NOT EXISTS '$MYSQL_USER'@'%' IDENTIFIED BY '$MYSQL_PASSWORD';
GRANT ALL PRIVILEGES ON *.* TO '$MYSQL_USER'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EOF

# Rodar o script SQL dentro do container
docker exec -i $CONTAINER_NAME \
  mysql -u root -p$MYSQL_ROOT_PASSWORD < init-user.sql

# Remover o script local
rm init-user.sql

echo "Usuário '$MYSQL_USER' criado com sucesso e autorizado a conectar remotamente."
