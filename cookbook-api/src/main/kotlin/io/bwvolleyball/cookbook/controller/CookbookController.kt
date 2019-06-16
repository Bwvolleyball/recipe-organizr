package io.bwvolleyball.cookbook.controller

import io.bwvolleyball.cookbook.domain.Cookbook
import io.bwvolleyball.cookbook.repository.CookbookRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping(path = ["/api/cookbook"])
class CookbookController(private val cookbookRepository: CookbookRepository) {

    /**
     * Either get the cookbook for this user or else return them a new cookbook.
     */
    @GetMapping(path = ["/{userId}"])
    fun getCookbook(@PathVariable("userId") userId: String): Cookbook {
        return cookbookRepository.findById(userId).orElse(Cookbook(userId))
    }

    /**
     * Save or update a user's cookbook, which typically is just changing the list of recipes contained within the cookbook.
     */
    @PostMapping(path = ["/{userId}"])
    fun saveCookbook(@PathVariable("userId") userId: String, @RequestBody(required = true) recipes: List<String>): Cookbook {
        return cookbookRepository.save(Cookbook(userId, recipes))
    }

    @DeleteMapping(path = ["/{userId}"])
    fun deleteCookbook(@PathVariable("userId") userId: String): ResponseEntity<Void> {
        cookbookRepository.deleteById(userId)
        return ResponseEntity.noContent().build()
    }
}