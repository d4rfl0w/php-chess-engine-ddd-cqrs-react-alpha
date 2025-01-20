# Dockerfile
FROM php:8.2-fpm-alpine3.17

LABEL maintainer="d4rfl0w@gmail.com" \
      description="Obraz kontenera PHP z potrzebnymi rozszerzeniami i narzędziami"

# Aktualizacja i instalacja zależności
RUN apk --no-cache update && \
    apk --no-cache upgrade && \
    apk add --no-cache oniguruma-dev libxml2-dev libxslt-dev libpng libpng-dev libzip libzip-dev tzdata $PHPIZE_DEPS linux-headers && \
    docker-php-ext-install pdo_mysql mbstring simplexml xml xsl gd zip soap && \
    docker-php-ext-configure gd && \
    pecl install xdebug && \
    docker-php-ext-enable xdebug

# Skopiowanie pliku konfiguracyjnego php.ini
COPY ./docker/php/php.ini /usr/local/etc/php/conf.d/php.ini

# Ustawienia katalogu roboczego
WORKDIR /var/www/html

# Instalacja Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Skopiowanie kodu aplikacji do kontenera
COPY . .

# Ustawienia uprawnień
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html