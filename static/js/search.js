document.getElementById("add_to_me")
                .innerHTML += "test marche";

window.addEventListener("DOMContentLoaded", () => {

    "use strict";
    let index, parse, query;

    const form = document.getElementById("search");
    const input = document.getElementById("search-input");

    form.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();

            const keyword = input.value.trim();
            if (!keyword) return;

            query = keyword;
            initSearchIndex();
        },
        false,
    );

    function handleEvent(e) {
        console.log(e.type);
    }
document.getElementById("add_to_me")
                .innerHTML += "\ntest marche2";
    async function initSearchIndex() {

        const request = new XMLHttpRequest();

        request.open("GET", "/index.json");
        request.responseType = "json";

        request.addEventListener (
            "load",
            function () {
                parse = {};
                index = lunr(function () {

                    const documents = request.response;

                    this.ref("url");
                    this.field("title", {
                        boost: 20,
                        usePipeline: true,
                        wildcard: lunr.Query.wildcard.TRAILING,
                        presence: lunr.Query.presence.REQUIRED,
                    });
                    this.field("description", {
                        boost: 15,
                    });
                    this.field("keywords", {
                        boost: 10,
                    });
                    this.field("numero", {
                        boost: 5,
                    });

                    documents.forEach(function(doc) {
                      this.add(doc);
                      parse[doc.href] = {
                        title: doc.title,
                        description: doc.description,
                        keywords: doc.keywords,
                        numero: doc.numero,
                      };
                    }, this);
                });
                search(query);
            },
            false,
        );
        request.addEventListener("error", handleEvent);
        request.send(null);
    }

    function search(keyword) {
        const results = index.search(keyword);

        if ("content" in document.createElement("template")) {

          const target = document.querySelector(".is-search-result");

          while (target.firstChild) target.removeChild(target.firstChild);

          const title = document.createElement("h3");
          title.id = "search-results";
          title.className = "subtitle is-size-3";

          if (results.length == 0)
              title.textContent = `No results found for "${keyword}"`;
          else if (results.length == 1)
              title.textContent = `Found one result for "${keyword}"`;
          else
              title.textContent = `Found ${results.length} results for "${keyword}"`;

          target.appendChild(title);
          document.title = title.textContent;

          const template = document.getElementById("is-search-template");

          results.forEach(function(result) {
            const doc = parse[result.ref];
            const element = template.content.cloneNode(true);

            element.querySelector(".is-read-more")
                .href = doc.href;
            element.querySelector(".is-read-more")
                .textContent = doc.title;
            element.querySelector(".description")
                .textContent = doc.description;
            element.querySelector(".keywords")
                .textContent = doc.keywords;
            target.appendChild(element);

          }, this);
        } else {}
    }
  },
  false,
);