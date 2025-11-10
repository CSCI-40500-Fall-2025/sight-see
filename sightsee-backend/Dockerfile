# Use OpenJDK 17 (or your version)
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy the project files
COPY . .

# Build the app
RUN ./mvnw clean package -DskipTests

# Run the jar
CMD ["java", "-jar", "target/*.jar"]