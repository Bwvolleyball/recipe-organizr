package io.bwvolleyball.recipe.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Component("mealDbProperties")
@ConfigurationProperties(prefix = "bwvolleyball.mealdb")
class MealDbProperties {
    lateinit var apiKey: String
}