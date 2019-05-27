package io.bwvolleyball.recipe.controller

import io.bwvolleyball.recipe.domain.Recipe
import io.bwvolleyball.recipe.feign.MealDbFeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/api/recipe")
class RecipeController(private val mealDbFeignClient: MealDbFeignClient) {

    @GetMapping
    fun randomRecipe(): List<Recipe>{
        return mealDbFeignClient.randomRecipe().toRecipes()
    }
}