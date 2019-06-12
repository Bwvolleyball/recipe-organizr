package io.bwvolleyball.cookbook

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class CookbookApiApplication

fun main(args: Array<String>) {
	runApplication<CookbookApiApplication>(*args)
}
