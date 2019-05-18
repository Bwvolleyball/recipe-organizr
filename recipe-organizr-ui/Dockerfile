FROM httpd
COPY ./docker/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./docker/.htaccess /usr/local/apache2/htdocs/.htaccess
COPY ./dist/recipe-organizr-ui /usr/local/apache2/htdocs/
