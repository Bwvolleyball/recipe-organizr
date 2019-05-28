package io.bwvolleyball.recipe.controller

import io.bwvolleyball.recipe.domain.Recipe
import io.bwvolleyball.recipe.feign.MealDbFeignClient
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/recipe")
class RecipeController(private val mealDbFeignClient: MealDbFeignClient) {

    @GetMapping
    fun randomRecipe(): List<Recipe> {
        return mealDbFeignClient.randomRecipe().toRecipes()
    }

    @GetMapping(path = ["/predict"])
    fun predictiveText(@RequestParam(name = "name", required = true) name: String,
                       @RequestParam(name = "limit", required = false, defaultValue = "10") limit: Int): List<String> {
        return mealDbFeignClient.searchByName(name).names().take(limit).sorted()
    }

    @GetMapping(path = ["/search"])
    fun searchRecipe(@RequestParam(name = "name", required = true) name: String,
                     @RequestParam(name = "limit", required = false, defaultValue = "10") limit: Int): List<Recipe> {
        return mealDbFeignClient.searchByName(name).toRecipes().take(limit).sortedBy { it.category + it.name }
    }

    @GetMapping(path = ["/{id}"])
    fun recipeById(@PathVariable(name = "id", required = true) id: Long): Recipe {
        return mealDbFeignClient.findById(id).toRecipes().first()
    }
}