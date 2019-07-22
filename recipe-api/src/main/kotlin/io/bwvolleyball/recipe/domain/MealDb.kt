/**
 * Everything in this file represents responses from
 * [https://www.themealdb.com/api.php]. These classes will
 * also handle some translations to better domain classes
 * when it makes sense.
 */
package io.bwvolleyball.recipe.domain

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonInclude

data class MealDbResponse(val meals: List<MealDbMeal>?) {
    fun toRecipes(): List<Recipe> {
        return meals?.map { it.toRecipe() } ?: emptyList()
    }

    fun names(): List<String> {
        return meals?.map{it.name()} ?: emptyList()
    }

    fun typedNames(): List<Pair<String, RecipeType>> {
        return meals?.map { it.name() to RecipeType.MEAL } ?: emptyList()
    }
}

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
data class MealDbMeal(val idMeal: String,
                      val strMeal: String,
                      val strCategory: String,
                      val strArea: String,
                      val strInstructions: String,
                      val strMealThumb: String,
                      val strTags: String?,
                      val strYoutube: String,
                      val strIngredient1: String?,
                      val strIngredient2: String?,
                      val strIngredient3: String?,
                      val strIngredient4: String?,
                      val strIngredient5: String?,
                      val strIngredient6: String?,
                      val strIngredient7: String?,
                      val strIngredient8: String?,
                      val strIngredient9: String?,
                      val strIngredient10: String?,
                      val strIngredient11: String?,
                      val strIngredient12: String?,
                      val strIngredient13: String?,
                      val strIngredient14: String?,
                      val strIngredient15: String?,
                      val strIngredient16: String?,
                      val strIngredient17: String?,
                      val strIngredient18: String?,
                      val strIngredient19: String?,
                      val strIngredient20: String?,
                      val strMeasure1: String?,
                      val strMeasure2: String?,
                      val strMeasure3: String?,
                      val strMeasure4: String?,
                      val strMeasure5: String?,
                      val strMeasure6: String?,
                      val strMeasure7: String?,
                      val strMeasure8: String?,
                      val strMeasure9: String?,
                      val strMeasure10: String?,
                      val strMeasure11: String?,
                      val strMeasure12: String?,
                      val strMeasure13: String?,
                      val strMeasure14: String?,
                      val strMeasure15: String?,
                      val strMeasure16: String?,
                      val strMeasure17: String?,
                      val strMeasure18: String?,
                      val strMeasure19: String?,
                      val strMeasure20: String?,
                      val strSource: String?) {

    fun toRecipe(): Recipe {
        return Recipe(id = idMeal.toLong(),
                name = strMeal,
                category = strCategory,
                locale = strArea,
                instructions = parseInstructions(),
                thumbnail = strMealThumb,
                tags = parseTags(),
                video = strYoutube,
                source = strSource,
                ingredients = parseIngredients(),
                recipeType = RecipeType.MEAL)
    }

    fun name(): String {
        return strMeal
    }

    private fun parseInstructions(): List<String> {
        return strInstructions.split("\\r\\n".toRegex()).filter { it.isNotBlank() }
    }

    private fun parseTags(): List<String> {
        return strTags?.split(",")?.filter { it.isNotBlank() } ?: emptyList()
    }

    private fun parseIngredients(): List<Ingredient> {
        return listOf(
                strIngredient1 to strMeasure1,
                strIngredient2 to strMeasure2,
                strIngredient3 to strMeasure3,
                strIngredient4 to strMeasure4,
                strIngredient5 to strMeasure5,
                strIngredient6 to strMeasure6,
                strIngredient7 to strMeasure7,
                strIngredient8 to strMeasure8,
                strIngredient9 to strMeasure9,
                strIngredient10 to strMeasure10,
                strIngredient11 to strMeasure11,
                strIngredient12 to strMeasure12,
                strIngredient13 to strMeasure13,
                strIngredient14 to strMeasure14,
                strIngredient15 to strMeasure15,
                strIngredient16 to strMeasure16,
                strIngredient17 to strMeasure17,
                strIngredient18 to strMeasure18,
                strIngredient19 to strMeasure19,
                strIngredient20 to strMeasure20
        ).filter { it.isValidIngredient() }
                // These are all non-null because we removed null values.
                .map { Ingredient(it.first!!, it.second!!) }
    }

    private fun Pair<String?, String?>.isValidIngredient(): Boolean {
        val ingredient = this.first
        val measurement = this.second
        return if (ingredient == null || measurement == null) {
            false
        } else {
            ingredient.isNotBlank() && measurement.isNotBlank()
        }


    }
}

data class MealDbCategories(val categories: List<MealDbCategory>){
    fun toCategories(): List<Category> {
        return categories.map{it.toCategory()}
    }
}

data class MealDbCategory(val idCategory: String,
                          val strCategory: String,
                          val strCategoryThumb: String,
                          val strCategoryDescription: String) {
    fun toCategory(): Category {
        return Category(id = idCategory.toLong(),
                name = strCategory,
                thumbnail = strCategoryThumb,
                description = strCategoryDescription)
    }
}

data class MealDbPlainCategories(val meals: List<MealDbPlainCategory>){
    fun plainCategories(): List<String> {
        return meals.map{it.plainly()}
    }
}

data class MealDbPlainCategory(val strCategory: String){
    fun plainly(): String {
        return strCategory
    }
}

data class MealDbAreas(val meals: List<MealDbArea>){
    fun areas(): List<String> {
        return meals.map{it.strArea}
    }
}

data class MealDbArea(val strArea: String)

data class MealDbIngredients(val meals: List<MealDbIngredient>){
    fun toIngredientsMap(): Map<Long, String> {
        return meals.map{it.toPair()}.toMap()
    }
}

@JsonIgnoreProperties(ignoreUnknown = true)
data class MealDbIngredient(val idIngredient: String, val strIngredient: String){
    fun toPair(): Pair<Long, String> {
        return idIngredient.toLong() to strIngredient
    }
}

data class MealDbFilterResponse(val meals: List<MealDbFilterItem>)

data class MealDbFilterItem(val strMeal: String, val strMealThumb: String, val idMeal: String){
    val id: Long = idMeal.toLong()
}