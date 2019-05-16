# Recipe Organizr
> An application created for the practicum project at Regis University.

### Abstract

I am a huge fan of cooking, and throughout my studies, I have frequently chosen to make a digital cookbook of sorts for myself and my family, since I haven't found anything out there sufficient for my needs.  Inevitably though, throughout my studies for the interest of learning, the applications have needed to take technological directions that were not desired, for the sake of learning a given concept at the time.  This is an opportunity to create this application in a way that fulfills the product I am seeking, where decisions can be made based on what is best for the product as opposed to needing to do so for the sake of learning.  The goal of this application is to create an online cookbook, where authenticated users are able to add recipes, create cookbooks, and share these recipes and cookbooks with others.  Guests will be allowed to view recipes, but not to create them. For authentication, I would like to use a 3rd party oauth provider in the form of GitHub, Google, Facebook, LinkedIn or some other social media platform.  Cookbooks are great tools of organization in the kitchen, I just don't feel as though there is a platform out there capable of providing the same amount of organization for recipes as a traditional hard-backed cookbook does.  Additionally, cooking preferences change over time, something a traditional cookbook just isn't capable of, so having a place where the recipes can grow and change with you is an incredible opportunity to bring digital organization to kitchens everywhere.

### Design Goals

There are several design goals for this application.

##### Security

The first goal of this application is focused around security.  In today's day and age, re-inventing the username and password seems silly, especially since there are some key resources out there that have a winning product in this space.  For security, it makes sense to leverage both the security of one of these platforms, along with allowing potential users of this application to bring their existing account along with them.  It's a win for all parties involved.  One such platform is the [Google Identity Platform](https://developers.google.com/identity/), which will be the first security platform integrated with for this application.  The concept is simple in that logging in is handled by Google, they return some unique identifiers about who is logging in, and from there we are able to correctly create or find the user in question!

##### Extensibility

It is frequently impossible to know the final state of a software project at inception, because there is learning and discovery that happens throughout the software development lifecycle.  Because of this, it's important to select a style for the software project that allows it to be open to change as additional information is learned along the way.  Because of this, I intend to follow a micro-services / micro-ui approach to developing this application, with hard lines for separation of concerns being various deployable artifacts.  By doing this, it is possible to change or extend a single business concern without as much fear that it'll impact an unrelated entity.

##### Organizational

The last design goal for this application is to provide tools for the user to truly help them organize their digital cookbooks.  This will be achieved through several ways.  Firstly, it will require some information up front from anyone creating a recipe so that we can properly recognize the type of recipe and categorize it appropriately.  Secondly, this will require researching how traditional hard-backed cookbooks organize their content and using what works in this digital cookbook.  Lastly, it will require providing various tools and ways to arrange the content, since individual users will inevitably have different preferences, and so not all users will require the same set of tools and means of organization. 

### Envisioned Architecture

This application will be a web based, N-tier micro-services and micro-ui based application.

As alluded to earlier, I desire a strong separation of concerns, along with small, scalable components.  The precise means of communication between these apps is still to be determined, but I believe the statefulness of the browser can play a great role in keeping just enough information to tie all the pieces together via reference points such as ids.  Here is the initial proposal for the architecture of this application.

![Application Architecture](./images/application_architecture.svg)

##### Gateway

The Gateway application will be a small spring boot api gateway, running on a [Netty server](https://netty.io/).  Netty is the server of choice for this portion due to it's asynchronous, non-blocking I/O nature.  Gateway will handle all HTTP traffic between the User and all supporting services and UI components, and so, it must be able to do so with high throughput.  This component is also our first line of defense, and will provide basic security features such as TLS/SSL encryption, CORS protection, and routing capabilities.

##### Presentation Layer

The next layer is a multi-component  portion, and this is the presentation layer.  Distinct Angular apps and sub apps will be created for each business concern.  The Angular apps will be hosted from an [Express server](https://expressjs.com/) as static content.  Since the primary concerns up front are a way for users to sign up and in, view recipes, and organize cookbooks, it makes sense that these 3 concerns should have their own UI applications.  As the diagram suggests, all authorization presentation, from signing up, to signing it, will be handled in the auth ui, and likewise for the recipe ui and cookbook ui for their respective topics.

##### Service Layer

Each UI application will have a supporting service layer, meaning a small backend microservice for their specific topic.  The service layer will be comprised of spring boot applications running on [Tomcat server](http://tomcat.apache.org/).  Each microservice will be responsible for the bulk of the business logic for its respective UI app, and it will also be responsible for maintaining the data layer for the various topics.

##### Data Layer

The data layer will be a Postgres Database, with distinct  databases or collections per topic.  Authorization is associated with users, and so there will be a users_db which will be a traditional SQL database to store users.

Things digress a bit with Recipes, which are typically more of an unstructured concept, where it doesn't provide much benefit to separate out the components of a recipe into various normalized tables.  Therefore, the recipes_db will take advantage of the fact that Postgres also has a NoSQL portion for storing documents.  The general document structure of a recipe is well defined, and so it makes sense to keep individual recipes as a single document.

The cookbook_db also makes sense as a document-based store, since even though the typical structure of a cookbook is common throughout, it makes sense to group the contents of a cookbook for easy retrieval by the user who owns the cookbook.

### Common Good Computing Considerations
> How is this project going to make the world a better place?

This project is intended simply to help individuals organize their thoughts in the kitchen.  In the kitchen, thoughts are expressed through food, often times though, trying to find the right recipe online can be a burden.  Pages are cluttered in ads, pop-ups are begging you for your information, and there is frequently no good place to keep the recipes you have made over time that you'd want to share with others again.  The purpose of this application is to create a safe-haven in the digital cookbook world.  A place where people can share their prized recipes and make a digital collection of items they have found and want to save.  