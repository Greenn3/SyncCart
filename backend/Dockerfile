# Etap 1: budowanie JAR-a
FROM gradle:8.4-jdk21 AS builder
WORKDIR /app
COPY . .
RUN gradle bootJar

# Etap 2: lekki obraz do uruchomienia
FROM eclipse-temurin:21
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
