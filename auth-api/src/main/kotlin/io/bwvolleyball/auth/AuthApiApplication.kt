package io.bwvolleyball.auth

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.openfeign.EnableFeignClients

@EnableFeignClients
@SpringBootApplication
class AuthApiApplication

fun main(args: Array<String>) {
	runApplication<AuthApiApplication>(*args)
}
