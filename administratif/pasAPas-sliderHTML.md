# ShortCode slider.html
## But
- Disposer dans une page donnée d'un diaporama (carousel, slider) qui va faire défiler un certain nombre d'images.
- Les images sont dans `assets`.  
- Chaque image doit être accompagnée de son texte alternatif (`alt`) et d'une légende.

Pour cela on va : 
- Créer un shortcode hugo `slider.html` 
- Utiliser le composant `data-carousel` de Flowbite
- Appeler le shortcode dans une page du site

De manière didactique, on construit ce shortcode pas à pas et on le teste en direct dans le site `127.0.0.1:1313`
## Mise en place
Le short code va être testé dans la page **produits/nettoyage/lingette**
### Au niveau du front-matter
On insère 3 nouveaux paramètres :
- sliderImg : pour les noms des images
- sliderAlt : pour les noms des textes alternatifs
- sliderFigCaption : pour les textes d'accompagnement des images

Ces paramètres sont sous forme de listes puisqu'on a plusieurs images pour le diaporama  
Les images seront dans `assets/images`, mais comme on veut les laisser groupées, on va créer un dossier `assets/images/lingette`.
On ajoute un quatrième paramètre au niveau du front-matter :
- sliderPath 

#### La liste sliderImg
sliderImg = ["lingette-01.jpg", "lingette-02.jpg", "lingette-03.jpg", "lingette-04.jpg","lingette-05.jpg", "lingette-06.jpg", "lingette-07.jpg", "lingette-08.jpg", "lingette-09.jpg", "lingette-10.jpg"]
#### La liste sliderAlt
sliderAlt = ["alt1", "alt2", "alt3", "alt4", "alt5", "alt6", "alt7", "alt8", "alt9", "alt10"]
#### La liste sliderFigCaption
sliderFigCaption = ["figCaption1", "figCaption2", "figCaption3", "figCaption4", "figCaption5", "figCaption6", "figCaption7", "figCaption8", "figCaption9", "figCaption10"]
#### Le paramètre sliderPath
sliderPath = "lingette"
#### Le nouveau front-matter de produits/lingette.md
```toml
+++
date = '2025-03-21T19:42:27+01:00'
draft = false
title = 'Lingettes'
photo = 'lingette.jpg'
alt = 'un sachet de lingettes'
photoTitle = 'Nos belles lingettes'
photoComment = 'Coton & Synthétique'
numero = '4558-99/25'
description = 'Lingettes ipsum.<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus felis vitae ante pretium sodales. Sed imperdiet tincidunt lectus, nec gravida arcu efficitur nec'
keywords = ["nettoyage", "savon", "détergent", "coton", "microfibres"]
sliderImg = ["lingette-01.jpg", "lingette-02.jpg", "lingette-03.jpg", "lingette-04.jpg","lingette-05.jpg", "lingette-06.jpg", "lingette-07.jpg", "lingette-08.jpg", "lingette-09.jpg", "lingette-10.jpg"]
sliderPath = "lingette"
sliderAlt = ["alt1", "alt2", "alt3", "alt4", "alt5", "alt6", "alt7", "alt8", "alt9", "alt10"]
sliderFigCaption = ["figCaption1", "figCaption2", "figCaption3", "figCaption4", "figCaption5", "figCaption6", "figCaption7", "figCaption8", "figCaption9", "figCaption10"]
+++
```
#### Remarque
Plutôt que de modifier le front-matter, on aurait pu créer un `json` et structurer les paramètres dans celui-ci. Puis on aurait passé le nom du `json` en paramètre dans le front-matter.  
La structuration des données aurait été plus claire.  
Mais pour des raisons didactiques, on choisit la méthode de structuration dans le front-matter.
### Au niveau du dossier `assets/images`
Récupérer sur github le dossier `images/lingette`  
Le copier dans `assets/images`

### Flowbite
Le diaporama nécessite du `javascript`.  
On va utiliser la bibliothèque `flowbite` de `tailwindcss`
#### Installation de `flowbite`
Dans un terminal à la racine du site :  
&nbsp;&nbsp;&nbsp;&nbsp;`npm install flowbite` 

#### Copier `flowbite` dans `static`
- Soit manuellement
- Soit dans un terminal à la racine du site :  
&nbsp;&nbsp;&nbsp;&nbsp;`cp -r node_modules/flowbite static`

#### Modifier `tailwind.config.js`
Cette méthode est valable pour `tailwind 3`.  
*Pour `tailwind 4 `, il faut utiliser une autre procédure*

- Au niveau de `plugins: [],`, insérer : `require('flowbite/plugin'),`
- Au niveau de `content: [],`, insérer : `"./static/flowbite/**/*.js"`

#### Le nouveau fichier `tailwind.config.js`
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./content/**/*.md", "./content/**/*.html", "./layouts/**/*.html", "./static/flowbite/**/*.js"],
  
  theme: {
    extend: {
      colors: {
        mycolor: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',

        DEFAULT: '#1F2937',
        },
        myblack: '#111827',
        mywhite: '#ffffff',
        myred: '#ff2222',
      }, 
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
```
## Création de slider.html
Créer le fichier : `layouts/shortcodes/galerie/slider.html`
## Appel du shortcode dans lavette.md
Au niveau du contenu du fichier `content/produits/nettoyage/lavette.md` on appelle le shortcode `slider.html` dans un chapitre `Test de diaporama` 
```markdown
## Test de diaporama
{{< galerie/slider>}}
```

## Codage
Copier et coller les différents bouts de code suivants dans `slider.html`.
Lors de tests, copier les codes des tests, puis les effacer.
### Appeler le script flowbite
- Dans la mesure où `fowbite` ne sera pas appelé dans toutes les pages, on ne le met pas dans le `head` du site (`head.html`) 
- On l'appelle depuis le shortcode

```html
<!-- https://flowbite.com/docs/components/gallery  Gallery with slider -->
<!-- concatenation de variables : https://stackoverflow.com/questions/46771451/concatenate-variable-in-hugo -->

<!-- appeler flowbite -->
 <script src="{{ .Site.BaseURL}}/flowbite/dist/flowbite.min.js"></script>
```
### Initialisation de différentes variables
Pour simplifier l'écriture du code, on initialise différentes variables :
- $sliderImg : la liste de images du paramètre sliderImg du front-matter
- $sliderAlt : la liste des textes alternatifs du paramètre sliderAlt
- $sliderFigCaption : la liste des textes d'accompagnement du paramètre sliderFigCaption
- $path : le paramètre sliderPath
On initialise deux autres variables :
- $page : retourne la Page qui accueille le diaporama (si on met .Page dans une boucle `range`, cela ne marchera pas !)
- $srcSlice : collection qui va regrouper les **chemins** des images et non leurs noms isolés comme le fait $sliderImg

#### Le code correspondant
```html
<!-- initialiser quelques variables -->
{{ $sliderImg := .Page.Params.sliderImg }}
{{ $srcStringSlice := slice }}
{{ $path := .Page.Params.sliderPath }}
{{ $srcSlice := slice }}
{{ $page := .Page }}
{{ $sliderAlt := .Page.Params.sliderAlt }}
{{ $sliderFigCaption := .Page.Params.sliderFigCaption }}
```
#### Tester le code
On teste pour savoir si ces différentes variables affichent ce que l'on souhaite  
Ajouter le code test : 
```html
<!-- Test de variables -->
Slider Images : {{ $sliderImg }}<br>
Slider Alt : {{ $sliderAlt }}<br>
Slider FigCaption : {{ $sliderFigCaption }}<br>
Slider Path : {{ $path }}<br>
Page : {{ $page }}<br>
<!-- Fin du test de variables -->
```
Une fois les variables testées, on supprime le code test.
### Créer la liste des ressources
Les images sont dans `assets` : il s'agit donc de ressources qui seront appelées par la méthode `resources.GetMatch` en pointant vers le chemin de chaque image.  
Il faut créer une liste de ces ressources à partir de `$sliderImg` et de `$path` :
- parcourir `$sliderImg` par la méthode `range`
- créer un `string` qui correspond au chemin de l'image dans `assets` avec la méthode `printf`
- stocker dans `$srcSlice` la ressource de l'image par la méthode `resources.GetMatch`


#### Le code correspondant
```html
<!-- Créer la liste des sources : $srcSlice -->
<!-- Pour la concaténation de variables, voir : https://stackoverflow.com/questions/46771451/concatenate-variable-in-hugo -->

{{range $sliderImg}}
{{$srcString := printf "%s" . | printf "%s%s" "/" | printf "%s%s" $path | printf "%s%s" "/"  |printf "%s%s" "images"  | printf "%s" }}
{{ $srcSlice = $srcSlice | append (resources.GetMatch $srcString) }}
{{end}}
```
#### Tester le code
On teste pour savoir si on obtient bien la liste des ressources avec le code test que l'on ajoute :
```html
<!-- test de code -->
<br>
Resources images : {{ $srcSlice }}
<br>
<!-- fin de test de code -->
```
### Créer un compteur
On a trois listes :
- `$srcSlice` : la liste des ressources
- `$sliderAlt` : la liste des textes alternatifs
- `$sliderFigCaption` : la liste des textes d'accompagnement

Si aucune erreur n'a été commise, chacune de ces listes a le même nombre d'éléments.   
On va parcourir la liste `$srcSlice` par la méthode `range`depuis l'indice `0` jusqu'à l'indice `n-1` si la liste a `n` éléments *(rappel : l'indexation des listes commence à 0 et non à 1 !)*.  
Pour l'image de rang `i` dans `$srcSlice`, il faut capturer le `alt` de rang `i` dans `$sliderAlt` et le commentaire de rang `i` dans `$slicerFigCaption`.  
Il faut donc créer une variable `$index` qui va permettre pour l'image de rang `$index` de récupérer le texte alternatif et le commentaire correspondant. Cette variable `$index` doit prendre zéro pour première valeur et s'incrémenter d'une unité à chaque tour de la boucle `range`.  
Pour stocker et incrémenter `$index` on utlise la méthode `.Store`.
#### Syntaxe du compteur
- On initialise le compteur à zéro :   
&nbsp;&nbsp;&nbsp;&nbsp;`{{ $.Store.Set "i" 0 }}`
- On attribue à `$index` la valeur du compteur :  
&nbsp;&nbsp;&nbsp;&nbsp;`{{ $index := $.Store.Get "i" }}`
- On incrémente le compteur d'une unité :
&nbsp;&nbsp;&nbsp;&nbsp;`{{ $.Store.Add "i" 0 }}`
- On récupère la nouvelle valeur de `$index` :
&nbsp;&nbsp;&nbsp;&nbsp;`{{ $index := $.Store.Get "i" }}`
#### Le code correspondant
Pour initialiser le compteur :
```html
{{ $.Store.Set "i" 0 }}
```
#### Tester le compteur

```html
<!-- test de code -->
<br>
{{ $.Store.Set "i" 0 }}
{{ $index := $.Store.Get "i"}}
Index de départ : {{ $index }}<br>  <!-- Doit renvoyer 0 -->
{{ $.Store.Add "i" 1}}
{{ $index := $.Store.Get "i"}}  
Index suivant : {{ $index }}<br> <!-- Doit renvoyer 1 -->
<!-- fin de test de code -->
```

#### Tester dans la boucle `range`
- Parcourir `$srcSlice` avec une boucle `range`
- Utiliser la méthode `index` pour pointer sur les valeurs correspondant à la valeur prise par l'indice `$index`
- Afficher pour chaque tour de la boucle :
    * la valeur de l'indice
    * le chemin de la ressource 
    * la valeur de `alt`
    * la valeur du texte d'accompagnement
- Incrémenter le compteur
- Fermer la boucle `range` par `{{ end }}`

Le code test est le suivant :
```html
<!-- test de code -->
{{ range $srcSlice}}
  {{ $index := $.Store.Get "i"}}
  {{ $src := index $srcSlice $index }}
  {{ $alt :=  index $sliderAlt $index}}
  {{ $caption :=  index $sliderFigCaption $index}}
  Valeurs de indice, src, alt et caption : {{ $index }} -- {{ $src }} -- {{ $alt }} -- {{ $caption }}<br>
  {{ $.Store.Add "i" 1}}
{{ end }}
<!-- fin de test de code -->
```
### Le carousel
Voir : https://flowbite.com/docs/components/carousel/
On va, pour des raisons didactiques, donner un nom (attribut `name`) aux différentes `div`. Ceci n'est pas nécessaire en utilisation courante.
#### Déclaration du carousel : data-carousel
Le carousel est déclaré dans la *div* nommée *main-div*
On positionne le carousel dans le flux normal du document : `relative`
On déclare le carousel et on le positionne à `slide` pour qu'il défile en continu.
```html
<div name="main-div" class=" relative " data-carousel="slide">

</div>
```
#### Affichage des images du carousel : data-carousel-item
- Dans `main-div` lancer la boucle `range $srcSlice` 
- Insérer une *div* qui à chaque tour de boucle va afficher l'image
- L'image est appelée par son attribut *src* : `{{ index $srcSlice $index }}`
- Le texte alternatif est appelé par l'attribut *alt* : `{{ index $sliderAlt $index }}`
- On appelle cette *div* `item-div`
- Le code de la boucle avec la *div* est le suivant :
```html
{{ range $srcSlice}}
  {{ $index := $.Store.Get "i"}}
  {{ $src := index $srcSlice $index }}
  {{ $alt :=  index $sliderAlt $index}}
  {{ $caption :=  index $sliderFigCaption $index}}

    <div name="item-div" class="duration-700 ease-in-out " data-carousel-item>      
      <img class="" src="{{ $src }}"  alt="{{ $alt }}" />     
    </div>

  {{ $.Store.Add "i" 1}}
{{ end }}
```
- *duration-700* et *ease-in-out* sont des attributs de la *transition* affectant le défilement des images
- Les attributs de transition sont expliqués sur *[developer mozilla](https://developer.mozilla.org/en-US/docs/Web/CSS/transition)*

- Le code de la boucle intégré dans la *div* `main-div` est le suivant :
```html
<div name="main-div" class="relative " data-carousel="slide">

  {{ range $srcSlice}}
  {{ $index := $.Store.Get "i"}}
  {{ $src := index $srcSlice $index }}
  {{ $alt :=  index $sliderAlt $index}}
  {{ $caption :=  index $sliderFigCaption $index}}

    <div name="item-div" class="duration-700 ease-in-out " data-carousel-item>      
      <img class="" src="{{ $src }}"  alt="{{ $alt }}" />     
    </div>

  {{ $.Store.Add "i" 1}}
  {{ end }}

</div>
```
##### Problèmes de l'affichage
- Les images du diaporama sont de trop grande taille.
- Les tailles ne sont pas nécessairement identiques d'une image à l'autre.
- Les images sont bien positionnées sous le titre *Test de diaporama*, mais elles chevauchent le pied de page
##### Donner une hauteur au diaporama
Le diaporama s'affiche, mais c'est comme si aucune hauteur d'écran ne lui avait été réservée pour qu'il s'insère entre le titre *Test de diaporama* et le pied de page.  
Il convient de créer une *div* qui aura une hauteur convenue et qui contiendra la boucle `range` avec la *div* `item-div`
Cette *div* `height-div` sera directement sous `main-div`
Pour la hauteur, on va décider de lui donner une valeur proportionnelle à la hauteur de l'écran en utilisant l'unité **vh** (voir [Mozilla](https://developer.mozilla.org/fr/docs/Learn_web_development/Core/Styling_basics/Values_and_units) et [w3schools](https://www.w3schools.com/cssref/css_units.php)).  
On positionne la hauteur de `height-div` à *45vh*.  
Le code de `height-div` est le suivant :
```html
<div name="height-div" class="h-[45vh]"> 

</div>
```
Le code inséré dans `main-div` est le suivant :
```html
<div name="main-div" class="relative " data-carousel="slide">
  <div name="height-div" class="h-[45vh]"> 

    {{ range $srcSlice}}
    {{ $index := $.Store.Get "i"}}
    {{ $src := index $srcSlice $index }}
    {{ $alt :=  index $sliderAlt $index}}
    {{ $caption :=  index $sliderFigCaption $index}}

      <div name="item-div" class="duration-700 ease-in-out " data-carousel-item>      
        <img class="" src="{{ $src }}"  alt="{{ $alt }}" />     
      </div>

    {{ $.Store.Add "i" 1}}
    {{ end }}

  </div>
</div>
```
On constate qu'un espace a été créé entre le titre *Test de diaporama* et le pied de page.  
Mais les images débordent de cet espace.
##### Donner une hauteur aux images
Il faut donner une hauteur aux images pour qu'elles tiennent dans l'espace réservé pour `height-div`. Cette hauteur doit donc être inférieure à *45vh*.  
On va, par exemple, imposer la hauteur de *34vh* en insérant dans la classe de la balise *img* `class="h-[34vh]"`.  
Pour que les images ne soient pas déformées et que la largeur soit dans le bon ratio par rapport à la hauteur (les images sont carrées) on ajoute la classe `aspect-square`.  
Pour parfaire l'aspect et le positionnement, on arrondit les angles des photos (`rounded-2xl`) et on impose un *marging-top* (`mt-6`)  
La classe des images est donc : `class="rounded-2xl mt-6 h-[34vh] aspect-square"`  
Le code de `main-div` devient :  
```html
<div name="main-div" class="relative " data-carousel="slide">
  <div name="height-div" class="h-[45vh]"> 

    {{ range $srcSlice}}
    {{ $index := $.Store.Get "i"}}
    {{ $src := index $srcSlice $index }}
    {{ $alt :=  index $sliderAlt $index}}
    {{ $caption :=  index $sliderFigCaption $index}}

      <div name="item-div" class="duration-700 ease-in-out " data-carousel-item>      
        <img class="rounded-2xl mt-6 h-[34vh] aspect-square" src="{{ $src }}"  alt="{{ $alt }}" />     
      </div>

    {{ $.Store.Add "i" 1}}
    {{ end }}

  </div>
</div>
```
Les images s'affichent bien dans l'espace réservé pour `height-div` mais elles ne sont pas centrées.  

##### Centrer les images
Pour centrer les images, on va les insérer dans une *div* de type *grid* à une seule colonne et on va centrer les éléments dans la colonne.  
On crée donc une *div* nommée `col-div` avec ses attributs de grille à une colonne et centrage horizontal du contenu. 
Cette *div* est l'enfant de la *div* `item-div`  
Le code de cette *div* est :
```html
<div name="col-div" class="grid grid-cols-1 justify-items-center">

</div>
```
Le code de `main-div` est donc :
```html
<div name="main-div" class="relative " data-carousel="slide">
  <div name="height-div" class="h-[45vh]"> 

    {{ range $srcSlice}}
    {{ $index := $.Store.Get "i"}}
    {{ $src := index $srcSlice $index }}
    {{ $alt :=  index $sliderAlt $index}}
    {{ $caption :=  index $sliderFigCaption $index}}

      <div name="item-div" class="duration-700 ease-in-out " data-carousel-item>      
        <div name="col-div" class="grid grid-cols-1 justify-items-center">
          <img class="rounded-2xl mt-6 h-[34vh] aspect-square" src="{{ $src }}"  alt="{{ $alt }}" />
        </div>   
      </div>

    {{ $.Store.Add "i" 1}}
    {{ end }}

  </div>
</div>
```
L'image est centrée. Il manque le texte d'accompagnement.
#### Texte d'accompagnement
Sous l'image, on va insérer le texte d'accompagnement au moyen de `{{ index $sliderFigCaption $index }}`
Ce texte est inclus dans une balise `<p> </p>`.    
On positionne cette balise comme un enfant de la *div* `item-div`.
Pour la centrer on utilise l'attribut `text-center`.
On lui impose un text en couleur `myred`, une fonte `semi-bold`, un texte de taille `lg` et un *padding-top* de valeur 3.  
Le code de la balise *p* est le suivant :
```html
<p class=" text-myred font-semibold pt-3 text-center text-lg" >{{ index $sliderFigCaption $index }}</p> 
```
Le code de `main-div` est alors le suivant :
```html
<div name="main-div" class="relative " data-carousel="slide">
  <div name="height-div" class="h-[45vh]"> 

    {{ range $srcSlice}}
    {{ $index := $.Store.Get "i"}}
    {{ $src := index $srcSlice $index }}
    {{ $alt :=  index $sliderAlt $index}}
    {{ $caption :=  index $sliderFigCaption $index}}

      <div name="item-div" class="duration-700 ease-in-out " data-carousel-item>      
        <div name="col-div" class="grid grid-cols-1 justify-items-center">
          <img class="rounded-2xl mt-6 h-[34vh] aspect-square" src="{{ $src }}"  alt="{{ $alt }}" />
        </div>
        <p class=" text-myred font-semibold pt-3 text-center text-lg" >{{ index $sliderFigCaption $index }}</p>   
      </div>

    {{ $.Store.Add "i" 1}}
    {{ end }}

  </div>
</div>
```
### Les boutons de contrôle
On place deux boutons de contrôle :
&nbsp;&nbsp;&nbsp;&nbsp;- un à gauche pour revenir à l'image précédente qui possède l'attribut *flowbite* `data-carousel-prev` (prev pour previous, soit précédent)
&nbsp;&nbsp;&nbsp;&nbsp;- un à droite pour aller à l'image suivante qui possède l'attribut *flowbite* `data-carousel-next` (next pour suivant)
Les images des contrôles sont des *svg* placés dans des balises *\<span>*
Le code pour ces deux boutons est le suivant :
```html
<!-- Slider controls -->
<!-- Bouton gauche -->
<button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
  <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-mycolor-400 group-hover:bg-mycolor-600 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
    <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
    </svg>
    <span class="sr-only">Prédédent</span>
  </span>
</button>
<!-- Bouton droit -->
<button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
  <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-mycolor-400 group-hover:bg-mycolor-600 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
    <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
    </svg>
    <span class="sr-only">Suivant</span>
  </span>
</button>
```
Les boutons `<button>` sont des enfants de la *div* `main-div` et se placent après la *div* `height-div`
Le code de `main-div` est donc le suivant :
```html
<div name="main-div" class="relative " data-carousel="slide">
  <div name="height-div" class="h-[45vh]"> 

    {{ range $srcSlice}}
    {{ $index := $.Store.Get "i"}}
    {{ $src := index $srcSlice $index }}
    {{ $alt :=  index $sliderAlt $index}}
    {{ $caption :=  index $sliderFigCaption $index}}

      <div name="item-div" class="duration-700 ease-in-out " data-carousel-item>      
        <div name="col-div" class="grid grid-cols-1 justify-items-center">
          <img class="rounded-2xl mt-6 h-[34vh] aspect-square" src="{{ $src }}"  alt="{{ $alt }}" />
        </div>
        <p class=" text-myred font-semibold pt-3 text-center text-lg" >{{ index $sliderFigCaption $index }}</p>   
      </div>

    {{ $.Store.Add "i" 1}}
    {{ end }}

  </div>

  <!-- Slider controls -->
  <!-- Bouton gauche -->
  <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
    <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-mycolor-400 group-hover:bg-mycolor-600 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
      <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
      </svg>
      <span class="sr-only">Prédédent</span>
    </span>
  </button>
  <!-- Bouton droit -->
  <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
    <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-mycolor-400 group-hover:bg-mycolor-600 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
      <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
      </svg>
      <span class="sr-only">Suivant</span>
    </span>
  </button>

</div>
```
### Le redimensionnement des images
Le diaporama est fonctionnel. Mais les images qui défilent sont les image stockées dans *assets*, sans redimensionnement lié à la taille de l'écran.  
Il faut donc présenter un *srcset* plutôt qu'une *img*.
On reprend le code déjà utilisé pour créer des *srcset*, en l'adaptant. 
Notamment les variables `$src` et `$alt` étant déjà définies, il n'est plus nécessaire de les redéclarer.  
Le code type était de la forme suivante : 
```html
{{- $respSizes := slice "320" "640" "960" "1280" "1600" "1920" -}}
{{- $divClass := "" -}}{{/* Init'g */}}
{{- $imgClass := "w-full h-auto animate-fade" -}}
{{- $dataSzes := "(min-width: 1024px) 100vw, 50vw" -}}
{{- $actualImg := $src.Resize "640x jpg" -}}
<picture>
  <source
    type="image/webp"
    srcset="
      {{- with $respSizes -}}
        {{- range $i, $e := . -}}
        {{- if ge $src.Width . -}}
          {{- if $i }}, {{ end -}}{{- ($src.Resize (printf "%sx%s" . " webp") ).RelPermalink }} {{ . }}w
        {{- end -}}
      {{- end -}}
    {{- end -}}"
    sizes="{{ $dataSzes }}"
  />
  <source
    type="image/jpeg"
    srcset="
      {{- with $respSizes -}}
        {{- range $i, $e := . -}}
          {{- if ge $src.Width . -}}
            {{- if $i }}, {{ end -}}{{- ($src.Resize (printf "%sx%s" . " jpg") ).RelPermalink }} {{ . }}w
          {{- end -}}
      {{- end -}}
    {{- end -}}"\
    sizes="{{ $dataSzes }}"
  />
  <img class="{{ $imgClass }}"
    src="{{ $actualImg.RelPermalink }}"
    width="{{ $src.Width }}"
    height="{{ $src.Height }}"
    alt="{{ $alt }}"
    loading="lazy"
  />
</picture>
```
Au niveau de `{{- $imgClass -}}`, on définit les classes des images du diaporama et cette variable devient donc :
```html
{{- $imgClass := "rounded-2xl mt-6 h-[34vh] aspect-square" -}}
```
Les différentes variables de ce code *srcset* sont placées au niveau des variables déclarées dans la boucle `{{ range $srcSlice }}`.  
La déclaration des variables dans la boucle devient donc : 
```html
{{ $index := $.Store.Get "i"}}
{{ $src := index $srcSlice $index }}
{{ $alt :=  index $sliderAlt $index}}
{{ $caption :=  index $sliderFigCaption $index}}

{{- $respSizes := slice "320" "640" "960" "1280" "1600" "1920" -}}
{{- $divClass := "" -}}{{/* Init'g */}}
{{- $imgClass := "rounded-2xl mt-6 h-[34vh] aspect-square" -}}
{{- $dataSzes := "(min-width: 1024px) 100vw, 50vw" -}}
{{- $actualImg := $src.Resize "640x jpg" -}}
```
Les dimensions des images étant définies dans `{{ $imgClass }}`, il faut supprimer les attributs *width* et *height* des classes du *srcset*
La balise *picture* et son contenu viennent remplacer la balise *img* 
### Code définitif du carousel
Le code définitif du carousel est donc le suivant :
```html
<!-- https://flowbite.com/docs/components/gallery  Gallery with slider -->
<!-- concatenation de variables : https://stackoverflow.com/questions/46771451/concatenate-variable-in-hugo -->

<!-- appeler flowbite -->
<script src="{{ .Site.BaseURL}}/flowbite/dist/flowbite.min.js"></script>

<!-- initialiser quelques variables -->
{{ $sliderImg := .Page.Params.sliderImg }}
{{ $sliderAlt := .Page.Params.sliderAlt }}
{{ $sliderFigCaption := .Page.Params.sliderFigCaption }}
{{ $path := .Page.Params.sliderPath }}

{{ $srcSlice := slice }}
{{ $page := .Page }}

<!-- Créer la liste des sources : $srcSlice -->
<!-- Pour la concaténation de variables, voir : https://stackoverflow.com/questions/46771451/concatenate-variable-in-hugo -->
 
{{range $sliderImg}}
  {{$srcString := printf "%s" . | printf "%s%s" "/" | printf "%s%s" $path | printf "%s%s" "/"  |printf "%s%s" "images"  | printf "%s" }}
  {{ $srcSlice = $srcSlice | append (resources.GetMatch $srcString) }}
{{end}}

<!-- Initialiser le compteur -->
 
{{ $.Store.Set "i" 0 }}

<!-- Commencer le diaporama -->
<!-- Voir le modèle type de diaporama : https://flowbite.com/docs/components/carousel/ -->

<div name="main-div" class="relative " data-carousel="slide">
  <div name="height-div" class="h-[45vh]"> 

    {{ range $srcSlice}}
      {{ $index := $.Store.Get "i"}}
      {{ $src := index $srcSlice $index }}
      {{ $alt :=  index $sliderAlt $index}}
      {{ $caption :=  index $sliderFigCaption $index}}

      {{- $respSizes := slice "320" "640" "960" "1280" "1600" "1920" -}}
      {{- $divClass := "" -}}{{/* Init'g */}}
      {{- $imgClass := "rounded-2xl mt-6 h-[34vh] aspect-square" -}}
      {{- $dataSzes := "(min-width: 1024px) 100vw, 50vw" -}}
      {{- $actualImg := $src.Resize "640x jpg" -}}

      <div name="item-div" class="duration-700 ease-in-out " data-carousel-item>      
        <div name="col-div" class="grid grid-cols-1 justify-items-center">
          <picture>
            <source
              type="image/webp"
              srcset="
                {{- with $respSizes -}}
                  {{- range $i, $e := . -}}
                  {{- if ge $src.Width . -}}
                    {{- if $i }}, {{ end -}}{{- ($src.Resize (printf "%sx%s" . " webp") ).RelPermalink }} {{ . }}w
                  {{- end -}}
                {{- end -}}
              {{- end -}}"
              sizes="{{ $dataSzes }}"
            />
            <source
              type="image/jpeg"
              srcset="
                {{- with $respSizes -}}
                  {{- range $i, $e := . -}}
                    {{- if ge $src.Width . -}}
                      {{- if $i }}, {{ end -}}{{- ($src.Resize (printf "%sx%s" . " jpg") ).RelPermalink }} {{ . }}w
                    {{- end -}}
                {{- end -}}
              {{- end -}}"\
              sizes="{{ $dataSzes }}"
            />
            <img class="{{ $imgClass }}"
              src="{{ $actualImg.RelPermalink }}"
              alt="{{ $alt }}"
              loading="lazy"
            />
          </picture>
        </div>
        <p class=" text-myred font-semibold pt-3 text-center text-lg" >{{ index $sliderFigCaption $index }}</p>   
      </div>

    {{ $.Store.Add "i" 1}}
    {{ end }}

  </div>

  <!-- Slider controls -->
  <!-- Bouton gauche -->
  <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
    <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-mycolor-400 group-hover:bg-mycolor-600 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
      <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
      </svg>
      <span class="sr-only">Prédédent</span>
    </span>
  </button>
  <!-- Bouton droit -->
  <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
    <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-mycolor-400 group-hover:bg-mycolor-600 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
      <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
      </svg>
      <span class="sr-only">Suivant</span>
    </span>
  </button>

</div>
```

