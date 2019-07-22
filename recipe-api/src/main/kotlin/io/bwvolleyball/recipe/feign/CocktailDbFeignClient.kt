package io.bwvolleyball.recipe.feign

import io.bwvolleyball.recipe.domain.*
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam

@FeignClient(name = "cocktailDbFeignClient", url = "https://www.thecocktaildb.com/api/json/\${bwvolleyball.cocktaildb.version:v1}/\${bwvolleyball.cocktaildb.api-key:1}")
interface CocktailDbFeignClient {

    @GetMapping(path = ["/search.php"])
    fun searchByName(@RequestParam(name = "s") name: String): CocktailDbResponse

    @GetMapping(path = ["/lookup.php"])
    fun findById(@RequestParam(name = "i") id: Long): CocktailDbResponse

    @GetMapping(path = ["/random.php"])
    fun randomRecipe(): CocktailDbResponse

    @GetMapping(path = ["/categories.php"])
    fun categories(): CocktailDbCategories

    @GetMapping(path = ["/list.php"])
    fun plainCategories(@RequestParam(name = "c") value: String = "list"): CocktailDbPlainCategories

    @GetMapping(path = ["/list.php"])
    fun allAreas(@RequestParam(name = "a") value: String = "list"): CocktailDbAreas

    @GetMapping(path = ["/list.php"])
    fun allIngredients(@RequestParam(name = "i") value: String = "list"): CocktailDbIngredients

    @GetMapping(path = ["/filter.php"])
    fun findByIngredient(@RequestParam(name = "i") ingredient: String): CocktailDbFilterResponse

    @GetMapping(path = ["/filter.php"])
    fun findByIngredient(@RequestParam(name = "i") ingredients: List<String>): CocktailDbFilterResponse

    @GetMapping(path = ["/filter.php"])
    fun findByCategory(@RequestParam(name= "c") category: String): CocktailDbFilterResponse

    @GetMapping(path = ["/filter.php"])
    fun findByArea(@RequestParam(name = "a") area: String): CocktailDbFilterResponse
}
