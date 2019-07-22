package io.bwvolleyball.recipe.domain

import mu.KotlinLogging
import javax.annotation.Generated
import javax.persistence.Entity
import javax.persistence.Id

data class Recipe(val id: Long,
                  val name: String,
                  val category: String,
                  val locale: String? = null,
                  val instructions: List<String>,
                  val thumbnail: String,
                  val tags: List<String>,
                  val video: String?,
                  val source: String?,
                  val ingredients: List<Ingredient>,
                  val recipeType: RecipeType)

data class Ingredient(val name: String, val amount: String)

object BlankRecipe {
    val value = Recipe(0L, "", "", null, emptyList(), "", emptyList(), null, null, emptyList(), RecipeType.MEAL)
}

enum class RecipeType {
    MEAL,
    DRINK;

    companion object {

        private val logger = KotlinLogging.logger {  }

        fun recipeType(type: String): RecipeType {
            val upperCased = type.toUpperCase()
            return if (values().map { it.name }.contains(upperCased)) {
                valueOf(type.toUpperCase())
            } else {
                // default to MEAL
                logger.warn("Unable to deterimine RecipeType from {}, defaulting to MEAL", upperCased)
                MEAL
            }
        }
    }
}