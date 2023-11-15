# 使用官方 PHP 映像作為基本映像
FROM php:8.1-apache-buster

# 安裝一些常用的工具和套件
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN pecl install redis && docker-php-ext-enable redis

# 安裝 Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# 安裝 Laravel 的相依項目
RUN composer global require laravel/installer

# 設定工作目錄
WORKDIR /var/www/html

# 在容器中建立 Laravel 專案
#RUN composer create-project --prefer-dist laravel/laravel .

# 複製你的 Laravel 代碼到容器
COPY . /var/www/html

RUN composer install

# 設定文件和目錄權限
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# 將 PHP-FPM 配置文件複製到容器中
#COPY php-fpm.conf /usr/local/etc/php-fpm.d/www.conf

# 開放容器內的 9000 端口
#EXPOSE 9000

# 啟動 PHP-FPM 伺服器
#CMD ["php-fpm"]
CMD ["php", "artisan", "serve", "--host", "0.0.0.0", "--port", "9000"]
