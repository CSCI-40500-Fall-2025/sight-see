FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

# Give mvnw execute permission
RUN chmod +x mvnw

# Build the app
RUN ./mvnw clean package -DskipTests

CMD ["java", "-jar", "target/*.jar"]
