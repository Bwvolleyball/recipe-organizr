FROM openjdk:8-jdk-alpine
VOLUME /tmp
COPY ./build/libs/cookbook-api-*.jar app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
