#!/bin/bash

echo ======== DEPLOY MMARTAN SERVER : INÍCIO ========

echo Subindo mmartanServer.jar...
sshpass -vp $LOCAWEB_PASSWORD scp /media/renato/Dados/Desenv/mmartan/backend/target/mmartanServer.jar root@vps6174.publiccloud.com.br:/home/renato/mmartanServer2.jar

echo Conectando ao servidor da Locaweb...
sshpass -vp $LOCAWEB_PASSWORD ssh -o StrictHostKeyChecking=no root@vps6174.publiccloud.com.br << EOF_OF_COMMAND
  echo Parando serviço mmartanServer
  service mmartanServer stop

  echo Excluindo versão anterior
  rm /home/renato/mmartanServer.jar

  echo Renomeando versão nova para mmartanServer.jar
  mv /home/renato/mmartanServer2.jar /home/renato/mmartanServer.jar

  echo Iniciar serviço mmartanServer
  service mmartanServer start
EOF_OF_COMMAND

echo ======== DEPLOY MMARTAN SERVER : FIM ========


echo Conectando ao servidor da Locaweb...
sshpass -vp $LOCAWEB_PASSWORD ssh -o StrictHostKeyChecking=no root@vps6174.publiccloud.com.br << EOF_OF_COMMAND
  echo teste
EOF_OF_COMMAND
