FROM openjdk:8-jdk-alpine
COPY ./build/libs/auth-api-*.jar app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
