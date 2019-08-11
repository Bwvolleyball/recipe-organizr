# Configuration Details About GCP
> This project is running in Google Cloud Compute - on a container optimized OS.
> It is running via docker-compose up, with the docker-compose specifically created for GCP in this directory.

## Automatic Deployments

This project is automatically deployed to GCP from travis ci builds of the master branch by leveraging the 
[deploy script](./deploy.sh).  This script downloads the latest version of the docker compose for GCP, and then refreshes
all the images associated with this application.  It starts these images in the background on the server, so that they
continue to run even after the travis build terminates the ssh connection to the compute engine server.

## Managing SSL certificates

On the google compute engine server, you must create the `ssl`volume via `docker volume create ssl`.

Follow these instructions for generating an SSL certificate detailed [below](#commands-to-generate-an-ssl-certificate).

The [docker-compose.yml for GCP](./docker-compose.yml) expects these SSL certificates to exist in the `ssl` docker volume
and attempting to start the gateway image on GCP will fail if this is not the case.

Unlike configuring locally trusted SSL certificates, these certificates must be issued by a trusted certificate authority (CA).
LetsEncrypt is the selected CA due to the fact that their SSL certificates are free with a short expiration, making them less
useful if they are stolen since they are only valid for 90 days at a time as opposed to the years purchased SSL certificates
might be valid for.

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
