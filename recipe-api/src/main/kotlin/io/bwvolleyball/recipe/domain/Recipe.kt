package io.bwvolleyball.recipe.domain

import javax.annotation.Generated
import javax.persistence.Entity
import javax.persistence.Id

data class Recipe(val id: Long,
                  val name: String,
                  val category: String,
                  val locale: String,
                  val instructions: List<String>,
                  val thumbnail: String,
                  val tags: List<String>,
                  val video: String,
                  val source: String?,
                  val ingredients: List<Ingredient>)

data class Ingredient(val name: String, val amount: String)