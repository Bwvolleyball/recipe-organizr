package io.bwvolleyball.recipe

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.openfeign.EnableFeignClients

@EnableFeignClients
@SpringBootApplication
class RecipeApiApplication

fun main(args: Array<String>) {
	runApplication<RecipeApiApplication>(*args)
}
