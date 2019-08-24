import io.spring.gradle.dependencymanagement.dsl.DependencyManagementExtension
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.1.6.RELEASE"
	id("io.spring.dependency-management") version "1.0.8.RELEASE"
	kotlin("jvm") version "1.3.40"
	kotlin("plugin.spring") version "1.3.40"
	id ("com.gradle.build-scan") version "2.3"
	id("com.gorylenko.gradle-git-properties") version "1.5.1"
}

apply (plugin = "io.spring.dependency-management")

buildScan {
	termsOfServiceUrl = "https://gradle.com/terms-of-service"
	termsOfServiceAgree = "yes"

	publishAlways()
}

group = "io.bwvolleyball"
version = "0.0.1-SNAPSHOT"

val swaggerVersion = "2.9.2"

java {
	sourceCompatibility = JavaVersion.VERSION_1_8
}
repositories {
	mavenCentral()
	jcenter()
}

ext {
	set("springCloudVersion", "Greenwich.SR1")
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-actuator")
	implementation ("org.jetbrains.kotlin:kotlin-reflect")
	implementation ("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
//	implementation ("org.springframework.cloud:spring-cloud-starter-config")
	implementation ("org.springframework.cloud:spring-cloud-starter-gateway")
//	implementation ("org.springframework.cloud:spring-cloud-starter-netflix-eureka-client")
	runtimeOnly ("org.springframework.boot:spring-boot-devtools")
	testImplementation ("org.springframework.boot:spring-boot-starter-test")
}

configure<DependencyManagementExtension> {
	imports {
		mavenBom("org.springframework.cloud:spring-cloud-dependencies:${ext.get("springCloudVersion")}")
	}
}

tasks.withType<KotlinCompile>() {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "1.8"
	}
}
