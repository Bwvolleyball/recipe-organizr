package io.bwvolleyball.recipe.controller

import io.bwvolleyball.recipe.domain.Recipe
import io.bwvolleyball.recipe.feign.MealDbFeignClient
import mu.KotlinLogging
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/recipe")
class RecipeController(private val mealDbFeignClient: MealDbFeignClient) {

    val logger = KotlinLogging.logger{}

    @GetMapping(path = ["/predict"])
    fun predictiveText(@RequestParam(name = "name", required = true) name: String,
                       @RequestParam(name = "limit", required = false, defaultValue = "10") limit: Int): List<String> {
        logger.info { "Received a predict request for '$name' and a limit of $limit" }
        return mealDbFeignClient.searchByName(name).names().take(limit).sorted()
    }

    @GetMapping(path = ["/search"])
    fun searchRecipe(@RequestParam(name = "name", required = true) name: String,
                     @RequestParam(name = "limit", required = false, defaultValue = "10") limit: Int): List<Recipe> {
        logger.info { "Received a search request for '$name' and a limit of $limit" }
        return mealDbFeignClient.searchByName(name).toRecipes().take(limit).sortedBy { it.name }
    }

    @GetMapping(path = ["/random"])
    fun randomRecipe(): Recipe {
        return mealDbFeignClient.randomRecipe().toRecipes().first()
    }

    @GetMapping(path = ["/{id}"])
    fun recipeById(@PathVariable(name = "id", required = true) id: Long): Recipe {
        return mealDbFeignClient.findById(id).toRecipes().first()
    }

}