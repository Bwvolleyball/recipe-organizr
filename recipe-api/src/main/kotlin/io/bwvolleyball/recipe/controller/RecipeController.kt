package io.bwvolleyball.recipe.controller

import io.bwvolleyball.recipe.domain.Recipe
import io.bwvolleyball.recipe.domain.RecipeType
import io.bwvolleyball.recipe.feign.CocktailDbFeignClient
import io.bwvolleyball.recipe.feign.MealDbFeignClient
import io.bwvolleyball.recipe.service.RecipeService
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.async
import mu.KotlinLogging
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/recipe")
class RecipeController(
        private val recipeService: RecipeService
) {

    val logger = KotlinLogging.logger{}

    @GetMapping(path = ["/predict"])
    fun predictiveText(@RequestParam(name = "name", required = true) name: String,
                       @RequestParam(name = "limit", required = false, defaultValue = "10") limit: Int): List<Pair<String, RecipeType>> {
        logger.info { "Received a predict request for '$name' and a limit of $limit" }
        return recipeService.predictiveText(name, limit)
    }

    @GetMapping(path = ["/search"])
    fun searchRecipe(@RequestParam(name = "name", required = true) name: String,
                     @RequestParam(name = "limit", required = false, defaultValue = "10") limit: Int): List<Recipe> {
        logger.info { "Received a search request for '$name' and a limit of $limit" }
        return recipeService.searchRecipe(name, limit)
    }

    @GetMapping(path = ["/random"])
    fun randomRecipe(): Recipe {
        return recipeService.randomRecipe()
    }

    @GetMapping(path = ["/{id}"])
    @Deprecated("This is deprecated, and always defaults to MEAL, use the one that specifies a type", replaceWith = ReplaceWith("recipeById(type, id)"))
    fun recipeById(@PathVariable(name = "id", required = true) id: Long): Recipe {
        logger.warn("Deprecated usage of 'recipeById' detected, defaulting to MEAL type.")
        return recipeService.recipeById(id, RecipeType.MEAL)
    }

    @GetMapping(path = ["/{type}/{id}"])
    fun recipeById(@PathVariable(name = "type", required = true) type: String ,@PathVariable(name = "id", required = true) id: Long): Recipe {
        return recipeService.recipeById(id, RecipeType.recipeType(type))
    }

}