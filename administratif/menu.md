#### 1 nav.html Menu simple
```html
<nav class="bg-mycolor-500 text-white font-bold text-center">
    <ul class="list-none">
        <li class="hover:text-myred hover:scale-125"><a class="no-underline" href="/">Accueil</a></li>
        <li class="hover:text-myred hover:scale-125"><a class="no-underline " href="/histoire">Histoire</a></li>
    </ul>
</nav>
```

#### 2 layouts/_default/baseof.html
```html
<!DOCTYPE html>
<html lang="{{.Site.LanguageCode}}">
  {{ block "head" .}} 
    {{ partial "head.html" .}}
  {{ end }}
  <body>
    {{ block "nav" .}}
      {{ partial "nav.html" .}}
    {{ end }}
    
    {{ block "main" . }}
    {{ end }}
  </body>
</html>
```
#### 3 hugo.toml Menu 1
```toml
baseURL = 'https://lafabrique.netlify.app/'
languageCode = 'fr-fr'
title = 'Ma Fabrique'

[markup]
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true

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
#### 4 partials/nav.html Code de Hugo
```html
<nav>
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
</nav>
```
#### 5 partials/head.html Ajout d'alpine.js
```html
<head>    
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title>{{ if .Page.Title}}{{ .Page.Title }}{{else}}{{ .Site.Title}}{{end}}</title>

    <link rel="stylesheet" href="{{ .Site.BaseURL}}/css/main.css">    

    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

  </head>
```