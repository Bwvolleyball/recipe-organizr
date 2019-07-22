package io.bwvolleyball.cookbook.controller

import io.bwvolleyball.cookbook.domain.Cookbook
import io.bwvolleyball.cookbook.domain.TypedRecipe
import io.bwvolleyball.cookbook.repository.CookbookRepository
import mu.KotlinLogging
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping(path = ["/api/cookbook"])
class CookbookController(private val cookbookRepository: CookbookRepository) {

    val logger = KotlinLogging.logger{}

    /**
     * Either get the cookbook for this user or else return them a new cookbook.
     */
    @GetMapping(path = ["/{userId}"])
    fun getCookbook(@PathVariable("userId") userId: String): Cookbook {
        logger.info("Retrieving the cookbook for {}", userId)
        return cookbookRepository.findById(userId).orElse(Cookbook(userId))
    }

    /**
     * Save or update a user's cookbook, which typically is just changing the list of recipes contained within the cookbook.
     */
    @PostMapping(path = ["/{userId}"])
    fun saveCookbook(@PathVariable("userId") userId: String, @RequestBody(required = true) recipes: List<TypedRecipe>): Cookbook {
        logger.info("Saving the cookbook for {} with recipes {}", userId, recipes)
        return cookbookRepository.saveAndFlush(Cookbook(userId, recipes.toSet()))
    }

    @DeleteMapping(path = ["/{userId}"])
    fun deleteCookbook(@PathVariable("userId") userId: String): ResponseEntity<Void> {
        logger.info("Deleting the cookbook for {}", userId)
        cookbookRepository.deleteById(userId)
        return ResponseEntity.noContent().build()
    }
}