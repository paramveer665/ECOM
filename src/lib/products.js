async function getProducts() {
  
  try {
    const res = await fetch("https://fakestoreapi.com/products");
     if (!res.ok) throw new Error("Failed to fetch products");
      const product= await res.json();
      return product;
  } catch (error) {
    console.error("Error fetching menu:", error);
  }
 
  
 
  // product.map((i)=>{console.log(i,",'with extra saucer'",)})
  // console.log(product,"mehenge maal wala")
  
}

export default getProducts;