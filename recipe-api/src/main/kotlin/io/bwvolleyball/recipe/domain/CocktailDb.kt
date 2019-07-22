/**
 * Everything in this file represents responses from
 * [https://www.thecocktaildb.com/api.php]. These classes will
 * also handle some translations to better domain classes
 * when it makes sense.
 */
package io.bwvolleyball.recipe.domain

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonInclude

data class CocktailDbResponse(val drinks: List<CocktailDbDrink>?) {
    fun toRecipes(): List<Recipe> {
        return drinks?.map { it.toRecipe() } ?: emptyList()
    }

    fun names(): List<String> {
        return drinks?.map { it.name() } ?: emptyList()
    }

    fun typedNames(): List<Pair<String, RecipeType>> {
        return drinks?.map { it.name() to RecipeType.DRINK } ?: emptyList()
    }
}

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
data class CocktailDbDrink(val idDrink: String,
                           val strDrink: String,
                           val strCategory: String,
                           val strAlcoholic: String,
                           val strGlass: String,
                           val strInstructions: String,
                           val strDrinkThumb: String,
                           val strTags: String?,
                           val strVideo: String?,
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
                           val strSource: String?) {

    fun toRecipe(): Recipe {
        return Recipe(id = idDrink.toLong(),
                name = strDrink,
                category = strCategory,
                instructions = parseInstructions(),
                thumbnail = strDrinkThumb,
                tags = parseTags(),
                video = strVideo,
                source = strSource,
                ingredients = parseIngredients(),
                recipeType = RecipeType.DRINK)
    }

    fun name(): String {
        return strDrink
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
                strIngredient15 to strMeasure15
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

data class CocktailDbCategories(val categories: List<CocktailDbCategory>) {
    fun toCategories(): List<Category> {
        return categories.map { it.toCategory() }
    }
}

data class CocktailDbCategory(val idCategory: String,
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

data class CocktailDbPlainCategories(val drinks: List<CocktailDbPlainCategory>) {
    fun plainCategories(): List<String> {
        return drinks.map { it.plainly() }
    }
}

data class CocktailDbPlainCategory(val strCategory: String) {
    fun plainly(): String {
        return strCategory
    }
}

data class CocktailDbAreas(val drinks: List<CocktailDbArea>) {
    fun areas(): List<String> {
        return drinks.map { it.strArea }
    }
}

data class CocktailDbArea(val strArea: String)

data class CocktailDbIngredients(val drinks: List<CocktailDbIngredient>) {
    fun toIngredientsMap(): Map<Long, String> {
        return drinks.map { it.toPair() }.toMap()
    }
}

@JsonIgnoreProperties(ignoreUnknown = true)
data class CocktailDbIngredient(val idIngredient: String, val strIngredient: String) {
    fun toPair(): Pair<Long, String> {
        return idIngredient.toLong() to strIngredient
    }
}

data class CocktailDbFilterResponse(val drinks: List<CocktailDbFilterItem>)

data class CocktailDbFilterItem(val strDrink: String, val strDrinkThumb: String, val idDrink: String) {
    val id: Long = idDrink.toLong()
}