import io.spring.gradle.dependencymanagement.dsl.DependencyManagementExtension
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	kotlin("plugin.jpa") version "1.3.40"
	id("org.springframework.boot") version "2.1.6.RELEASE"
	id("io.spring.dependency-management") version "1.0.8.RELEASE"
	kotlin("jvm") version "1.3.40"
	kotlin("plugin.spring") version "1.3.40"
	id ("com.gradle.build-scan") version "2.3"
}

apply (plugin = "io.spring.dependency-management")

buildScan {
	termsOfServiceUrl = "https://gradle.com/terms-of-service"
	termsOfServiceAgree = "yes"

	publishAlways()
}

group = "io.bwvolleyball"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_1_8

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

val kotlinLogginVersion = "1.6.24"
val flywayVersion = "5.2.4"
val jjwtVersion = "0.10.5"
val bouncyCastleVersion = "1.60"
val swaggerVersion = "2.9.2"

repositories {
	mavenCentral()
}

ext {
	set("springCloudVersion", "Greenwich.SR1")
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-actuator")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	implementation("io.springfox:springfox-swagger2:$swaggerVersion")
	implementation("io.springfox:springfox-swagger-ui:$swaggerVersion")
	implementation("io.github.microutils:kotlin-logging:$kotlinLogginVersion")
	runtimeOnly("org.springframework.boot:spring-boot-devtools")
	annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
}

configure<DependencyManagementExtension> {
	imports {
		mavenBom("org.springframework.cloud:spring-cloud-dependencies:${ext.get("springCloudVersion")}")
	}
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "1.8"
	}
}
