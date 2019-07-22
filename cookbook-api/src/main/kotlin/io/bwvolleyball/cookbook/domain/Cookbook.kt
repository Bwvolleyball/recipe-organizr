package io.bwvolleyball.cookbook.domain

import javax.persistence.*

@Entity
@Table(name = "cookbooks")
data class Cookbook(
        @Id val userId: String,
        @ElementCollection(fetch = FetchType.LAZY)
        @CollectionTable(name = "cookbook_recipes", joinColumns = [JoinColumn(name = "user_id")])
        val recipes: Set<TypedRecipe> = emptySet())

@Embeddable
data class TypedRecipe(val recipeId: String, val recipeType: String)
