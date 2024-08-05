#!/bin/sh
set -e

# Запуск Nginx в фоне
nginx &

# Ожидание, пока Nginx запустится
sleep 5

# Получение сертификатов
certbot certonly --webroot \
  --webroot-path=/var/www/html \
  --email spl33t@ya.ru \
  --agree-tos \
  --no-eff-email \
  -d amsvent.ru \
  -d api.amsvent.ru

# Запуск Certbot для автоматического обновления сертификатов
exec /bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'
