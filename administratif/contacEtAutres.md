#### 1 contact.html
```html
{{ define "main" }}
  <main aria-role="main">

    <div class="bg-mycolor-400 border-4 border-mycolor-700 text-center">
        <h1 class="text-mycolor-100">Nous Contacter !</h1>
    </div>

    <div class="block md:grid grid-cols-2  md:border-y-2 border-myred mt-4">
        <div class="pl-4">
            <h3>Par Courrier</h3>
            La Fabrique<br>
            82160 Caylus<br>
            France
            <h3>Par mail</h3>
            <a class="no-underline" href="mailto:fablab@cc-qrga.fr">&#9993;&#65039; : fablab@cc-qrga.fr</a>
        </div>
        <div class="pl-4 md:border-l-2 border-myred">
            <h3>Par Téléphone</h3>
            <a class="no-underline" href="tel:+3363281036">&#x1F4F1; : 05 63 28 10 36</a> 
            <h3>Suivez nous !</h3>
            <a class="no-underline" href="https://www.facebook.com/lafabriquecaylus82/"><img src="data:image/png;base64,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" class="w-6 h-6 inline" alt="logo de facebook"></a>
            <a class="no-underline" href="https://www.google.com/maps/place/La+Fabrique+Caylus/@44.2316093,1.7552859,17z/data=!3m2!4b1!5s0x12ac4df91bec81d5:0xca32cb6fa3023a83!4m6!3m5!1s0x12ac520ae0511b8b:0xb1b8f4edc70b0085!8m2!3d44.2316094!4d1.7601568!16s%2Fg%2F11c5_b1v5x?hl=fr&entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D"><img class="w-6 h-6 inline" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="logo google"></a>
        </div>
    </div>
  </main>
{{ end }}
```

#### 2 footer.html
```html
<!-- pour écrans md et plus -->

<footer class="hidden md:block  bg-mycolor-600 text-mywhite md:text-base lg:text-lg xl:text-xl my-4">
    <div id="main" class="grid grid-cols-3">
        <div id="col1_links " class="list-none text-left  py-3 pl-3 lg:pl-4 xl:pl-8">
            <li>
                <a class="no-underline hover:text-gray-900 hover:italic hover:font-semibold  " href="#top">Haut de Page</a>
            </li>
            <li class="pt-4 ">
                <a class="no-underline hover:text-gray-900 hover:italic hover:font-semibold  " href="/">Accueil</a>
            </li>
            <li class="pt-4 ">
                <a class="no-underline hover:text-gray-900 hover:italic hover:font-semibold  " href="/produits">Produits</a>
            </li>
            <li class="pt-4 ">
                <a class="no-underline hover:text-gray-900 hover:italic hover:font-semibold  " href="/contact">Contact</a>
            </li>
        </div>
        <div id="col2_map" class="border-r-2 border-l-2 border-mywhite flex items-center justify-center p-2" >
            <iframe class="" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11435.232435988959!2d1.7498570601064405!3d44.2316089372849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12ac520ae0511b8b%3A0xb1b8f4edc70b0085!2sLa%20Fabrique%20Caylus!5e0!3m2!1sfr!2sfr!4v1744878025285!5m2!1sfr!2sfr" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            
        </div>
        <div id="col3_coordinates" class="text-right pr-3">
            <li class="list-none pl-4 pt-4">LaFabrique</li>
            <li class="list-none pl-4 pt-1">82160 Caylus</li>
            <li class="list-none pl-4 pt-3">
                <a class="no-underline" href="tel:+33563281036">&#x1F4F1; : 05 63 28 10 36</a></li>
            <li class="list-none pl-4 pt-3">
                <a class="no-underline" href="mailto:fablab@cc-qrga.fr">&#9993;&#65039; : fablab@cc-qrga.fr</a></li>
        </div>
        </div>

    <div class="text-left py-3 border-t border-mywhite bg-transparent"><span class="sm:pl-2 lg:pl-4 xl:pl-8 text-sm md:text-base lg:text-lg xl:text-xl text-white">Suivez-nous !</span> <span class="pl-4" ><a class="no-underline" href="https://www.facebook.com/lafabriquecaylus82/"><img src="data:image/png;base64,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" class="w-6 h-6 inline" alt="logo de facebook"></a>
            <a class="no-underline" href="https://www.google.com/maps/place/La+Fabrique+Caylus/@44.2316093,1.7552859,17z/data=!3m2!4b1!5s0x12ac4df91bec81d5:0xca32cb6fa3023a83!4m6!3m5!1s0x12ac520ae0511b8b:0xb1b8f4edc70b0085!8m2!3d44.2316094!4d1.7601568!16s%2Fg%2F11c5_b1v5x?hl=fr&entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D"><img class="w-6 h-6 inline" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="logo google"></a></span>

    </div>
</div>
</footer>
 
<!-- pour portables -->

<footer class="block md:hidden bg-mycolor-600 text-mywhite text-sm py-2 my-2">
    <!-- première div : row1_links -->
    <div id="row1_links" class="flex items center justify-around pb-2 border-b border-mywhite">
        <li class="list-none">
            <a class="no-underline hover:text-gray-900 hover:italic hover:font-semibold  " href="#top">Haut de Page</a>
        </li>
        <li class="list-none ">
            <a class="no-underline hover:text-gray-900 hover:italic hover:font-semibold  " href="/">Accueil</a>
        </li>
        <li class="list-none ">
            <a class="no-underline hover:text-gray-900 hover:italic hover:font-semibold  " href="/contact">Contact</a>
        </li>        
    </div>
    <!-- fin de la div row1_links -->
    <!-- début de la div row2_map-->
    <div id="row2_map " class="flex items-center justify-center p-2 border-b border-mywhite">
        <iframe class="" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11435.232435988959!2d1.7498570601064405!3d44.2316089372849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12ac520ae0511b8b%3A0xb1b8f4edc70b0085!2sLa%20Fabrique%20Caylus!5e0!3m2!1sfr!2sfr!4v1744878025285!5m2!1sfr!2sfr" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <!-- fin de la div row2_map -->
    <!-- début de la div row3_coordinates -->
    <div id="row3_coordinates" class="flex items-center justify-around border-b border-mywhite py-2">
        <li class="list-none">LaFabrique<br>82160 Caylus</li>
        <li class="list-none ">
            <a class="no-underline" href="tel:+33563281036">&#x1F4F1; : 05 63 28 10 36</a></li>
        <li class="list-none ">
            <a class="no-underline" href="mailto:fablab@cc-qrga.fr">&#9993;&#65039; : fablab@cc-qrga.fr</a></li>        
    </div>
    <!-- fin de la div row3_coordinates -->
    <!-- début de la div row4_suivezNous -->
         <div class="text-left py-3 pl-2 border-b border-mywhite bg-transparent"><span class="sm:pl-2 lg:pl-4 xl:pl-8 text-sm md:text-base lg:text-lg xl:text-xl text-white">Suivez-nous !</span> <span class="pl-4" ><a class="no-underline" href="https://www.facebook.com/lafabriquecaylus82/"><img src="data:image/png;base64,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" class="w-4 h-4 inline" alt="logo de facebook"></a>
            <a class="no-underline" href="https://www.google.com/maps/place/La+Fabrique+Caylus/@44.2316093,1.7552859,17z/data=!3m2!4b1!5s0x12ac4df91bec81d5:0xca32cb6fa3023a83!4m6!3m5!1s0x12ac520ae0511b8b:0xb1b8f4edc70b0085!8m2!3d44.2316094!4d1.7601568!16s%2Fg%2F11c5_b1v5x?hl=fr&entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D"><img class="w-4 h-4 inline" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="logo google"></a></span>
    </div>
    <!-- fin de la div row4_suivezNous -->
</footer>
```
#### 3 404.html
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ .Site.Title }}</title>
    <link rel="stylesheet" href="{{ .Site.BaseURL}}/css/main.css"> 
</head>
<body>
    <style>    
        /* Morph */
        .morph div img {
            width: 200px;
            height: 150px;
            -webkit-filter: grayscale(0) blur(0px);
            filter: grayscale(0) blur(0px);
            -webkit-transition: all 0.5s ease;
            transition: all 0.5s ease;
        }
        .morph div:hover img {
            width: 150px; /* on affiche l'image au carré */
            height: 150px;
            border-radius: 50%;  /* on arrondit l'image */
            -webkit-transform: rotate(360deg); /* rotation de l'image */
            transform: rotate(360deg);
        }         
    </style>
    <div class=" bg-mycolor-700 h-32 md:h-64 flex items-center justify-center text-white ">
        <h1 class="uppercase text-center text-lg md:text-4xl " id="title">aïe aïe aïe ! cette page n'existe pas !</h1>
    </div>
    <div class="morph bg-mycolor-400  flex items-center">
        <div class="mx-auto">
            <img class="" src="/404/404.png" alt="image du nombre 404 inscrit en rouge sur un fond rectangulaire gris ; symbolise l'erreur du même nom : la page n'existe pas ; l'image fait une rotation sur elle-même et s'inscrit dans un cercle">
        </div>
    </div>
        
    <div class="morph bg-my-color-300 h-48 flex items-center justify-center">
        <div class="mx-auto">
            <a class="" href="/"><img src="/404/404-button.png" alt="bouton image ayant comme texte en rouge: click retour à l'accueil sur un fond rectangulaire gris; l'image fait une rotation de 360° lorsque l'on clique dessus et le texte s'inscrit dans un cercle"></a>
        </div>
    </div>
    <div class="bg-mycolor-500 h-24 md:h-64 flex items-center justify-center text-mycolor-900 text-center">
        <h2 class="uppercase text-lg md:text-4xl">{{.Site.Title }}</h2>
</body>
</html>
```

#### 4 catalogue/single.html
```html
{{ define "main" }}
  <h1>{{ .Title }}</h1>
  {{ $products := where .Site.RegularPages "Section" "produits" }}
  {{ .Content }}
  {{ range $products.ByTitle.Reverse }}
    <h2><a href="{{ .RelPermalink }}">{{ .Title }}</a></h2>
  {{ end }}
{{ end }}
```

#### 5 histoire/galerie.json
```json
[
    {
        "src": "image1.jpg",
        "alt": "alt de l'image1",
        "caption": "Titre 1"
    },
    {
        "src": "image2.jpg",
        "alt": "alt de l'image2",
        "caption": "Titre 2"
    },
    {
        "src": "image3.jpg",
        "alt": "alt de l'image3",
        "caption": "Titre 3"
    },
    {
        "src": "image4.jpg",
        "alt": "alt de l'image4",
        "caption": "Titre 4"
    },
    {
        "src": "image5.jpg",
        "alt": "alt de l'image5",
        "caption": "Titre 5"
    },
    {
        "src": "image6.jpg",
        "alt": "alt de l'image6",
        "caption": "Titre 6"
    },
    {
        "src": "image7.jpg",
        "alt": "alt de l'image7",
        "caption": "Titre 7"
    }
]
```
#### 6 shortcodes/galerie/gallery.html
```html
<!-- https://flowbite.com/docs/components/gallery masonry grid -->

{{ $data := dict }}

<!-- get the name of json file : 
 jsonname.json -->
{{ $json := .Get "json" }} 

{{ with .Page.Resources.Get $json}}
    {{ with . | transform.Unmarshal }}
        {{ $data = . }}
    {{ end }}
{{ end }}

{{ $page := .Page }}

<!-- Début du code de la galerie -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
  {{ range $data }}
    {{ $srcstring := printf "galerie/%s" .src }}
    {{ $src := $page.Resources.GetMatch $srcstring }}
    {{ $alt := .alt }}
    {{ $caption := .caption }}

    {{ $respSizes := slice "320" "640" "960" "1280" "1600" "1920" }}
    {{ $divClass := "" }}
    {{ $imgClass := "w-full h-auto " }}
    {{ $dataSzes := "(min-width: 1024px) 100vw, 50vw" }}
    {{ $actualImg := $src.Resize "640x jpg" }}
   
      <figure>       
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
        <figcaption class="px-5 py-3 text-center text-lg font-semibold">{{ $caption }}</figcaption> 
      </figure>
  {{ end }}
</div> 
```