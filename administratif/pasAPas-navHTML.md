# Partial nav.html
## But 
Créer un menu :
&nbsp;&nbsp;&nbsp;&nbsp;- responsive
&nbsp;&nbsp;&nbsp;&nbsp;- déroulant
## Présupposé
### Dans hugo.toml
L'ossature du menu est créée dans `hugo.toml`
Le code du menu est le suivant :
```toml
[menus]
  [[menus.main]]
    name = 'Accueil'
    pageRef = '/'
    weight = 1
  [[menus.main]]
    name = 'Histoire'
    pageRef = '/histoire'
    weight = 10    
  [[menus.main]]
    name = 'Produits'
    pageRef = '/produits'
    weight = 20 
  [[menus.main]]
    name = 'Nettoyage'
    parent = "Produits"
    pageRef = '/nettoyage'
    weight = 10  
  [[menus.main]]
    name = 'Peinture'
    parent = "Produits"
    pageRef = '/peinture'
    weight = 10  
  [[menus.main]]
    name = 'Visserie'
    parent = "Produits"
    pageRef = '/visserie'
    weight = 10  
```
### alpine.js
alpine.js est appelé en CDN (Content Delivery Network)
Lien disponible sur le site d'[alpinejs](https://alpinejs.dev/essentials/installation)
### Dans head.html
Insérer le lien CDN dans head.html
### Code de base de hugo
Le codage du site va suivre le code de base de *hugo*
Ce code de base est disponible sur le site de [hugo](https://gohugo.io/methods/menu-entry/children/)

```html
<ul>
{{ range .Site.Menus.main }}
    <li>
    <a href="{{ .URL }}">{{ .Name }}</a>
    {{ if .HasChildren }}
        <ul>
        {{ range .Children }}
            <li><a href="{{ .URL }}">{{ .Name }}</a></li>
        {{ end }}
        </ul>
    {{ end }}
    </li>
{{ end }}
</ul>
```
## Codage
Le codage se fait dans le partial `nav.html`.  
Pour des raisons didactiques, on donne des noms (attributs `name`) aux différentes balises. Ceci n'est pas nécessaire en pratique.
### Mise en place d'un logo
On souhaite que dans le menu, le logo de l'entreprise apparaisse.  
Ce logo est dans `assets/images` et se nomme `logo.jpg`.  
Le logo étant dans `assets`, c'est une ressource appelée par la méthode `resources.Get`.  
On redimensionne le logo pour le mettre à la dimension 64x64 pixels.  
On lui attribue un texte alternatif.  
Le code correspondant, placé en tête de `nav.html`, est le suivant :

```html
{{ $logo := resources.Get "images/logo.jpg" }}
{{ $logo := $logo.Process "resize 64x64" }}
{{ $alt := "un dessin carré de la devanture d'une vieille droguerie, logo du site" }}
```
### Menu pour les écrans supérieurs à md
#### Créer la balise *nav*
On crée une balise *nav* de nom `nav-md` qui va contenir le code du menu.  
Cette balise *nav* remplace *de facto* la première balise *ul* du code de base de *hugo*  
La balise `nav-md` est dotée de la propriété `flex`, ce qui va lui permettre de s'étendre en fonction de la longueur du menu. Elle est `hidden` pour ne pas être visible sur les portables et petits écrans.
On lui donne une couleur de fond `bg-mycolor-300`
Le code de la balise est donc le suivant :
```html
<nav name="nav-md" class="hidden md:flex bg-mycolor-300">

</nav>
```
#### Positionner le logo
Dans la balise `nav-md`, on positionne l'image du logo avec un lien cliquable vers la page d'accueil du site.  
L'image est donc dans une ancre *\<a>* à laquelle on attribue le nom *ancre-logo*.  
L'attribut *href* de l'ancre est *"/"* puisqu'elle renvoie à la page d'accueil.  
La source de l'image est appelée par la méthode `.RelPermalink`.  
On n'utilise pas de code de redimensionnement de l'image puisque celle-ci l'a été en début de *nav.html*.  
Le code pour le logo est le suivant :
```html
<a name="ancre-logo" class="" href="/"><img class="" src="{{ $logo.RelPermalink }}" alt="{{ $alt }}"></a>
```
Le code de départ de *nav.html* est le suivant :
```html
{{ $logo := resources.Get "images/logo.jpg" }}
{{ $logo := $logo.Process "resize 64x64" }}
{{ $alt := "un dessin carré de la devanture d'une vieille droguerie, logo du site" }}
<!-- Menu pour md et plus -->
<nav name="nav-md" class="hidden md:flex bg-mycolor-300">
    <a name="ancre-logo" class="" href="/"><img class="" src="{{ $logo.RelPermalink }}" alt="{{ $alt }}"></a>
</nav> 
```
#### Mise en place du menu *parent*
On va d'abord créer le menu des pages sans s'intéresser à la boucle conditionnelle `{{ if .HasChildren }}`.  
On fait donc la boucle suivante :
```html
{{ range .Site.Menus.main }}
    <li class="">
        <a class="" href="{{ .URL }}">{{ .Name }}</a>
    </li>
{{ end }}
```
On donne à la balise *\<li>* le nom `li-parent` et à l'ancre *\<a>* le nom `a-parent`.  
Le code du menu devient le suivant :
```html
{{ $logo := resources.Get "images/logo.jpg" }}
{{ $logo := $logo.Process "resize 64x64" }}
{{ $alt := "un dessin carré de la devanture d'une vieille droguerie, logo du site" }}
<!-- Menu pour md et plus -->
<nav name="nav-md" class="hidden md:flex bg-mycolor-300">
    <a name="ancre-logo" class="" href="/"><img class="" src="{{ $logo.RelPermalink }}" alt="{{ $alt }}"></a>
    {{ range .Site.Menus.main }}
        <li name="li-parent" class="">
            <a name="a-parent" class="" href="{{ .URL }}">{{ .Name }}</a>
        </li>
    {{ end }}
</nav> 
```
Les trois liens vers les pages *parent* apparaissent.  
Mais :  
&nbsp;&nbsp;&nbsp;&nbsp;- les éléments sont collés les uns aux autres  
&nbsp;&nbsp;&nbsp;&nbsp;- il y la puce d'indicateur de liste en tête de chaque parent  
&nbsp;&nbsp;&nbsp;&nbsp;- le texte est de petite taille  
&nbsp;&nbsp;&nbsp;&nbsp;- on aimerait que le texte soit en gras

Au niveau de la classe de `nav-md` on va donc ajouter les propriétés suivantes :
&nbsp;&nbsp;&nbsp;&nbsp;- `space-x-12` pour écarter les éléments les uns des autres
&nbsp;&nbsp;&nbsp;&nbsp;- `list-none` pour éliminer les puces
&nbsp;&nbsp;&nbsp;&nbsp;- `text-xl` pour la taille du texte
&nbsp;&nbsp;&nbsp;&nbsp;- `font-bold` pour un texte gras
La classe de `nav-md` devient donc :
```html
class="hidden md:flex bg-mycolor-300 space-x-12 list-none text-xl font-bold"
```

Les titres sont soulignés (parce que par défaut on a souligné les ancres dans `tailwind.css`)
Au niveau de `a-parent` on veut :  
&nbsp;&nbsp;&nbsp;&nbsp;- qu'il n'y ait pas de soulignement
&nbsp;&nbsp;&nbsp;&nbsp;- que le texte devienne rouge au survol de la souris (`hover`)  
La classe de `a-parent` doit alors posséder les propriétés suivantes : 
```html
class="no-underline hover:text-myred"
```
On aimerait que le texte des *parent* soit centré verticalement. Pour centrer verticalement si on utilise `items-center` dans *nav-md*, on aura des problèmes lorsque le menu déroulant se mettra en place. Il faut donc passer par un *padding-top* donné au niveau de *li-parent*.  
On souhaite également qu'au survol de la souris, le nom des *parent* grossisse de 110%.
On donne à la classe de `li-parent` les propriétés suivantes :
```html
class="pt-4 hover:scale-110"
```
#### Le code du menu *parent*
Le code du menu parent est donc le suivant :
```html
{{ $logo := resources.Get "images/logo.jpg" }}
{{ $logo := $logo.Process "resize 64x64" }}
{{ $alt := "un dessin carré de la devanture d'une vieille droguerie, logo du site" }}
<!-- Menu pour md et plus -->
<nav name="nav-md" class="hidden md:flex bg-mycolor-300 space-x-12 list-none text-xl font-bold"
>
    <a name="ancre-logo" class="" href="/"><img class="" src="{{ $logo.RelPermalink }}" alt="{{ $alt }}"></a>
    {{ range .Site.Menus.main }}
        <li name="li-parent" class="pt-4 hover:scale-110">
            <a name="a-parent" class="no-underline hover:text-myred" href="{{ .URL }}">{{ .Name }}</a>
        </li>
    {{ end }}
</nav> 
```
#### Mise en place du menu *enfant*
On va insérer la boucle conditionnelle `if .HasChildren` du menu de *hugo* en donnant à :
&nbsp;&nbsp;&nbsp;&nbsp;- la balise *\<ul>* le nom `ul-child`
&nbsp;&nbsp;&nbsp;&nbsp;- la balise *\<li>* le nom `li-child`
&nbsp;&nbsp;&nbsp;&nbsp;- la balise *\<a>* le nom `a-child`   
On insère donc le code suivant :
```html
{{ if .HasChildren }}
    <ul name="ul-child">
        {{ range .Children }}
            <li name="li-child">
                <a name="a-child" href="{{ .URL }}">{{ .Name }}</a>
            </li>
        {{ end }}
    </ul>
{{ end }}
```
On respecte bien le positionnement de ce code, juste après l'ancre `a-parent` et avant la fermeture de la balise `li-parent`.
Le code du menu est donc le suivant :
```html
{{ $logo := resources.Get "images/logo.jpg" }}
{{ $logo := $logo.Process "resize 64x64" }}
{{ $alt := "un dessin carré de la devanture d'une vieille droguerie, logo du site" }}
<!-- Menu pour md et plus -->
<nav name="nav-md" class="hidden md:flex bg-mycolor-300 space-x-12 list-none text-xl font-bold"
>
    <a name="ancre-logo" class="" href="/"><img class="" src="{{ $logo.RelPermalink }}" alt="{{ $alt }}"></a>
    {{ range .Site.Menus.main }}
    <li name="li-parent" class="pt-4 hover:scale-110">
        <a name="a-parent" class="no-underline hover:text-myred" href="{{ .URL }}">{{ .Name }}</a>
        {{ if .HasChildren }}
          <ul name="ul-child">
              {{ range .Children }}
                  <li name="li-child">
                      <a name="a-child" href="{{ .URL }}">{{ .Name }}</a>
                  </li>
              {{ end }}
          </ul>
        {{ end }}
    </li>
{{ end }}
</nav> 
```
Différentes modifications sont encore à apporter au menu.
#### Insertion d'un symbole *enfant* si nécessaire
Devant le *parent* qui a des enfants, on veut qu'un symbole indique que ce *parent* a des enfants.
Le symbole est un *svg*, représentant une flèche dirigée vers le bas, dont le code est le suivant :
```svg
<svg fill="currentColor" viewBox="0 0 20 20" class="inline w-4 h-4 "><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
```
On insère ce code juste après `{{ if .HasChildren }}` et avant `ul-child`.  
Le symbole est apparu après le *parent* *Produits*, mais pas après *Accueil* et *Histoire* !
#### Modification de l'aspect
Problèmes à régler :  
&nbsp;&nbsp;&nbsp;&nbsp;- la `nav-md`est devenue trop haute, s'étant adaptée à son contenu
&nbsp;&nbsp;&nbsp;&nbsp;- les *enfant* ont une puce devant leur nom
&nbsp;&nbsp;&nbsp;&nbsp;- les *enfant* sont soulignés
Il faut donc modifier certaines classes :
- `nav-md` : donner une hauteur fixe en ajoutant la classe `h-16`
- `ul-child` : supprimer la puce en ajoutant la classe `list-none`
- `a-child` : supprimer le soulignement en ajoutant la classe `no-underline`
#### alpine.js pour cacher les enfants
Les *enfant* sont visibles, ce qui masque notamment le *parent* *Produits*.  
On souhaite masquer les *enfant* tant qu'on ne clique pas sur le *parent* correspondant. Pour cela on utilise *alpine.js*.  
##### Un test pour comprendre le fonctionnement
On va tester le fonctionnement de *alpine.js* en s'inspirant de l'exemple donné sur [alpinejs](https://alpinejs.dev/directives/data).  
- Dans `administration` on crée un fichier `alpine.html`.
- On tape `!` pour que VSCode affiche un code html complet.  
- On insére le lien CDN de *alpine* dans la balise *\<head>* : 
```html
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```
- Dans le *\<body>* on insère le code donné par *alpine* :
```html
<div x-data="{ open: false }">
    <button @click="open = ! open">Toggle Content</button>
 
    <div x-show="open">
        Content...
    </div>
</div>
```
- On enregistre le fichier.
- On l'ouvre dans un navigateur. 
- On teste le fonctionnement en cliquant sur le boutton `Toggle Content` (*toggle* signifiant *basculer*)
##### Explication du code
*Grosso modo* le code signifie ceci :
&nbsp;&nbsp;&nbsp;&nbsp;- `x-data : "{ open = false }"` : on initialise une variable que l'on appelle *open* et à la quelle on assigne la valeur *false*. 
&nbsp;&nbsp;&nbsp;&nbsp;`x-show` est la directive permettant de voir ou ne pas voir la *div* correspondante ; on voit si *x-show* est vrai (*true*), on ne voit pas si *x-sow* est faux (*false*)
&nbsp;&nbsp;&nbsp;&nbsp;- `x-show = "open"` : *x-show* prend la valeur de la variable *open*. Si *open* est *true* on voit la div, si *open* est *false* on ne voit pas la div.
&nbsp;&nbsp;&nbsp;&nbsp;- `@click="open = ! open"` : lorsqu'on clique sur le bouton, la variable *open* prend sa valeur inverse : donc *false* devient *true* et *true* devient *false* à chaque click du bouton. Le `!` est le symbole pour ***non*** ; en mathématique booléenne, *non vrai* égale *faux* et inversement.
##### Adaptation du code au menu
- On place le *x-data* ou niveau de *nav-md*.
- La *div* à ouvrir par *x-show* est *ul-child*
- Le bouton cliquable, c'est le *svg*

On va donc avoir les codes suivants : 
- pour la balise *nav-md* :
```html
<nav name="nav-md" class="hidden md:flex bg-mycolor-300 space-x-12 list-none text-xl font-bold h-16" x-data="{ open: false }">
```
- pour la balise *ul-child* :
```html
<ul name="ul-child" class="list-none" x-show="open">
```
- pour le *svg* :
```html
<svg @click="open = ! open" fill="currentColor" viewBox="0 0 20 20" class="inline w-4 h-4 "><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
```
#### Finaliser la présentation
##### Au niveau des *enfant*
On veut que :
&nbsp;&nbsp;&nbsp;&nbsp;- le texte soit en blanc
&nbsp;&nbsp;&nbsp;&nbsp;- le texte soit à gauche
&nbsp;&nbsp;&nbsp;&nbsp;- ajouter une bordure blanche de taille 2
&nbsp;&nbsp;&nbsp;&nbsp;- ajuster les *padding*
&nbsp;&nbsp;&nbsp;&nbsp;- le *hover* des ancres donne un texte gris en italique

Au niveau de *ul-child* on ajoute les propriétés de classe `text-mywhite`, `text-left`, `border-2`, `border-mywhite` ainsi que du *padding-top* `pt-4`.  
La balise *ul-child* devient :
```html
<ul name="ul-child" class="list-none text-mywhite text-left border-2 border-mywhite pt-4" x-show="open">
```
Au niveau de *a-child* on ajoute les propriétés de classe `hover:text-mycolor-500` et `hover:italic`.  
La balise *a-child* devient :  
```html
<a name="a-child" class="no-underline hover:text-mycolor-800 hover:italic" href="{{ .URL }}">{{ .Name }}</a>
```
En agrandissant et diminuant la fenêtre du site tout en laissant la liste *ul-child* ouverte, on se rend compte de problèmes de couleur et de positionnement. Ceci est insatisfaisant et on apporte quelques modifications :
&nbsp;&nbsp;&nbsp;&nbsp;- on donne à *ul-child* une couleur de fond : `bg-mycolor-500`
&nbsp;&nbsp;&nbsp;&nbsp;- on descend *ul-child* par rapport au texte *Produits*, en mettant une marge : `mt-4`
&nbsp;&nbsp;&nbsp;&nbsp;- on veut que *ul-child* soit un peu décalée sur la droite ; on lui donne de la marge à gauche : `ml-8`
&nbsp;&nbsp;&nbsp;&nbsp;- on va donner des coins arrondis à *ul-child* : `rounded-xl`
Il faut donc ajouter à la classe de `ul-child` :  
```html
rounded-xl bg-mycolor-500 mt-4 ml-8
```
Le code de *ul-child* est donc :
```html
<ul name="ul-child" class="list-none text-mywhite text-left border-2 border-mywhite pt-4 rounded-xl bg-mycolor-500 mt-4 ml-8" x-show="open">
```
Au niveau de *li-child*, on donne du *padding-bottom* pour espacer les lignes entre elles et les décoller du bas : `pb-4`
La balise *li-child* devient : 
```html
<li name="li-child" class="pb-4">
```
##### Au niveau du svg
On souhaite donner un effet au *svg* selon que la liste *enfant* est ouverte ou non. Lorsque la liste est fermée, la flèche est dirigée vers le bas ; on veut que lorsque la liste est ouverte, elle soit dirigée vers le haut.  
Pour cela, on utilise la directive `x-bind` de [alpinejs](https://alpinejs.dev/directives/bind).  
On ajoute au *svg* la directive :  
```svg
x-bind:class="{'rotate-180': open, 'rotate-0': !open}"
``` 
Ce qui signifie que lorsque *open* est à *true* le *svg* fait une rotation de 180° (la flèche sera vers le haut) ; lorsque *open* est à *false*, le *svg* ne fait pas de rotation (rotation de 0°): la flèche est vers le bas.
##### mouseleave
Lorsque la souris quitte la zone de *ul-child*, celle-ci reste ouverte et ne se ferme que lorsqu'on va cliquer à nouveau sur le *svg*.  
On souhaite que lorsque la souris quitte la zone (mouse leave), *ul-child* se ferme. 
On va utiliser la propriété `x-on:mouseleave` d'[alpinejs](https://alpinejs.dev/directives/on#mouse-events).  
La syntaxe est la suivante : 
```html
x-on:mouseleave="open=false"
```
Lorsque la souris quitte l'élément *ul-child*, la variable *open* est fixée à *false* et *ul-child* n'est plus visible (*x-show*).
Le code de *ul-child* devient :  
```html
<ul name="ul-child" class="list-none text-mywhite text-left border-2 border-mywhite pt-4 rounded-xl bg-mycolor-500 mt-4 ml-8" x-show="open" x-on:mouseleave="open=false">
```
Une amélioration peut être apportée. Faire en sorte qu'un intervalle de temps s'écoule entre le moment où la souris quitte *ul-child* et celui où *ul-child* se ferme.  
Pour cela on utilise la méthode `setTimeout()` de [javascript](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout). 
La syntaxe *javascript* est du type :
```js
setTimeout(() => {
  événement-attendu;
}, temps-en-millisecondes);

``` 
En fixant notre délai à 300 millisecondes, cela donne :
```js
setTimeout(() => { open = false }, 300)
```
Et en l'accolant à la méthode `x-on:mouse-leave` :
```html
x-on:mouseleave="setTimeout(() => { open = false }, 300)"
```
La balise *ul-child* finale est :  
```html
<ul name="ul-child" class="list-none text-mywhite text-left border-2 border-mywhite rounded-xl mt-4 pt-4 px-8 ml-8 bg-mycolor-500" x-show="open" x-on:mouseleave="setTimeout(() => { open = false }, 300)">
```
##### Sticky or not sticky
*sticky* est un type particulier de positionnement d'un élément html, à côté de *static*, *relative* et *absolute*. [Developer Mozilla](https://developer.mozilla.org/fr/docs/Web/CSS/position) a une page consacrée à la propriété *position*.  
Si on met le menu en position *sticky*, il restera collé au haut de la fenêtre et sera toujours visible.
Ceci peut être intéressant, comme cela peut ne pas l'être !!!
Pour positionner le menu en *sticky*, on modifie la classe de *nav-md* :
&nbsp;&nbsp;&nbsp;&nbsp;- on déclare qu'on se met en *sticky* : `sticky`
&nbsp;&nbsp;&nbsp;&nbsp;- on détermine le point de blocage de l'élément ; ici, c'est tout en haut, soit `top-0`
&nbsp;&nbsp;&nbsp;&nbsp;- on attribue au menu une altitude *z*, de façon à ce qu'il ne soit pas recouvert par d'autres éléments ; par exemple `z-50`  
La classe de *nav-md* devient :
```html
class="hidden md:flex bg-mycolor-300 space-x-12 list-none text-xl font-bold h-16 sticky top-0 z-50" 
```

#### Code final du menu-md
```html
{{ $logo := resources.Get "images/logo.jpg" }}
{{ $logo := $logo.Process "resize 64x64" }}
{{ $alt := "un dessin carré de la devanture d'une vieille droguerie, logo du site" }}
<!-- Menu pour md et plus -->
<nav name="nav-md" class="hidden md:flex bg-mycolor-300 space-x-12 list-none text-xl font-bold h-16 sticky top-0 z-50" x-data="{ open: false }">
    <a name="ancre-logo" class="" href="/"><img class="" src="{{ $logo.RelPermalink }}" alt="{{ $alt }}"></a>

    {{ range .Site.Menus.main }}
        <li name="li-parent" class="pt-4 hover:scale-110 ">
            <a name="a-parent" class="no-underline hover:text-myred" href="{{ .URL }}">{{ .Name }}</a>

            {{ if .HasChildren }}
                <svg @click="open = ! open" x-bind:class="{'rotate-180': open, 'rotate-0': !open}" fill="currentColor" viewBox="0 0 20 20" class="inline w-4 h-4 "><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>

                <ul name="ul-child" class="list-none text-mywhite text-left border-2 border-mywhite rounded-xl mt-4 pt-4 px-8 ml-8 bg-mycolor-500" x-show="open" x-on:mouseleave="setTimeout(() => { open = false }, 300)">
                    {{ range .Children }}
                        <li name="li-child" class="pb-4">
                            <a name="a-child" class="no-underline hover:text-mycolor-800 hover:italic" href="{{ .URL }}">{{ .Name }}</a>
                        </li>
                    {{ end }}
                </ul>
            {{ end }}
        </li>
    {{ end }}
</nav> 
```
### Menu pour les écrans de portables
#### But
Le menu est de type *hamburger*, c'est à dire qu'à l'état de base il n'est pas visible. Seul apparaît un symbole qui permet au menu de se dérouler lorsqu'on clique dessus.  
Ce symbole est placé à droite de l'écran.  
À gauche on positionne le logo de l'entreprise avec à côté son nom. Le logo et le nom sont cliquables pour renvoyer à la page d'accueil.  
#### Créer la balise *nav*
Elle est minimaliste.  
Elle est masquée pour les érans *md* et plus : `md:hidden`
```html
<nav name="nav-sm" class="md:hidden">

</nav>
```
Effectivement, le menu *parent* n'étant pas affiché, il ne peut pas se situer dans la même balise que le logo, le titre et le symbole *hamburger*
#### Créer la *div** du logo et du hamburger
On lui donne comme nom *div-entete*
Cette *div* va contenir le logo et le titre cliquables à droite, le symbole *hamburger* à gauche.
On souhaite qu'elle soit : 
&nbsp;&nbsp;&nbsp;&nbsp;- flexible : `flex`
&nbsp;&nbsp;&nbsp;&nbsp;- avec une couleur de fond *mycolor-300* : `bg-mycolor-300`
&nbsp;&nbsp;&nbsp;&nbsp;- centrée verticalement : `items-center`

```html
<div name="entete" class="flex bg-mycolor-300 items-center">
</div>
```
##### Positionner le logo et le titre
La balise *\<a>* est nommée *ancre-titre*
Elle renvoie à l'*href* *"/"* : `href="/"`.
Dans la balise on a deux éléments :
&nbsp;&nbsp;&nbsp;&nbsp;- l'image du logo
&nbsp;&nbsp;&nbsp;&nbsp;- un `<span>` avec le titre *LA FABRIQUE*.  
Pour que l'image et le titre soient alignés horizontalement, l'image doit être en classe `inline` ; sinon le titre sera en dessous de l'image. Il n'est pas nécessaire de préciser que le *span* est *inline*, car c'est son état par défaut.  
On donne une hauteur à l'image : `h-12`
Pour le *span* on souhaite :
&nbsp;&nbsp;&nbsp;&nbsp;- un texte de taille *lg* : `text-lg`
&nbsp;&nbsp;&nbsp;&nbsp;- un texte mycolor-500 : `text-mycolor-500`
&nbsp;&nbsp;&nbsp;&nbsp;- une fonte *bold* : `font-bold`
&nbsp;&nbsp;&nbsp;&nbsp;- un *padding-left* : `pl-4`
Pour l'ancre le texte ne doit pas être souligné : `<a class="no-underline">`
Le code d'*entete* est le suivant : 
```html
<!-- Menu pour les portables -->
<div name="entete" class="flex items-center bg-mycolor-300">
    <a name="ancre-titre" class="no-underline" href="/"><img class="h-12 inline" src="{{ $logo.RelPermalink }}" alt="{{ $alt }}">
    <span class="text-lg text-mycolor-500 font-bold pl-4">LA FABRIQUE</span></a>
</div>
```
##### Positionner le symbole hamburger
Le symbole *hamburger* est un *svg*.  
Ce *svg* se compose de deux parties (*path*) :
&nbsp;&nbsp;&nbsp;&nbsp;- l'un qui symbolise un *sandwich*
&nbsp;&nbsp;&nbsp;&nbsp;- l'autre qui symbolise une croix
Dans un premier temps, ces deux symboles apparaissent simutlanément.
Le *svg* a pour nom *svg-ham*, le *path* pour le sandwich : *svg-sandwich*, le *path* pour la croix : *svg-croix*.
On donne au *svg* une hauteur `h-10`.
Le code du svg est le suivant : 
```svg
<svg name="svg-ham* viewBox="0 0 20 20" class="h-10">
    <path name="svg-sandwich" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"></path>
    <path name="svg-croix" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
</svg>
```
On insère ce code dans la balise *entete* à la suite de la balise *ancre-titre*.  
Le symbole apparaît, accolé au logo et au titre.  
On souhaite que :
&nbsp;&nbsp;&nbsp;&nbsp;- le logo et le titre soient sur la gauche
&nbsp;&nbsp;&nbsp;&nbsp;- le symbole *svg* soit sur la droite
Pour cela au niveau de *entete* on ajoute la classe `justify-between`
Le code de *entete* est : 
```html
<div name="entete" class="flex items-center bg-mycolor-300 justify-between">
    <a name="ancre-titre" class="no-underline" href="/"><img class="h-12 inline" src="{{ $logo.RelPermalink }}" alt="{{ $alt }}">
    <span class="text-lg text-mycolor-500 font-bold pl-4">LA FABRIQUE</span></a>

    <svg viewBox="0 0 20 20" class="h-10">
        <path name="svg-sandwich" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"></path>
        <path name="svg-croix" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
    </svg>
</div>
```
#### Le code du menu parent
##### Le code initial de *hugo*
On insère le code *hugo* du menu parent, après la *div* *entete*, juste avant la fermeture de la balise *\</nav>*.
Le code de base du menu *parent* est celui fourni par [hugo](https://gohugo.io/methods/menu-entry/children/).
```html

<ul>
    {{ range .Site.Menus.main }}
        <li class="">
            <a class="" href="{{ .URL }}">{{ .Name }}</a>
        </li>
    {{ end }}
</ul>
```
On donne à la balise *ul* le nom de *ul-sm-parent*, à la balise *li* le nom de *li-sm-parent* et à l'ancre *a* le nom de *a-sm-parent*.  
Le code de *nav* est donc le suivant :
```html
<!-- Menu pour les portables -->
<nav name="nav-sm" class="md:hidden">
    <div name="entête" class="flex items-center bg-mycolor-300 justify-between">
        <a name="ancre-titre" class="no-underline" href="/"><img class="h-12 inline" src="{{ $logo.RelPermalink }}" alt="{{ $alt }}">
        <span class="text-lg text-mycolor-500 font-bold pl-4">LA FABRIQUE</span></a>

        <svg name="svg-ham" viewBox="0 0 20 20" class="h-10">
            <path name="svg-sandwich" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"</path>
            <path name="svg-croix" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
        </svg>
    </div>

    <ul name="ul-sm-parent">
        {{ range .Site.Menus.main }}
            <li name="li-sm-parent" class="">
                <a name="a-sm-parent" class="" href="{{ .URL }}">{{ .Name }}</a>
            </li>
        {{ end }}
    </ul>
</nav>
```
##### Personnalisation du menu *parent*
Il faut :
- supprimer les puces de la liste : *ul-sm-parent* -> `list-none`
- supprimer le soulignement des ancres : *a-sm-parent* -> `no-underline`
- donner une couleur de fond *mycolor-600* : *ul-sm-parent* -> `bg-mycolor-600`
- donner au texte une couleur *mywhite* : *ul-sm-parent* -> `text-mywhite`
- modifier la graisse des caractères : *ul-sm-parent* -> `font-medium`
- donner du *padding* aux titres : *ul-sm-parent* -> `pl-4 pt-2`
- espacer les titres entre eux : *li-sm-parent* -> `pb-2`
- qu'au survol de la souris les textes des ancres deviennent *myred* et *italic* : *a-sm-parent* -> `hover:text-myred hover:italic` 
Le code de la balise *ul-sm-parent* et de son contenu devient : 
```html
<ul name="ul-sm-parent" class="list-none bg-mycolor-600 text-mywhite font-medium pl-4 pt-2 ">
    {{ range .Site.Menus.main }}
        <li name="li-sm-parent" class="pb-2">
            <a name="a-sm-parent" class="no-underline hover:text-myred hover:italic" href="{{ .URL }}">{{ .Name }}</a>
        </li>
    {{ end }}
</ul>
```
##### Masquer le menu *parent*
Le menu doit être masqué et ne s'ouvrir que lorsqu'on clique sur le symbole *svg*.  
On applique la même procédure que pour le menu déroulant vu plus haut. On donne un autre nom à la variable, afin d'éviter des conflits entre les variables : *openSM*.
- Au niveau de la balise *nav-sm* : insérer le *x-data* -> `x-data="{ openSM: false }"`
- Au niveau de la balise *svg-ham* : insérer le *click* -> `@click="openSM = !openSM"`
- Au niveau de la balise *ul-sm-parent* : insérer le *x-show* : -> `x-show="openSM"`
Au niveau du *svg-ham* :
&nbsp;&nbsp;&nbsp;&nbsp;- *svg-sandwich* doit être visible lorsque le menu est fermé : *svg-sandwich* -> `x-show="!openSM"`
&nbsp;&nbsp;&nbsp;&nbsp;- *svg-croix* visible lorsque le menu est ouvert : *svg-croix* -> `x-show="openSM"`
On souhaite modifier la couleur des deux *path* :   
&nbsp;&nbsp;&nbsp;&nbsp;- *svg-sandwich* mycolor-500 : *svg-sandwich* -> `class="fill-mycolor-500"`
&nbsp;&nbsp;&nbsp;&nbsp;- *svg-croix* myred : *svg-croix* -> `class="fill-myred"`

#### Le code du menu *enfant*
##### Le code initial de *hugo*
On insère le code du menu *enfant* fourni par *hugo* :
```html
{{ if .HasChildren }}
<ul>
    {{ range .Children }}
    <li><a href="{{ .URL }}">{{ .Name }}</a></li>
    {{ end }}
</ul>
{{ end }}
```
On nomme la balise 
&nbsp;&nbsp;&nbsp;&nbsp;- *ul* : `name="ul-sm-child"`
&nbsp;&nbsp;&nbsp;&nbsp;- *li* : `name="li-sm-child"`
&nbsp;&nbsp;&nbsp;&nbsp;- *a* : `name="a-sm-child"`
On place le code après la balise *a-sm-parent* et avant la fermeture de la balise *li-sm-parent*.  
Le code de *nav-sm* est donc : 
```html
<!-- Menu pour les portables -->
<nav name="nav-sm" class="md:hidden" x-data="{ openSM: false }">
    <div name="entête" class="flex items-center bg-mycolor-300 justify-between">
        <a name="ancre-titre" class="no-underline" href="/"><img class="h-12 inline" src="{{ $logo.RelPermalink }}" alt="{{ $alt }}">
        <span class="text-lg text-mycolor-500 font-bold pl-4">LA FABRIQUE</span></a>

        <svg name="svg-ham"  viewBox="0 0 20 20" class="h-10" @click="openSM = !openSM" >
            <path name="svg-sandwich" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" x-show="!openSM" class="fill-mycolor-500"></path>
            <path name="svg-croix" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"  x-show="openSM" class="fill-myred"></path>
        </svg>
    </div>

    <ul name="ul-sm-parent" class="list-none bg-mycolor-600 text-mywhite font-medium pl-4 pt-2" x-show="openSM">
        {{ range .Site.Menus.main }}
            <li name="li-sm-parent" class="pb-2">
                <a name="a-sm-parent" class="no-underline hover:text-myred hover:italic" href="{{ .URL }}">{{ .Name }}</a>
                {{ if .HasChildren }}
                <ul name="ul-sm-child">
                    {{ range .Children }}
                    <li name="li-sm-child"><a name="a-sm-child" href="{{ .URL }}">{{ .Name }}</a></li>
                    {{ end }}
                </ul>
                {{ end }}
            </li>
        {{ end }}
    </ul>
</nav>
```
##### Personnalisation du menu *enfant*
Il faut :
- supprmier les puces de la liste : *ul-sm-child* -> `list-none`
- supprimer le soulignement des ancres : *a-sm-child* -> `no-underline`
- donner une couleur de fond mycolor-300 : *ul-sm-child* -> `bg-mycolor-300`
- diminuer la graisse des textes : *ul-sm-child* -> `font-light`
- que les textes soient en italique : *a-sm-child* -> `italic`
- que la liste occupe 1/3 de l'espace : *ul-sm-child* -> `w-1/3`
- que la liste soit décollée du bord gauche et du haut : *ul-sm-child* -> `ml-2 mt-2`
- que le texte ait un padding : *ul-sm-child*
-> `pl-4 pt-2`
- que les textes soient plus aérés : *li-sm-child*
-> `pb-1`
- que les textes aient une couleur mycolor-900 : *a-sm-child* -> `text-mycolor-900`
- que les textes en *hover* soient *myred* et plus en italique : *a-sm-child* -> `hover:text-myred hover:not-italic`
- que la liste ait des bords arrondis : *ul-sm-child*-> `rounded-lg`

##### Insertion d'un symbole *enfant* si nécessaire
On donne à ce svg le nom de `svg-sm-child`.
On modifie sa classe : 
&nbsp;&nbsp;&nbsp;&nbsp;- le *svg* doit être sur la ligne du nom du parent : -> `inline`
&nbsp;&nbsp;&nbsp;&nbsp;- couleur *mywhite* : -> `fill-mywhite`.
&nbsp;&nbsp;&nbsp;&nbsp;- taille *w-4 h-4* : -> `w-4 h-4` 
&nbsp;&nbsp;&nbsp;&nbsp;- 
Le code *svg* du symbole est : 
```
<svg name="svg-sm-child" class="inline fill-mywhite w-4 h-4" viewBox="0 0 20 20" class="inline w-4 h-4 "><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path></svg>
```
Ce code s'insère juste après `{{ if .HasChildren }}` et avant `ul-sm-child`.
##### alpine.js pour montrer/cacher le menu enfant
On crée une nouvelle variable *javascript* qu'on appelle *openChild*. Effectivement, le nom *open* est pris pour ouvrir le menu *parent*
 Au niveau de la balise *nav-sm* : insérer le *x-data* `openChild: false` -> `x-data="{ openSM: false, openChild: false }"`
- Au niveau de la balise *svg-sm-child* : insérer le *click* -> `@click="openChild = !openChild"`
- Au niveau de la balise *ul-sm-child* : insérer le *x-show* : -> `x-show="openChild"`
##### Changer le sens du *svg* lors du clic
Pour modifier l'aspect du *svg-sm-child" selon que la "ul-sm-child" est ouverte ou non, on ajoute au *svg* la directive : -> `x-bind:class="{'rotate-180': openChild, 'rotate-0': !openChild}"`

##### Fermer la liste *enfant* au *mouseleave*
On utilise le même type de code que pour le menu *nav-md* au niveau de *ul-sm-child* :
```html
x-on:mouseleave="setTimeout(() => { openChild = false }, 300)"
```
#### Code final du menu portable
```html
<!-- Menu pour les portables -->
<nav name="nav-sm" class="md:hidden" x-data="{ openSM: false, openChild: false }">
    <div name="entête" class="flex items-center bg-mycolor-300 justify-between">
        <a name="ancre-titre" class="no-underline" href="/"><img class="h-12 inline" src="{{ $logo.RelPermalink }}" alt="{{ $alt }}">
        <span class="text-lg text-mycolor-500 font-bold pl-4">LA FABRIQUE</span></a>

        <svg name="svg-ham"  viewBox="0 0 20 20" class="h-10" @click="openSM = !openSM" >
            <path name="svg-sandwich" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" x-show="!openSM" class="fill-mycolor-500"></path>
            <path name="svg-croix" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"  x-show="openSM" class="fill-myred"></path>
        </svg>
    </div>

    <ul name="ul-sm-parent" class="list-none bg-mycolor-600 text-mywhite font-medium pl-4 pt-2" x-show="openSM">
        {{ range .Site.Menus.main }}
            <li name="li-sm-parent" class="pb-2">
                <a name="a-sm-parent" class="no-underline hover:text-myred hover:italic" href="{{ .URL }}">{{ .Name }}</a>
                {{ if .HasChildren }}
                <svg name="svg-sm-child" class="inline fill-mywhite w-4 h-4" @click="openChild = !openChild" x-bind:class="{'rotate-180': openChild, 'rotate-0': !openChild}" viewBox="0 0 20 20" class="inline w-4 h-4 "><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path></svg>
                <ul name="ul-sm-child" class="list-none bg-mycolor-300 font-light w-1/3 ml-2 mt-2 pl-4 pt-2 rounded-lg" x-show="openChild" x-on:mouseleave="setTimeout(() => { openChild = false }, 300)">
                    {{ range .Children }}
                    <li name="li-sm-child" class="pb-1"><a name="a-sm-child" class="no-underline italic text-mycolor-900 hover:text-myred hover:not-italic" href="{{ .URL }}">{{ .Name }}</a></li>
                    {{ end }}
                </ul>
                {{ end }}
            </li>
        {{ end }}
    </ul>
</nav>
```
### Code final du menu : md+ et portables
```html
{{ $logo := resources.Get "images/logo.jpg" }}
{{ $logo := $logo.Process "resize 64x64" }}
{{ $alt := "un dessin carré de la devanture d'une vieille droguerie, logo du site" }}
<!-- Menu pour md et plus -->
<nav name="nav-md" class="hidden md:flex bg-mycolor-300 space-x-12 list-none text-xl font-bold h-16 sticky top-0 z-50" x-data="{ open: false }">
    <a name="ancre-logo" class="" href="/"><img class="" src="{{ $logo.RelPermalink }}" alt="{{ $alt }}"></a>

    {{ range .Site.Menus.main }}
        <li name="li-parent" class="pt-4 hover:scale-110 ">
            <a name="a-parent" class="no-underline hover:text-myred" href="{{ .URL }}">{{ .Name }}</a>

            {{ if .HasChildren }}
                <svg name="svg-sm-child" @click="open = ! open" x-bind:class="{'rotate-180': open, 'rotate-0': !open}"  viewBox="0 0 20 20" class="inline w-4 h-4 fill-current"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path></svg>

                <ul name="ul-child" class="list-none text-mywhite text-left border-2 border-mywhite rounded-xl mt-4 pt-4 px-8 ml-8 bg-mycolor-500" x-show="open" x-on:mouseleave="setTimeout(() => { open = false }, 300)">
                    {{ range .Children }}
                        <li name="li-child" class="pb-4">
                            <a name="a-child" class="no-underline hover:text-mycolor-800 hover:italic" href="{{ .URL }}">{{ .Name }}</a>
                        </li>
                    {{ end }}
                </ul>
            {{ end }}
        </li>
    {{ end }}
</nav> 


<!-- Menu pour les portables -->
<nav name="nav-sm" class="md:hidden" x-data="{ openSM: false, openChild: false }">
    <div name="entête" class="flex items-center bg-mycolor-300 justify-between">
        <a name="ancre-titre" class="no-underline" href="/"><img class="h-12 inline" src="{{ $logo.RelPermalink }}" alt="{{ $alt }}">
        <span class="text-lg text-mycolor-500 font-bold pl-4">LA FABRIQUE</span></a>

        <svg name="svg-ham"  viewBox="0 0 20 20" class="h-10" @click="openSM = !openSM" >
            <path name="svg-sandwich" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" x-show="!openSM" class="fill-mycolor-500"></path>
            <path name="svg-croix" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"  x-show="openSM" class="fill-myred"></path>
        </svg>
    </div>

    <ul name="ul-sm-parent" class="list-none bg-mycolor-600 text-mywhite font-medium pl-4 pt-2" x-show="openSM">
        {{ range .Site.Menus.main }}
            <li name="li-sm-parent" class="pb-2">
                <a name="a-sm-parent" class="no-underline hover:text-myred hover:italic" href="{{ .URL }}">{{ .Name }}</a>
                {{ if .HasChildren }}
                <svg name="svg-sm-child" class="inline fill-mywhite w-4 h-4" @click="openChild = !openChild" x-bind:class="{'rotate-180': openChild, 'rotate-0': !openChild}" viewBox="0 0 20 20" class="inline w-4 h-4 "><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path></svg>
                <ul name="ul-sm-child" class="list-none bg-mycolor-300 font-light w-1/3 ml-2 mt-2 pl-4 pt-2 rounded-lg" x-show="openChild" x-on:mouseleave="setTimeout(() => { openChild = false }, 300)">
                    {{ range .Children }}
                    <li name="li-sm-child" class="pb-1"><a name="a-sm-child" class="no-underline italic text-mycolor-900 hover:text-myred hover:not-italic" href="{{ .URL }}">{{ .Name }}</a></li>
                    {{ end }}
                </ul>
                {{ end }}
            </li>
        {{ end }}
    </ul>
</nav>
```
