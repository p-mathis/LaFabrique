+++
date = '2025-03-23T15:16:11+01:00'
draft = false
title = 'nettoyage'
photo = 'nettoyage.jpg'
alt = ''
rayon = ''
numero = ''
keywords = []
photoTitle = "grand nettoyage"
photoComment = "A vos brosses !"
+++

<div class="hidden md:grid grid-cols-5 font-bold text-center justify-center items-center bg-mycolor-700">
    <div class="col-span-3">
        <h1 class="text-mywhite uppercase">Grand Nettoyage<br><br><span class="italic md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">A vos brosses !!!</span></h1>
    </div>
    <div class="col-span-2">
        {{< images/srcsetInPage src="nettoyage.jpg" alt="une image de boulons et tournevis crée par ChatGPT" >}}
    </div>        
</div>
<div class="md:hidden bg-mycolor-700 font-bold text-white text-center ">
    {{< images/srcsetInPage src="nettoyage.jpg" alt="une image de boulons et tournevis crée par ChatGPT" >}}
    <h1 class="py-4 text-xl text-mywhite uppercase" style="letter-spacing: .3rem;">nos produits<br><span class="text-base italic" style="letter-spacing: .15rem;">Un choix d'enfer !</span></h1>
</div>

tester le short code titles produit :
{{< titles/produit >}}