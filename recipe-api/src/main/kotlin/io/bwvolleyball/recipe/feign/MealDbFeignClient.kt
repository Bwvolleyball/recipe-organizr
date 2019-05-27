package io.bwvolleyball.recipe.feign

import io.bwvolleyball.recipe.domain.*
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam

@FeignClient(name = "mealDbFeignClient", url = "https://www.themealdb.com/api/json/v1/\${bwvolleyball.mealdb.api-key:1}")
interface MealDbFeignClient {

    @GetMapping(path = ["/search.php"])
    fun searchByName(@RequestParam(name = "s") name: String): MealDbResponse

    @GetMapping(path = ["/lookup.php"])
    fun findById(@RequestParam(name = "i") id: Long): MealDbResponse

    @GetMapping(path = ["/random.php"])
    fun randomRecipe(): MealDbResponse

    @GetMapping(path = ["/categories.php"])
    fun categories(): MealDbCategories

    @GetMapping(path = ["/list.php"])
    fun plainCategories(@RequestParam(name = "c") value: String = "list"): MealDbPlainCategories

    @GetMapping(path = ["/list.php"])
    fun allAreas(@RequestParam(name = "a") value: String = "list"): MealDbAreas

    @GetMapping(path = ["/list.php"])
    fun allIngredients(@RequestParam(name = "i") value: String = "list"): MealDbIngredients

    @GetMapping(path = ["/filter.php"])
    fun findByIngredient(@RequestParam(name = "i") ingredient: String): MealDbFilterResponse

    @GetMapping(path = ["/filter.php"])
    fun findByCategory(@RequestParam(name= "c") category: String): MealDbFilterResponse

    @GetMapping(path = ["/filter.php"])
    fun findByArea(@RequestParam(name = "a") area: String): MealDbFilterResponse
}
