# Foto & Naam

Een simpele website voor een foto-en-naam presentatie.

## Werking

1. Vul de naam van de presentator in.
2. Je ziet eerst een foto met naam.
3. Klik op de foto: de naam verdwijnt.
4. Klik opnieuw: de naam komt terug en de knop **Volgende foto** verschijnt.
5. Elke presentator krijgt een eigen willekeurige volgorde.

## Namen en foto's aanpassen

Open `app.js` en pas deze lijst aan:

```js
const people = [
  {
    name: "Amina",
    photo: "https://..."
  }
];
```

Je kunt online fotolinks gebruiken of eigen foto's in een map zetten, bijvoorbeeld:

```js
photo: "fotos/amina.jpg"
```

## Online zetten met GitHub Pages

1. Maak een nieuwe repository op GitHub.
2. Upload `index.html`, `styles.css`, `app.js` en eventueel je fotomap.
3. Ga naar **Settings > Pages**.
4. Kies **Deploy from a branch**.
5. Kies de branch `main` en de map `/root`.
6. Klik op **Save**.

Daarna staat je site online via GitHub Pages.
