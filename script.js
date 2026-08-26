const products = [
{
id:1,
name:"MacBook Air M3",
price:99999,
oldPrice:114999,
image:"https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
},
{
id:2,
name:"Samsung Galaxy S24",
price:69999,
oldPrice:79999,
image:"https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80"
},
{
id:3,
name:"Sony WH-1000XM5",
price:29999,
oldPrice:34999,
image:"https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
},
{
id:4,
name:"Apple Watch Series 9",
price:41999,
oldPrice:46999,
image:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80"
},
{
id:5,
name:"Gaming Mouse Pro",
price:2499,
oldPrice:3499,
image:"https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80"
},
{
id:6,
name:"Mechanical Keyboard",
price:5499,
oldPrice:6999,
image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
},
{
id:7,
name:"iPhone 15 Pro",
price:109999,
oldPrice:124999,
image:"https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=800&q=80"
},
{
id:8,
name:"JBL Bluetooth Speaker",
price:7999,
oldPrice:9999,
image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80"
}
];

let cart=JSON.parse(localStorage.getItem("krrishCart"))||[];

function saveCart(){
localStorage.setItem("krrishCart",JSON.stringify(cart));
updateCartCount();
}

function updateCartCount(){
const badges=document.querySelectorAll("#cart-count");

let count=cart.reduce((total,item)=>{
return total+item.quantity;
},0);

badges.forEach(badge=>{
badge.textContent=count;
});
}

function formatPrice(price){
return "₹"+price.toLocaleString("en-IN");
}

function renderProducts(){

const container=document.querySelector("#product-container");

if(!container)return;

container.innerHTML="";

products.forEach(product=>{

const card=document.createElement("div");

card.className="product-card";

card.innerHTML=`
<div class="product-image">
<img src="${product.image}" alt="${product.name}">
<span class="discount">SALE</span>
</div>

<div class="product-info">

<h3>${product.name}</h3>

<div class="stars">★★★★★</div>

<div class="price">
<strong>${formatPrice(product.price)}</strong>
<del>${formatPrice(product.oldPrice)}</del>
</div>

<button onclick="addToCart(${product.id})">
🛒 Add to Cart
</button>

</div>
`;

container.appendChild(card);

});

}

function addToCart(id){

const product=products.find(item=>item.id===id);

const existing=cart.find(item=>item.id===id);

if(existing){

existing.quantity++;

}else{

cart.push({
id:product.id,
name:product.name,
price:product.price,
image:product.image,
quantity:1
});

}

saveCart();

showMessage(product.name+" added to cart!");

}

function showMessage(message){

let messageBox=document.querySelector("#cart-message");

if(!messageBox){

messageBox=document.createElement("div");

messageBox.id="cart-message";

document.body.appendChild(messageBox);

}

messageBox.textContent="✓ "+message;

messageBox.classList.add("show");

setTimeout(()=>{
messageBox.classList.remove("show");
},2000);

}

function renderCart(){

const container=document.querySelector("#cart-container");

if(!container)return;

container.innerHTML="";

if(cart.length===0){

container.innerHTML=`
<div class="empty-cart">
<div class="empty-icon">🛒</div>
<h2>Your Cart is Empty</h2>
<p>You haven't added anything to your cart yet.</p>
<a href="products.html">Continue Shopping</a>
</div>
`;

calculateTotal();

return;

}

cart.forEach(item=>{

const cartItem=document.createElement("div");

cartItem.className="cart-item";

cartItem.innerHTML=`
<img src="${item.image}" alt="${item.name}">

<div class="cart-details">

<h3>${item.name}</h3>

<p>${formatPrice(item.price)} each</p>

<label>
Quantity:
<input 
type="number"
min="1"
value="${item.quantity}"
class="quantity-input"
data-id="${item.id}">
</label>

</div>

<div class="cart-actions">

<strong>
${formatPrice(item.price*item.quantity)}
</strong>

<button 
class="remove-btn"
data-id="${item.id}">
🗑 Remove
</button>

</div>
`;

container.appendChild(cartItem);

});

document.querySelectorAll(".quantity-input").forEach(input=>{

input.addEventListener("change",function(){

const id=Number(this.dataset.id);

let quantity=parseInt(this.value);

if(isNaN(quantity)||quantity<1){
quantity=1;
}

const item=cart.find(product=>product.id===id);

if(item){
item.quantity=quantity;
}

saveCart();

renderCart();

});

});

document.querySelectorAll(".remove-btn").forEach(button=>{

button.addEventListener("click",function(){

const id=Number(this.dataset.id);

cart=cart.filter(item=>item.id!==id);

saveCart();

renderCart();

});

});

calculateTotal();

}

function calculateTotal(){

const totalElement=document.querySelector("#cart-total");

if(!totalElement)return;

const total=cart.reduce((sum,item)=>{
return sum+(item.price*item.quantity);
},0);

totalElement.textContent=formatPrice(total);

}

function validateCheckout(){

const form=document.querySelector("#checkout-form");

if(!form)return;

form.addEventListener("submit",function(event){

event.preventDefault();

const name=document.querySelector("#name");
const address=document.querySelector("#address");
const pincode=document.querySelector("#pincode");
const phone=document.querySelector("#phone");

const nameError=document.querySelector("#name-error");
const addressError=document.querySelector("#address-error");
const pincodeError=document.querySelector("#pincode-error");
const phoneError=document.querySelector("#phone-error");
const success=document.querySelector("#order-success");

nameError.textContent="";
addressError.textContent="";
pincodeError.textContent="";
phoneError.textContent="";
success.textContent="";

let valid=true;

if(name.value.trim()===""){
nameError.textContent="Name is required";
valid=false;
}

if(address.value.trim()===""){
addressError.textContent="Address is required";
valid=false;
}

if(!/^\d{6}$/.test(pincode.value.trim())){
pincodeError.textContent="Pincode must be exactly 6 digits";
valid=false;
}

if(!/^\d{10}$/.test(phone.value.trim())){
phoneError.textContent="Phone must be exactly 10 digits";
valid=false;
}

if(valid){

localStorage.removeItem("krrishCart");

cart=[];

updateCartCount();

form.reset();

success.textContent="🎉 Order placed successfully!";

success.classList.add("success-message");

}

});

}

document.addEventListener("DOMContentLoaded",function(){

updateCartCount();

renderProducts();

renderCart();

validateCheckout();

});