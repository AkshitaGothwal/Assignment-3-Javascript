class Smoothie {
  constructor(name, base, fruits, extras, size, totalPrice) {
    this.name = name;
    this.base = base;
    this.fruits = fruits;
    this.extras = extras;
    this.size = size;
    this.totalPrice = totalPrice;
  }

  getDescription() {
    return `Smoothie for ${this.name}: 
                Base: ${this.base}
                Fruits: ${this.fruits.join(", ")}
                Extras: ${this.extras.join(", ")}
                Size: ${this.size}
                Total Price: $${this.totalPrice.toFixed(2)}`;
  }
}

document.getElementById("orderButton").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const base = document.getElementById("base");
  const baseValue = base.value;
  const basePrice = parseFloat(base.selectedOptions[0].dataset.price);
  const fruits = Array.from(
    document.getElementById("fruit").selectedOptions
  ).map((option) => option.value);
  const fruitsPrices = Array.from(
    document.getElementById("fruit").selectedOptions
  ).map((option) => parseFloat(option.dataset.price));
  const extras = Array.from(
    document.getElementById("extra").selectedOptions
  ).map((option) => option.value);
  const extrasPrices = Array.from(
    document.getElementById("extra").selectedOptions
  ).map((option) => parseFloat(option.dataset.price));
  const size = document.querySelector('input[name="size"]:checked');
  const sizeValue = size.value;
  const sizePrice = parseFloat(size.dataset.price);

  const totalPrice =
    basePrice +
    fruitsPrices.reduce((acc, cur) => acc + cur, 0) +
    extrasPrices.reduce((acc, cur) => acc + cur, 0) +
    sizePrice;

  const smoothie = new Smoothie(
    name,
    baseValue,
    fruits,
    extras,
    sizeValue,
    totalPrice
  );
  document.getElementById("orderSummary").innerText = smoothie.getDescription();

  // Display the correct image based on the selected base
  const smoothieImageDiv = document.getElementById("smoothieImage");
  smoothieImageDiv.querySelectorAll("img").forEach((img) => {
    img.style.display = "none";
  });
  const baseImageId = `${baseValue}Image`;
  document.getElementById(baseImageId).style.display = "block";

  document.getElementById("orderButton").style.display = "none";
  document.getElementById("orderAgainButton").style.display = "block";
});

document.getElementById("orderAgainButton").addEventListener("click", () => {
  document.getElementById("smoothieForm").reset();
  document.getElementById("orderSummary").innerText = "";

  // Hide all images
  document
    .getElementById("smoothieImage")
    .querySelectorAll("img")
    .forEach((img) => {
      img.style.display = "none";
    });

  document.getElementById("orderButton").style.display = "block";
  document.getElementById("orderAgainButton").style.display = "none";
});
