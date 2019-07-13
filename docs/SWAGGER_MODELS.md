# Swagger API Models
> This document explains the various API models, retrieved from Swagger's API docs.  
To view the Swagger docs yourself, see the [Readme](../README.md#swagger-api-docs).

## Recipe API
> The largest API with the most amount of data provided.

###### Recipe
> A recipe is comprised up of some top level metadata about the recipe, and a list of ingredients.

This data structure is created from the Recipe API provided by the MealDB. Items are renamed, reorganized, and regrouped
to make a fluid and well structured recipe object that allows for easy iteration within the Angular front end application.

```metadata json
Recipe {
    category: string
    id: integer
    ingredient: [Ingredient{...}]
    instructions: [string]
    locale: string
    name: string
    source: string
    tags: [string]
    thumbnail: string
    video: string
}
```

###### Ingredient

A supporting object of a recipe that contains the ingredient information.

```metadata json
Ingredient {
    amount: string
    name: string
}
```

## Cookbook API
> A simple API responsible for linking and tracking user ids with recipe ids.

###### Cookbook

A Cookbook is nothing more than a record of the user id (cookbook owner) and a list of recipe ids that they have
added to their cookbook.  As this application grows, we can track more metadata about a recipe with a user by simply
providing a complex object in the recipes object to contain things like user rating, notes, etc.

```metadata json
Cookbook {
    recipes: [string]
    userId: string
}
```

## Auth API
> An API responsible for logging a user in and maintaining their session.

###### Login

This object comes from the Okta authentication module, and contains enough information for us to verify a user is logged in,
and to track them in the system.  The `idToken` and `accessToken` are both Okta provided JWTs.

```metadata json
Login {
    authenticated: boolean
    idToken: string
    accessToken: string
}
```

###### User

The User object is our view of the current user. We create it by deserializing the Okta token in order to create or log in 
a user to the system.

```metadata json
User {
    email: string
    lastLogin: string($date-time)
    name: string
    userId: string
    username: string
}
```
