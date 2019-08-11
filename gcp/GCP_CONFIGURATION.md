# Configuration Details About GCP
> This project is running in Google Cloud Compute - on a container optimized OS.
> It is running via docker-compose up, with the docker-compose specifically created for GCP in this directory.

## Managing SSL certificates

On the google compute engine server, you must create the `ssl`volume via `docker volume create ssl`.

Follow these instructions for generating an SSL certificate: TODO: LINK HERE

At this time, the certificate is not configured for auto-renewal, if this project is continued then the cert
will be configured to auto-renew at that time!

### Commands to generate an SSL certificate
> This requires you to have certbot and openssl installed on the machine! For my purposes, I wrote custom
> shell scripts that ran each of these commands in a docker container, which effectively simulated having both commands
> installed! These commands are more for my notes, but they could help you replicate this process!

```bash
# Request a certificate
./certbot certonly --standalone --preferred-challenges http -d ${DOMAIN} -m ${EMAIL} -n --agree-tos
# Convert it to a .p12 for spring boot
./openssl pkcs12 -export -in /etc/letsencrypt/live/${DOMAIN}/fullchain.pem -inkey /etc/letsencrypt/live/${DOMAIN}/privkey.pem -out /etc/letsencrypt/live/${DOMAIN}/keystore.p12 -name recipe-organizr -CAfile /etc/letsencrypt/live/${DOMAIN}/chain.pem -caname root
# To check the certs
docker run --rm -i -v=ssl:/etc/letsencrypt busybox find /etc/letsencrypt
```

