package io.bwvolleyball.recipe.domain

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test

class MealDbTests {

    private val objectMapper = jacksonObjectMapper()
    private val mealDbResponse = "{\"meals\":[{\"idMeal\":\"52851\",\"strMeal\":\"Nutty Chicken Curry\",\"strDrinkAlternate\":null,\"strCategory\":\"Chicken\",\"strArea\":\"Indian\",\"strInstructions\":\"Finely slice a quarter of the chilli, then put the rest in a food processor with the ginger, garlic, coriander stalks and one-third of the leaves. Whizz to a rough paste with a splash of water if needed.\\r\\nHeat the oil in a frying pan, then quickly brown the chicken chunks for 1 min. Stir in the paste for another min, then add the peanut butter, stock and yogurt. When the sauce is gently bubbling, cook for 10 mins until the chicken is just cooked through and sauce thickened. Stir in most of the remaining coriander, then scatter the rest on top with the chilli, if using. Eat with rice or mashed sweet potato.\",\"strMealThumb\":\"https:\\/\\/www.themealdb.com\\/images\\/media\\/meals\\/yxsurp1511304301.jpg\",\"strTags\":null,\"strYoutube\":\"https:\\/\\/www.youtube.com\\/watch?v=nSQNfZxOdeU\",\"strIngredient1\":\"Red Chilli\",\"strIngredient2\":\"Ginger\",\"strIngredient3\":\"Garlic\",\"strIngredient4\":\"Coriander\",\"strIngredient5\":\"Sunflower Oil\",\"strIngredient6\":\"Chicken Breasts\",\"strIngredient7\":\"Peanut Butter\",\"strIngredient8\":\"Chicken Stock\",\"strIngredient9\":\"Greek Yogurt\",\"strIngredient10\":\"\",\"strIngredient11\":\"\",\"strIngredient12\":\"\",\"strIngredient13\":\"\",\"strIngredient14\":\"\",\"strIngredient15\":\"\",\"strIngredient16\":\"\",\"strIngredient17\":\"\",\"strIngredient18\":\"\",\"strIngredient19\":\"\",\"strIngredient20\":\"\",\"strMeasure1\":\"1 large\",\"strMeasure2\":\"0.5\",\"strMeasure3\":\"1 large\",\"strMeasure4\":\"Bunch\",\"strMeasure5\":\"1 tbsp\",\"strMeasure6\":\"4\",\"strMeasure7\":\"5 tblsp \",\"strMeasure8\":\"150ml\",\"strMeasure9\":\"200g\",\"strMeasure10\":\"\",\"strMeasure11\":\"\",\"strMeasure12\":\"\",\"strMeasure13\":\"\",\"strMeasure14\":\"\",\"strMeasure15\":\"\",\"strMeasure16\":\"\",\"strMeasure17\":\"\",\"strMeasure18\":\"\",\"strMeasure19\":\"\",\"strMeasure20\":\"\",\"strSource\":\"https:\\/\\/www.bbcgoodfood.com\\/recipes\\/11753\\/nutty-chicken-curry\",\"dateModified\":null}]}"

    @Test
    fun `Should deserialize a meal db response`(){
        val mealDbResponse = objectMapper.readValue<MealDbResponse>(mealDbResponse)
        val recipes = mealDbResponse.toRecipes()
        assertThat(recipes).hasSize(1)
    }
}