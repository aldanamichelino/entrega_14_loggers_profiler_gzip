const productsInfo = document.getElementById('productsInfo');

fetch('http://localhost:8080/api/productos/productos-test')
    .then(products => products.json())
    .then(products => {
        fetch('http://localhost:8080/list.hbs')
        .then(data => data.text())
        .then(data => {
            const template = Handlebars.compile(data);
            const embeddedTemplate = template({ products: products, list: products.length > 0})

            productsInfo.innerHTML = embeddedTemplate;
    });
});
