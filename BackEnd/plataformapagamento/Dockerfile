# Etapa 1: Build com Maven
FROM maven:3.9.4-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Etapa 2: Executar o JAR
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

# Argumento opcional para a porta (backend geralmente usa 8080)
EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
