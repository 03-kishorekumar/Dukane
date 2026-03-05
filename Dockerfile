#FROM openjdk
#FROM openjdk:17-jdk-slim
FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY target/dukane_pro-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

# java jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]

