package io.bwvolleyball.recipe.service

import io.bwvolleyball.recipe.domain.BlankRecipe
import io.bwvolleyball.recipe.domain.Recipe
import io.bwvolleyball.recipe.domain.RecipeType
import io.bwvolleyball.recipe.feign.CocktailDbFeignClient
import io.bwvolleyball.recipe.feign.MealDbFeignClient
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.async
import kotlinx.coroutines.runBlocking
import mu.KotlinLogging
import org.springframework.stereotype.Service
import kotlin.random.Random

interface RecipeService {

    fun predictiveText(name: String, limit: Int): List<Pair<String, RecipeType>>
    fun searchRecipe(name: String, limit: Int): List<Recipe>
    fun randomRecipe(): Recipe
    fun recipeById(id: Long, recipeType: RecipeType): Recipe
}

/**
 * Handle calling one or the other DB api (CocktailDB or MealDB) concurrently,
 * merge the results to a recipe, and return them to the controller.
 */
@Service
class RecipeServiceImpl(
        private val mealDbFeignClient: MealDbFeignClient,
        private val cocktailDbFeignClient: CocktailDbFeignClient
) : RecipeService {
    private val logger = KotlinLogging.logger {}

    override fun predictiveText(name: String, limit: Int): List<Pair<String, RecipeType>> {
        val meals = async { mealDbFeignClient.searchByName(name).typedNames() }
        val drinks = async { cocktailDbFeignClient.searchByName(name).typedNames() }
        return merged(meals, drinks) { sortedBy{ it.first }.take(limit) }
    }

    override fun searchRecipe(name: String, limit: Int): List<Recipe> {
        val meals = async { mealDbFeignClient.searchByName(name).toRecipes() }
        val drinks = async { cocktailDbFeignClient.searchByName(name).toRecipes() }
        return merged(meals, drinks) { sortedBy { it.name }.take(limit) }
    }

    override fun randomRecipe(): Recipe {
        return if (Random.nextBoolean()) {
            logger.debug("Randomly selecting a meal!")
            mealDbFeignClient.randomRecipe().toRecipes().first()
        } else {
            logger.debug("Randomly selecting a cocktail!")
            cocktailDbFeignClient.randomRecipe().toRecipes().first()
        }

    }

    override fun recipeById(id: Long, recipeType: RecipeType): Recipe {
        return when (recipeType) {
            RecipeType.MEAL -> mealDbFeignClient.findById(id).toRecipes().firstOrNull() ?: BlankRecipe.value
            RecipeType.DRINK -> cocktailDbFeignClient.findById(id).toRecipes().firstOrNull() ?: BlankRecipe.value
        }
    }

    private fun <T> async(supplier: () -> List<T>): Deferred<List<T>> {
        return GlobalScope.async { supplier() }
    }

    /**
     * Generically merge 2 deferred lists of content,
     * and run the processing function against the list after both results are collected.
     */
    private fun <T> merged(first: Deferred<List<T>>, second: Deferred<List<T>>, process: List<T>.() -> List<T>): List<T> {
        return runBlocking {
            val one = first.await()
            val two = second.await()
            one.plus(two).process()
        }
    }
}