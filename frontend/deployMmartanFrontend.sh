#!/bin/bash

echo ======== DEPLOY mmartanFrontend : INÍCIO ========

cd  ./build

echo compactando arquivos de recursos html, css, js...
echo 
rm ./mmartanFrontend.tar.bz2
tar -cvjf mmartanFrontend.tar.bz2 ./*
echo 
echo fim da compactacao dos arquivos de recursos

echo Subindo mmartanFrontend.tar.bz2...
echo 
sshpass -vp $LOCAWEB_PASSWORD scp /media/renato/Dados/Desenv/mmartan/frontend/build/mmartanFrontend.tar.bz2 root@vps6174.publiccloud.com.br:/home/renato/mmartanFrontend.tar.bz2
echo 
echo Fim upload mmartanFrontend.tar.bz2

echo Conectando ao servidor da Locaweb...
sshpass -p $LOCAWEB_PASSWORD ssh -o StrictHostKeyChecking=no root@vps6174.publiccloud.com.br << EOF_OF_COMMAND
  echo Parando serviço nginx
  service nginx stop

  echo excluindo versao antiga
  cd /usr/share/nginx/html
  rm -R mmartan

  echo preparando arquivo para descompactacao
  cd  /home/renato
  rm -R mmartan
  mkdir mmartan
  mv mmartanFrontend.tar.bz2 ./mmartan
  cd mmartan

  echo descompactando arquivo mmartanFrontend.tar.bz2
  tar -xvjf mmartanFrontend.tar.bz2

  echo excluindo arquivo compactado
  rm ./mmartanFrontend.tar.bz2

  echo movendo arquivo descompactado para o diretorio do servidor nginx
  mv /home/renato/mmartan /usr/share/nginx/html/mmartan

  echo Iniciar serviço nginx
  service nginx start
EOF_OF_COMMAND

echo ======== DEPLOY mmartanFrontend : FIM ========
